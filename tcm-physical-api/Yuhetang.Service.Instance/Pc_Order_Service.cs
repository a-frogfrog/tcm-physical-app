using Microsoft.EntityFrameworkCore;
using ServiceStack;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request.Pc;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.Dto.Response.Pc;
using Yuhetang.Infrastructure.EFCore.MySql;
using Yuhetang.Infrastructure.IOC;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.Instance
{
    [Inject_]
    public class Pc_Orders_Service : Base_Service, I_Pc_Order_Service
    {
        // 订单业务常量定义
        private const int ORDER_STATUS_PENDING = 0;    // 待支付
        private const int ORDER_STATUS_PAID = 1;       // 已支付
        private const int ORDER_STATUS_COMPLETED = 2;  // 已完成
        private const int ORDER_STATUS_CANCELLED = 3;  // 已取消
        private const decimal MIN_ORDER_AMOUNT = 0.01m;// 最小订单金额
        private const int MAX_REMARK_LENGTH = 200;     // 备注最大长度
        private const int EMPLOYEE_ACTIVE_STATUS = 1;  // 员工在职状态
        private const int PRODUCT_ACTIVE_STATUS = 1;   // 产品/套餐上架状态
        private const int ROOM_AVAILABLE_STATUS = 0;   // 房间可用状态
        private const int ROOM_OCCUPIED_STATUS = 1;    // 房间占用状态
        private const int PAYMENT_TYPE_CASH = 1;       // 现金
        private const int PAYMENT_TYPE_WECHAT = 2;     // 微信
        private const int PAYMENT_TYPE_ALIPAY = 3;     // 支付宝
        private const decimal PAYMENT_AMOUNT_TOLERANCE = 0.01m;

        // 注入依赖
        private readonly Order_IOC _orderIOC;
        private readonly Custom_IOC _customIOC;
        private readonly Product_IOC _productIOC;
        private readonly Product_Package_IOC _productPackageIOC;
        private readonly Employees_IOC _employeesIOC;
        private readonly Room_IOC _roomIOC;
        private readonly ServiceTo_IOC _serviceToIOC;
        private readonly Payment_IOC _payment_IOC;


        // 构造函数注入
        public Pc_Orders_Service(
            Order_IOC orderIOC,
            Custom_IOC customIOC,
            Product_IOC productIOC,
            Product_Package_IOC productPackageIOC,
            Employees_IOC employeesIOC,
            Room_IOC roomIOC,
            ServiceTo_IOC serviceToIOC,
            Payment_IOC payment_IOC)
        {
            _orderIOC = orderIOC;
            _customIOC = customIOC;
            _productIOC = productIOC;
            _productPackageIOC = productPackageIOC;
            _employeesIOC = employeesIOC;
            _roomIOC = roomIOC;
            _serviceToIOC = serviceToIOC;
            _payment_IOC = payment_IOC;
        }

        /// <summary>
        /// 新增订单
        /// </summary>
        public async Task<Pc_Order_Response_Dto> AddOrderAsync(Pc_Order_Request_Dto dto)
        {
            try
            {
                // 1. 验证请求参数
                ValidateOrderDto(dto);

                // 2. 验证并获取关联数据
                var (customer, room, employee, product, package, service) =
                    await ValidateAndGetRelatedDataAsync(dto);

                // 3. 业务规则校验
                ValidateOrderBusinessRules(dto, product, package, service);

                // 4. 计算最终订单金额
                var finalAmount = CalculateFinalOrderAmount(product, package, service);

                // 验证计算出的金额是否符合最小要求
                if (finalAmount < MIN_ORDER_AMOUNT)
                {
                    throw new ArgumentException($"订单金额不能小于{MIN_ORDER_AMOUNT:0.00}元");
                }

                // 5. 创建订单实体
                var order = new Order
                {
                    OId = Guid.NewGuid().ToString("N"),
                    OAmount = finalAmount,
                    OStatus = ORDER_STATUS_PENDING,
                    ORemark = string.IsNullOrWhiteSpace(dto.Remark) ? string.Empty : dto.Remark.Trim(),
                    OCreateTime = DateTime.Now,
                    OcId = customer.CId,
                    OaId = dto.AppointmentId,
                    OrId = room?.RoomId,
                    OeId = employee.EId,
                    OppId = package?.PpId,
                    OpId = product?.PId,
                    OsId = service?.SId
                };

                // 6. 保存到数据库
                _orderIOC._order_EFCore.Add(order);
                await _orderIOC._order_EFCore.SaveChangesAsync();

                // 7. 更新房间状态为占用并关联订单ID
                if (room != null)
                {
                    room.RoomStatus = ROOM_OCCUPIED_STATUS;
                    room.ROrderId = order.OId;
                    _roomIOC._rooms_EFCore.Update(room);
                    await _roomIOC._rooms_EFCore.SaveChangesAsync();
                }

                // 8. 组装响应数据
                return MapToOrderResponse(order, customer, room, employee, product, package, service);
            }
            catch (ArgumentException ex)
            {
                throw new InvalidOperationException($"订单创建失败：{ex.Message}", ex);
            }
            catch (DbUpdateException ex)
            {
                throw new InvalidOperationException($"订单保存失败：{ex.InnerException?.Message ?? ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"新增订单时发生未知错误：{ex.Message}", ex);
            }
        }

        /// <summary>
        /// 验证订单请求参数基础规则
        /// </summary>
        private void ValidateOrderDto(Pc_Order_Request_Dto dto)
        {
            // 1. 必填项校验
            if (string.IsNullOrWhiteSpace(dto.CustomerId))
                throw new ArgumentException("客户ID不能为空");

            if (string.IsNullOrWhiteSpace(dto.EmployeeId))
                throw new ArgumentException("员工ID不能为空");

            // 2. 备注长度校验
            if (!string.IsNullOrWhiteSpace(dto.Remark) && dto.Remark.Trim().Length > MAX_REMARK_LENGTH)
                throw new ArgumentException($"备注长度不能超过{MAX_REMARK_LENGTH}个字符");

            // 3. 至少选择服务、产品或套餐中的一个
            if (string.IsNullOrWhiteSpace(dto.ProductId) &&
                string.IsNullOrWhiteSpace(dto.PackageId) &&
                string.IsNullOrWhiteSpace(dto.ServiceId))
                throw new ArgumentException("请至少选择一个服务、产品或套餐");

            // 4. 确保最多选择一个类型（服务、产品、套餐中的一种）
            int selectedTypes = 0;
            if (!string.IsNullOrWhiteSpace(dto.ProductId)) selectedTypes++;
            if (!string.IsNullOrWhiteSpace(dto.PackageId)) selectedTypes++;
            if (!string.IsNullOrWhiteSpace(dto.ServiceId)) selectedTypes++;

            if (selectedTypes > 1)
                throw new ArgumentException("只能选择服务、产品或套餐中的一种");
        }

        /// <summary>
        /// 异步验证并获取所有关联数据
        /// </summary>
        private async Task<(
            Custom Customer,
            Room Room,
            SysEmployee Employee,
            Product Product,
            ProductPackage Package,
            ServiceTo Service
        )> ValidateAndGetRelatedDataAsync(Pc_Order_Request_Dto dto)
        {
            // 1. 验证并获取客户（必填）
            var customer = await _customIOC._custom_EFCore
                .QueryAll(c => c.CId == dto.CustomerId)
                .FirstOrDefaultAsync();
            if (customer == null)
                throw new ArgumentException("关联的客户不存在");

            // 2. 验证并获取房间（非必填）
            Room room = null;
            if (dto.RoomId.HasValue)
            {
                room = await _roomIOC._rooms_EFCore
                    .QueryAll(r => r.RoomId == dto.RoomId.Value)
                    .FirstOrDefaultAsync();
                if (room == null)
                    throw new ArgumentException("关联的房间不存在");
                if (room.RoomStatus != ROOM_AVAILABLE_STATUS)
                    throw new ArgumentException("关联的房间不可用（可能已占用或维护中）");
            }

            // 3. 验证并获取员工（必填）
            var employee = await _employeesIOC._sys_Employees_EFCore
                .QueryAll(e => e.EId == dto.EmployeeId)
                .FirstOrDefaultAsync();
            if (employee == null)
                throw new ArgumentException("关联的员工不存在");
            if (employee.EStatus != EMPLOYEE_ACTIVE_STATUS)
                throw new ArgumentException("员工非在职状态，无法提供服务");

            // 4. 验证并获取产品（非必填）
            Product product = null;
            if (!string.IsNullOrWhiteSpace(dto.ProductId))
            {
                product = await _productIOC._product_EFCore
                    .QueryAll(p => p.PId == dto.ProductId)
                    .FirstOrDefaultAsync();
                if (product == null)
                    throw new ArgumentException("关联的产品不存在");
                if (product.PStatus != PRODUCT_ACTIVE_STATUS)
                    throw new ArgumentException("产品已下架，无法下单");
                if (product.PPrice <= 0)
                    throw new ArgumentException("产品价格必须大于0");
            }

            // 5. 验证并获取套餐（非必填）
            ProductPackage package = null;
            if (!string.IsNullOrWhiteSpace(dto.PackageId))
            {
                package = await _productPackageIOC._product_Package_EFCore
                    .QueryAll(pp => pp.PpId == dto.PackageId)
                    .FirstOrDefaultAsync();
                if (package == null)
                    throw new ArgumentException("关联的套餐不存在");
                if (package.PpStatus != PRODUCT_ACTIVE_STATUS)
                    throw new ArgumentException("套餐已下架，无法下单");
                if (package.PpPrice <= 0)
                    throw new ArgumentException("套餐价格必须大于0");
            }

            // 6. 验证并获取服务（非必填）
            ServiceTo service = null;
            if (!string.IsNullOrWhiteSpace(dto.ServiceId))
            {
                service = await _serviceToIOC._service_EFCore
                    .QueryAll(s => s.SId == dto.ServiceId)
                    .FirstOrDefaultAsync();
                if (service == null)
                    throw new ArgumentException("关联的服务不存在");
                if (service.SPrice <= 0)
                    throw new ArgumentException("服务价格必须大于0");
            }

            return (customer, room, employee, product, package, service);
        }

        /// <summary>
        /// 验证订单业务规则
        /// </summary>
        private void ValidateOrderBusinessRules(Pc_Order_Request_Dto dto, Product product, ProductPackage package, ServiceTo service)
        {
            // 可以添加更多业务规则验证
            // 例如：特定产品必须关联房间，特定服务有时间限制等
        }

        /// <summary>
        /// 计算最终订单金额
        /// </summary>
        private decimal CalculateFinalOrderAmount(Product product, ProductPackage package, ServiceTo service)
        {
            decimal totalAmount = 0;

            // 累加服务金额
            if (service != null)
            {
                totalAmount += service.SPrice ?? 0;
            }

            // 累加产品金额
            if (product != null)
            {
                totalAmount += product.PPrice ?? 0;
            }

            // 累加套餐金额
            if (package != null)
            {
                totalAmount += package.PpPrice;
            }

            return totalAmount;
        }

        /// <summary>
        /// 映射订单实体到响应DTO
        /// </summary>
        private Pc_Order_Response_Dto MapToOrderResponse(
            Order order,
            Custom customer,
            Room room,
            SysEmployee employee,
            Product product,
            ProductPackage package,
            ServiceTo service)
        {
            return new Pc_Order_Response_Dto
            {
                OrderId = order.OId,
                OrderAmount = order.OAmount ?? 0,
                OrderStatus = order.OStatus ?? 0,
                OrderStatusName = GetOrderStatusName(order.OStatus ?? 0),
                Remark = order.ORemark ?? string.Empty,
                CreateTime = order.OCreateTime?.ToString("yyyy-MM-dd HH:mm:ss") ?? string.Empty,
                AppointmentId = order.OaId ?? string.Empty,
                CustomerId = order.OcId ?? string.Empty,
                CustomerName = customer?.CName ?? string.Empty,
                RoomId = order.OrId,
                RoomName = room?.RoomName ?? string.Empty,
                EmployeeId = order.OeId ?? string.Empty,
                EmployeeName = employee?.EName ?? string.Empty,
                PackageId = order.OppId ?? string.Empty,
                PackageName = package?.PpName ?? string.Empty,
                ProductId = order.OpId ?? string.Empty,
                ProductName = product?.PName ?? string.Empty,
                ServiceId = order.OsId ?? string.Empty,
                ServiceName = service?.SName ?? string.Empty
            };
        }

        /// <summary>
        /// 转换订单状态为名称
        /// </summary>
        private string GetOrderStatusName(int status)
        {
            return status switch
            {
                ORDER_STATUS_PENDING => "待支付",
                ORDER_STATUS_PAID => "已支付",
                ORDER_STATUS_COMPLETED => "已完成",
                ORDER_STATUS_CANCELLED => "已取消",
                _ => "未知状态"
            };
        }

        /// <summary>
        /// 获取订单列表
        /// </summary>
        public async Task<Api_Response_Dto> Get_Orders(Pc_Order_Request_Dto dto)
        {
            try
            {
                // 1. 验证分页参数
                int page = dto.page <= 0 ? 1 : Convert.ToInt32(dto.page);
                int limit = dto.limit <= 0 ? 10 : Convert.ToInt32(dto.limit);

                // 2. 分页查询订单主表
                var orders = await _orderIOC._order_EFCore
                    .QueryAll(out int total, page, limit, false, o => o.OCreateTime)
                    .ToListAsync();

                // 3. 收集所有需要查询的关联ID
                var customerIds = orders.Where(a => !string.IsNullOrWhiteSpace(a.OcId))
                                              .Select(a => a.OcId).Distinct().ToList();
                var employeeIds = orders.Where(a => !string.IsNullOrWhiteSpace(a.OeId))
                                              .Select(a => a.OeId).Distinct().ToList();
                var productIds = orders.Where(a => !string.IsNullOrWhiteSpace(a.OpId))
                                             .Select(a => a.OpId).Distinct().ToList();
                var packageIds = orders.Where(a => !string.IsNullOrWhiteSpace(a.OppId))
                                             .Select(a => a.OppId).Distinct().ToList();
                var roomIds = orders.Where(a => a.OrId.HasValue)
                                         .Select(a => a.OrId.Value).Distinct().ToList();
                var serviceIds = orders.Where(a => !string.IsNullOrWhiteSpace(a.OsId))
                                         .Select(a => a.OsId).Distinct().ToList();

                // 4. 批量查询关联数据
                var customerDict = (await _customIOC._custom_EFCore
                    .QueryAll(c => customerIds.Contains(c.CId))
                    .ToListAsync())
                    .ToDictionary(c => c.CId);

                var employeeDict = (await _employeesIOC._sys_Employees_EFCore
                    .QueryAll(e => employeeIds.Contains(e.EId))
                    .ToListAsync())
                    .ToDictionary(e => e.EId);

                var productDict = (await _productIOC._product_EFCore
                    .QueryAll(p => productIds.Contains(p.PId))
                    .ToListAsync())
                    .ToDictionary(p => p.PId);

                var packageDict = (await _productPackageIOC._product_Package_EFCore
                    .QueryAll(pp => packageIds.Contains(pp.PpId))
                    .ToListAsync())
                    .ToDictionary(pp => pp.PpId);

                var roomDict = (await _roomIOC._rooms_EFCore
                    .QueryAll(r => roomIds.Contains(r.RoomId))
                    .ToListAsync())
                    .ToDictionary(r => r.RoomId);

                var serviceDict = (await _serviceToIOC._service_EFCore
                    .QueryAll(s => serviceIds.Contains(s.SId))
                    .ToListAsync())
                    .ToDictionary(s => s.SId);

                // 5. 组装响应数据
                var data = new List<Pc_Order_Response_Dto>();
                foreach (var order in orders)
                {
                    // 安全获取关联数据
                    var customer = string.IsNullOrEmpty(order.OcId)
                        ? null
                        : customerDict.TryGetValue(order.OcId, out var c) ? c : null;

                    var employee = string.IsNullOrEmpty(order.OeId)
                        ? null
                        : employeeDict.TryGetValue(order.OeId, out var e) ? e : null;

                    var product = string.IsNullOrEmpty(order.OpId)
                        ? null
                        : productDict.TryGetValue(order.OpId, out var p) ? p : null;

                    var productPackage = string.IsNullOrEmpty(order.OppId)
                        ? null
                        : packageDict.TryGetValue(order.OppId, out var pp) ? pp : null;

                    var room = !order.OrId.HasValue
                        ? null
                        : roomDict.TryGetValue(order.OrId.Value, out var r) ? r : null;

                    var service = string.IsNullOrEmpty(order.OsId)
                        ? null
                        : serviceDict.TryGetValue(order.OsId, out var s) ? s : null;

                    var response = MapToOrderResponse(order, customer, room, employee, product, productPackage, service);
                    data.Add(response);
                }

                return Result(1, "查询成功", new { total, data });
            }
            catch (Exception ex)
            {
                return Result(0, $"查询订单失败：{ex.Message}", null);
            }
        }

        /// <summary>
        /// 按房间ID查询订单详情
        /// </summary>
        public async Task<Pc_Order_Response_Dto> GetOrderByRoomIdAsync(long roomId)
        {
            // 1. 查询房间，获取关联的订单ID
            var room = await _roomIOC._rooms_EFCore
                .QueryAll(r => r.RoomId == roomId)
                .FirstOrDefaultAsync();
            if (room == null || string.IsNullOrWhiteSpace(room.ROrderId))
            {
                return null; // 房间不存在或无关联订单
            }

            // 2. 根据订单ID查询订单主数据
            var order = await _orderIOC._order_EFCore
                .QueryAll(o => o.OId == room.ROrderId)
                .FirstOrDefaultAsync();
            if (order == null)
            {
                return null; // 订单已失效
            }

            // 3. 关联查询客户、员工、产品等信息
            var customer = await _customIOC._custom_EFCore
                .QueryAll(c => c.CId == order.OcId)
                .FirstOrDefaultAsync();
            var employee = await _employeesIOC._sys_Employees_EFCore
                .QueryAll(e => e.EId == order.OeId)
                .FirstOrDefaultAsync();
            var product = await _productIOC._product_EFCore
                .QueryAll(p => p.PId == order.OpId)
                .FirstOrDefaultAsync();
            var package = await _productPackageIOC._product_Package_EFCore
                .QueryAll(pp => pp.PpId == order.OppId)
                .FirstOrDefaultAsync();
            var service = await _serviceToIOC._service_EFCore
                .QueryAll(s => s.SId == order.OsId)
                .FirstOrDefaultAsync();

            // 4. 映射为响应DTO
            return MapToOrderResponse(order, customer, room, employee, product, package, service);
        }
        /// <summary>
        /// 获取所有产品
        /// </summary>
        public async Task<Api_Response_Dto> Get_product(Pc_Product_Request_Dto dto)
        {
            var date = await _productIOC._product_EFCore.QueryAll(out int total, Convert.ToInt32(dto.page), Convert.ToInt32(dto.limit), false, o => o.PCreateTime)
             .Select(d => new Pc_product_Response_Dto
             {
                 id = d.PId,
                 name = d.PName,
                 price = d.PPrice,
                 description = d.PDescription,
                 CreateTime = d.PCreateTime!.Value.ToString("yyyy-MM-dd HH:mm:ss")
             }).ToListAsync();
            return Result(1, "ok", new
            {
                total,
                date
            });
        }

        /// <summary>
        /// 完成支付
        /// </summary>
        public bool PayMent(string pay_id, string o_id, string money)
        {
            OrderPayment payment = new OrderPayment()
            {
                OpId = pay_id,
                OpOrderId = o_id,
                OpCreateTime = DateTime.Now,
                //OpAmount = Convert.ToDouble(money),
            };
            var order = _orderIOC._order_EFCore.QueryAll(d => d.OId == o_id).SingleOrDefault();
            if (order == null)
            {
                return false;
            } 
            order.OStatus = 1;
            order.OCreateTime = DateTime.Now;
            _orderIOC._order_EFCore.Update(order);
            _orderIOC._order_Payment_EFCore.Add(payment);
            var result = _orderIOC._order_Payment_EFCore.Transactions(_orderIOC._order_EFCore);
            return result;

        }

        /// <summary>
        /// 订单支付（不依赖TransactionsAsync方法）
        /// </summary>
        public async Task<Pc_Payment_Response_Dto> PayOrderAsync(Pc_Order_payment_Request_Dto dto)
        {
            try
            {
                #region 1. 基础参数验证
                if (string.IsNullOrWhiteSpace(dto.OrderId))
                    throw new ArgumentException("订单ID不能为空");

                if (dto.PaymentType != PAYMENT_TYPE_CASH &&
                    dto.PaymentType != PAYMENT_TYPE_WECHAT &&
                    dto.PaymentType != PAYMENT_TYPE_ALIPAY)
                    throw new ArgumentException("支付方式无效（仅支持现金、微信、支付宝）");

                if (dto.PaymentAmount <= 0)
                    throw new ArgumentException("支付金额必须大于0");
                #endregion

                #region 2. 验证订单合法性
                var order = await _orderIOC._order_EFCore
                    .QueryAll(o => o.OId == dto.OrderId)
                    .FirstOrDefaultAsync();

                if (order == null)
                    throw new ArgumentException($"订单不存在（订单ID：{dto.OrderId}）");

                if (order.OStatus != ORDER_STATUS_PENDING)
                {
                    var statusName = GetOrderStatusName(order.OStatus ?? 0);
                    throw new ArgumentException($"订单当前状态为【{statusName}】，无法重复支付");
                }

                #region 订单金额处理
                decimal? validOrderAmount = order.OAmount;

                if (!order.OAmount.HasValue || order.OAmount <= 0)
                {
                    var calculatedAmount = await RecalculateOrderAmountAsync(order);

                    if (calculatedAmount <= 0)
                        throw new ArgumentException($"订单金额无效（订单ID：{dto.OrderId}），请联系管理员");

                    if (Math.Abs(dto.PaymentAmount - calculatedAmount) > PAYMENT_AMOUNT_TOLERANCE)
                        throw new ArgumentException(
                            $"支付金额不匹配（重新计算的订单金额：{calculatedAmount:0.00}元，支付金额：{dto.PaymentAmount:0.00}元）");

                    validOrderAmount = calculatedAmount;
                }
                else if (Math.Abs(dto.PaymentAmount - order.OAmount.Value) > PAYMENT_AMOUNT_TOLERANCE)
                {
                    throw new ArgumentException(
                        $"支付金额不匹配（订单金额：{order.OAmount.Value:0.00}元，支付金额：{dto.PaymentAmount:0.00}元）");
                }
                #endregion
                #endregion

                #region 3. 准备数据更新
                var payment = new OrderPayment
                {
                    OpId = Guid.NewGuid().ToString("N"),
                    OpOrderId = order.OId,
                    OpType = dto.PaymentType,
                    OpAmount = dto.PaymentAmount,
                    OpCreateTime = DateTime.Now
                };

                // 备份订单原始状态（用于回滚）
                var originalOrderStatus = order.OStatus;
                var originalOrderAmount = order.OAmount;
                var originalCreateTime = order.OCreateTime;

                // 更新订单状态
                order.OStatus = ORDER_STATUS_PAID;
                order.OCreateTime = DateTime.Now;
                order.OAmount = validOrderAmount;
                #endregion

                #region 4. 执行数据更新（手动保证事务性）
                bool isOrderUpdated = false;
                try
                {
                    // 1. 先更新订单
                    _orderIOC._order_EFCore.Update(order);
                    await _orderIOC._order_EFCore.SaveChangesAsync();
                    isOrderUpdated = true;

                    // 2. 再添加支付记录
                    _payment_IOC._order_Payment_EFCore.Add(payment);
                    await _payment_IOC._order_Payment_EFCore.SaveChangesAsync();
                }
                catch
                {
                    // 发生异常时回滚订单更新
                    if (isOrderUpdated)
                    {
                        // 恢复订单原始状态
                        order.OStatus = originalOrderStatus;
                        order.OAmount = originalOrderAmount;
                        order.OCreateTime = originalCreateTime;

                        // 提交回滚
                        try
                        {
                            _orderIOC._order_EFCore.Update(order);
                            await _orderIOC._order_EFCore.SaveChangesAsync();
                        }
                        catch (Exception ex)
                        {
                            // 记录回滚失败的日志，需要人工介入处理
                            Console.WriteLine($"订单回滚失败：{ex.Message}，订单ID：{order.OId}");
                        }
                    }
                    throw new InvalidOperationException("支付过程中发生错误，已尝试回滚");
                }
                #endregion

                #region 5. 组装响应
                return new Pc_Payment_Response_Dto
                {
                    PaymentId = payment.OpId,
                    OrderId = order.OId,
                    PaymentType = dto.PaymentType,
                    PaymentAmount = dto.PaymentAmount,
                    PaymentTime = payment.OpCreateTime.Value.ToString("yyyy-MM-dd HH:mm:ss"),
                    OrderStatus = order.OStatus ?? 0,
                    OrderStatusName = GetOrderStatusName(order.OStatus ?? 0)
                };
                #endregion
            }
            catch (ArgumentException ex)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"支付失败：{ex.Message}", ex);
            }
        }

        /// <summary>
        /// 重新计算订单金额（容错机制）
        /// </summary>
        private async Task<decimal> RecalculateOrderAmountAsync(Order order)
        {
            decimal totalAmount = 0;

            if (!string.IsNullOrWhiteSpace(order.OpId))
            {
                var product = await _productIOC._product_EFCore
                    .QueryAll(p => p.PId == order.OpId)
                    .FirstOrDefaultAsync();
                totalAmount += product?.PPrice ?? 0;
            }

            if (!string.IsNullOrWhiteSpace(order.OppId))
            {
                var package = await _productPackageIOC._product_Package_EFCore
                    .QueryAll(pp => pp.PpId == order.OppId)
                    .FirstOrDefaultAsync();
                totalAmount += package?.PpPrice ?? 0;
            }

            if (!string.IsNullOrWhiteSpace(order.OsId))
            {
                var service = await _serviceToIOC._service_EFCore
                    .QueryAll(s => s.SId == order.OsId)
                    .FirstOrDefaultAsync();
                totalAmount += service?.SPrice ?? 0;
            }

            return totalAmount;
        }

        /// <summary>
        /// 清除房间关联的订单并将房间状态改为空闲
        /// </summary>
        /// <param name="roomId">房间ID</param>
        /// <returns>操作结果响应DTO</returns>
        public async Task<Api_Response_Dto> ClearRoomOrderAsync(long roomId)
        {
            // 定义操作日志前缀（便于问题定位）
            const string operationLogPrefix = "清除房间订单操作";

            try
            {
                #region 1. 基础参数验证
                // 验证房间ID有效性
                if (roomId <= 0)
                    return Result(0, $"{operationLogPrefix}失败：房间ID必须大于0", null);
                #endregion

                #region 2. 查询并验证房间信息
                // 查询房间（包含关联的订单ID）
                var room = await _roomIOC._rooms_EFCore
                    .QueryAll(r => r.RoomId == roomId)
                    .FirstOrDefaultAsync();

                // 验证房间是否存在
                if (room == null)
                    return Result(0, $"{operationLogPrefix}失败：未找到ID为{roomId}的房间", null);

                // 验证房间当前状态（仅占用状态可执行清除操作）
                if (room.RoomStatus != ROOM_OCCUPIED_STATUS)
                {
                    string currentStatusName = room.RoomStatus == ROOM_AVAILABLE_STATUS
                        ? "空闲"
                        : "未知（非占用）";
                    return Result(0, $"{operationLogPrefix}失败：房间当前状态为【{currentStatusName}】，仅占用状态可执行清除操作", null);
                }

                // 验证房间是否关联订单（无关联订单无需清除）
                if (string.IsNullOrWhiteSpace(room.ROrderId))
                    return Result(0, $"{operationLogPrefix}失败：ID为{roomId}的房间未关联任何订单", null);
                #endregion

                #region 3. 查询关联订单（用于日志记录）
                string orderId = room.ROrderId;
                var relatedOrder = await _orderIOC._order_EFCore
                    .QueryAll(o => o.OId == orderId)
                    .FirstOrDefaultAsync();
                #endregion

                #region 4. 执行更新操作
                // 备份原始数据用于日志
                string originalOrderId = room.ROrderId;
                int originalRoomStatus = room.RoomStatus;

                // 更新房间状态：占用 -> 空闲，同时清除订单关联
                room.RoomStatus = ROOM_AVAILABLE_STATUS;
                room.ROrderId = null; // 清除订单ID关联

                // 保存房间更新
                _roomIOC._rooms_EFCore.Update(room);
                int updateCount = await _roomIOC._rooms_EFCore.SaveChangesAsync();

                // 验证更新结果
                if (updateCount <= 0)
                    return Result(0, $"{operationLogPrefix}失败：房间状态更新后无数据变更，可能存在并发修改", null);
                #endregion

                #region 5. 组装操作结果
                var resultData = new
                {
                    RoomId = room.RoomId,
                    RoomName = room.RoomName,
                    OriginalRoomStatus = "占用",
                    NewRoomStatus = "空闲",
                    ClearedOrderId = originalOrderId,
                    OrderStatus = relatedOrder != null
                        ? GetOrderStatusName(relatedOrder.OStatus ?? 0)
                        : "订单已不存在",
                    OperationTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
                };

                return Result(1, $"{operationLogPrefix}成功：房间【{room.RoomName}（ID：{roomId}）】已恢复空闲状态，清除的订单ID：{originalOrderId}", resultData);
                #endregion
            }
            catch (DbUpdateException ex)
            {
                string errorMsg = $"{operationLogPrefix}数据库操作失败：{ex.InnerException?.Message ?? ex.Message}";
                Console.WriteLine($"{errorMsg} | 异常堆栈：{ex.StackTrace}");
                return Result(0, errorMsg, null);
            }
            catch (Exception ex)
            {
                string errorMsg = $"{operationLogPrefix}发生未知错误：{ex.Message}";
                Console.WriteLine($"{errorMsg} | 异常堆栈：{ex.StackTrace}");
                return Result(0, errorMsg, null);
            }
        }

    }
}
