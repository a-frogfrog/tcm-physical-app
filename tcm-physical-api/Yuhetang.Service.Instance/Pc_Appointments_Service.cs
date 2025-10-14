using Microsoft.EntityFrameworkCore;
using System.Linq;
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
    public class Pc_Appointments_Service : Base_Service, I_Pc_Appointments_Service
    {
        // 业务常量定义
        private const int MAX_BOOKING_HOURS = 24;        // 最大预约时长
        private const int MIN_BOOKING_MINUTES = 30;      // 最小预约时长
        private const int EMPLOYEE_ACTIVE_STATUS = 1;    // 员工在职状态
        private const int SERVICE_ACTIVE_STATUS = 1;     // 服务上架状态（原产品状态替换）
        private const int PRODUCT_PACKAGE_ACTIVE_STATUS = 1; // 套餐上架状态（保留）
        private const int ROOM_AVAILABLE_STATUS = 0;     // 房间可用状态
        private const int APPOINTMENT_PENDING_STATUS = 0;// 预约待确认状态
        private const int APPOINTMENT_CANCELLED_STATUS = 2;// 预约已取消状态
        private const int APPOINTMENT_COMPLETED_STATUS = 3;// 预约已完成状态
        private const int MAX_HISTORY_DAYS = 30;         // 允许预约的最大历史天数
        private const int APPOINTMENT_STATUS_PENDING = 0;    // 待处理
        private const int APPOINTMENT_STATUS_CONFIRMED = 1;  // 已确认
        private const int APPOINTMENT_STATUS_COMPLETED = 2;  // 已完成
        private const int APPOINTMENT_STATUS_CANCELLED = 3;  // 已取消
        private const int APPOINTMENT_STATUS_CONVERTED = 4;  // 已转为订单


        private readonly Order_IOC _orderIOC;
        private readonly Appointments_IOC _appointmentsIOC;
        private readonly Custom_IOC _customIOC;
        private readonly ServiceTo_IOC _serviceToIOC;
        private readonly Employees_IOC _employeesIOC;
        private readonly Room_IOC _roomIOC;
        private readonly Product_Package_IOC _productPackageIOC;
        private readonly I_Pc_Order_Service _i_Pc_Order_Service;


        // 构造函数：调整依赖注入
        public Pc_Appointments_Service(
            Appointments_IOC appointmentsIOC,
            Order_IOC orderIOC,
            Custom_IOC customIOC,
            ServiceTo_IOC serviceToIOC,
            Employees_IOC employeesIOC,
            Room_IOC roomIOC,
            Product_Package_IOC productPackageIOC,
            I_Pc_Order_Service i_Pc_Order_Service)
        {
            _orderIOC = orderIOC;
            _appointmentsIOC = appointmentsIOC;
            _customIOC = customIOC;
            _serviceToIOC = serviceToIOC;
            _employeesIOC = employeesIOC;
            _roomIOC = roomIOC;
            _productPackageIOC = productPackageIOC;
            _i_Pc_Order_Service = i_Pc_Order_Service;
        }


        /// <summary>
        /// 预约转订单核心方法（完全复用现有订单服务逻辑）
        /// </summary>
        /// <param name="dto">预约转订单请求参数</param>
        /// <returns>包含预约+订单信息的响应</returns>
        public async Task<Api_Response_Dto> ConvertAppointmentToOrderAsync(Pc_AppointmentToOrder_Request_Dto dto)
        {
            const string operationPrefix = "预约转订单";

            try
            {
                #region 1. 基础参数验证（与订单服务校验风格一致）
                if (string.IsNullOrWhiteSpace(dto.AppointmentId))
                    return Result(0, $"{operationPrefix}失败：预约ID不能为空", null);

                // 备注长度校验（复用订单服务的MAX_REMARK_LENGTH常量，需确保可访问或定义一致）
                const int MAX_REMARK_LENGTH = 200;
                if (!string.IsNullOrWhiteSpace(dto.Remark) && dto.Remark.Trim().Length > MAX_REMARK_LENGTH)
                    return Result(0, $"{operationPrefix}失败：备注长度不能超过{MAX_REMARK_LENGTH}个字符", null);
                #endregion

                #region 2. 查询并验证预约信息（确保预约可转为订单）
                var appointment = await _appointmentsIOC._appointments
                    .QueryAll(a => a.AId == dto.AppointmentId)
                    .FirstOrDefaultAsync();

                // 验证预约是否存在
                if (appointment == null)
                    return Result(0, $"{operationPrefix}失败：未找到ID为【{dto.AppointmentId}】的预约", null);

                // 验证预约状态（仅待处理/已确认可转订单，避免重复转换）
                if (appointment.BookingStatus != APPOINTMENT_STATUS_PENDING &&
                    appointment.BookingStatus != APPOINTMENT_STATUS_CONFIRMED)
                {
                    var statusName = GetAppointmentStatusName(appointment.BookingStatus);
                    return Result(0, $"{operationPrefix}失败：预约当前状态为【{statusName}】，仅【待处理】或【已确认】状态可转订单", null);
                }

                // 验证预约关联的核心数据（客户、员工、服务/产品/套餐至少一项，与订单服务必填项一致）
                if (string.IsNullOrWhiteSpace(appointment.AcId))
                    return Result(0, $"{operationPrefix}失败：预约未关联客户，无法生成订单", null);
                if (string.IsNullOrWhiteSpace(appointment.AeId))
                    return Result(0, $"{operationPrefix}失败：预约未关联员工，无法生成订单", null);
                if (string.IsNullOrWhiteSpace(appointment.AppId) &&
                    string.IsNullOrWhiteSpace(appointment.AsId))
                    return Result(0, $"{operationPrefix}失败：预约未关联套餐/服务，无法生成订单", null);
                #endregion

                #region 3. 构造订单请求DTO（映射预约数据到订单参数）
                var orderRequest = new Pc_Order_Request_Dto
                {
                    // 核心关联ID（直接从预约获取）
                    CustomerId = appointment.AcId,
                    EmployeeId = appointment.AeId,
                    PackageId = appointment.AppId,
                    ServiceId = appointment.AsId,
                    RoomId = appointment.ArId, // 预约关联的房间ID（可选）
                    AppointmentId = appointment.AId, // 关联原预约ID，便于追溯
                    Remark = dto.Remark // 转单备注（支持自定义）
                };
                #endregion

                #region 4. 调用现有订单服务创建订单（完全复用订单流程）
                // 直接复用AddOrderAsync的校验逻辑：客户/员工有效性、产品状态、房间状态、金额计算
                Pc_Order_Response_Dto orderResponse;
                try
                {
                    orderResponse = await _i_Pc_Order_Service.AddOrderAsync(orderRequest);
                }
                catch (InvalidOperationException ex)
                {
                    // 捕获订单服务抛出的业务错误（如房间已占用、产品已下架）
                    return Result(0, $"{operationPrefix}失败：{ex.Message}", null);
                }
                #endregion

                #region 5. 更新预约状态为"已转为订单"（避免重复转换）
                // 备份原预约状态（用于响应返回）
                var originalAppointmentStatus = appointment.BookingStatus;

                // 更新预约状态和备注
                appointment.BookingStatus = APPOINTMENT_STATUS_CONVERTED;
                appointment.Remark = $"{appointment.Remark ?? ""} | {operationPrefix}成功，订单ID：{orderResponse.OrderId}，转换时间：{DateTime.Now:yyyy-MM-dd HH:mm}";

                _appointmentsIOC._appointments.Update(appointment);
                await _appointmentsIOC._appointments.SaveChangesAsync();
                #endregion

                #region 6. 组装转单响应（包含预约+订单双维度信息）
                var resultData = new Pc_AppointmentToOrder_Response_Dto
                {
                    // 继承订单响应的基础字段
                    OrderId = orderResponse.OrderId,
                    OrderAmount = orderResponse.OrderAmount,
                    OrderStatus = orderResponse.OrderStatus,
                    OrderStatusName = orderResponse.OrderStatusName,
                    Remark = orderResponse.Remark,
                    CreateTime = orderResponse.CreateTime,
                    CustomerId = orderResponse.CustomerId,
                    CustomerName = orderResponse.CustomerName,
                    EmployeeId = orderResponse.EmployeeId,
                    EmployeeName = orderResponse.EmployeeName,
                    RoomId = orderResponse.RoomId,
                    RoomName = orderResponse.RoomName,
                    ProductId = orderResponse.ProductId,
                    ProductName = orderResponse.ProductName,
                    PackageId = orderResponse.PackageId,
                    PackageName = orderResponse.PackageName,
                    ServiceId = orderResponse.ServiceId,
                    ServiceName = orderResponse.ServiceName,
                    AppointmentId = appointment.AId, // 原预约ID
                    ConversionTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"), // 转单时间
                    OriginalAppointmentStatus = GetAppointmentStatusName(originalAppointmentStatus) // 原预约状态
                };
                #endregion

                return Result(1, $"{operationPrefix}成功：预约【{appointment.AId}】已转为订单【{orderResponse.OrderId}】", resultData);
            }
            catch (DbUpdateException ex)
            {
                // 数据库操作异常（如保存失败、事务冲突）
                var errorMsg = $"{operationPrefix}数据库操作失败：{ex.InnerException?.Message ?? ex.Message}";
                Console.WriteLine($"{errorMsg} | 堆栈：{ex.StackTrace}");
                return Result(0, errorMsg, null);
            }
            catch (Exception ex)
            {
                // 未知异常
                var errorMsg = $"{operationPrefix}发生未知错误：{ex.Message}";
                Console.WriteLine($"{errorMsg} | 堆栈：{ex.StackTrace}");
                return Result(0, errorMsg, null);
            }
        }

        /// <summary>
        /// 预约状态转中文名称（与订单服务的GetOrderStatusName风格一致）
        /// </summary>
        private string GetAppointmentStatusName(int? status)
        {
            if (!status.HasValue)
                return "未知状态";

            return status switch
            {
                APPOINTMENT_STATUS_PENDING => "待处理",
                APPOINTMENT_STATUS_CONFIRMED => "已确认",
                APPOINTMENT_STATUS_COMPLETED => "已完成",
                APPOINTMENT_STATUS_CANCELLED => "已取消",
                APPOINTMENT_STATUS_CONVERTED => "已转为订单",
                _ => "未知状态"
            };
        }
        /// <summary>
        /// 新增预约（产品替换为服务，保留套餐）
        /// </summary>
        public async Task<Pc_Appointments_Response> AddAppointmentAsync(Pc_Appointment_Request_Dto dto)
        {
            try
            {
                // 1. 验证参数并解析时间
                var (startTime, endTime) = ValidateDto(dto);

                // 2. 验证关联数据：产品→服务，保留套餐
                var customer = await ValidateAndGetCustomerAsync(dto.CustomerId);
                var employee = await ValidateAndGetEmployeeAsync(dto.EmployeeId);
                var room = await ValidateAndGetRoomAsync(dto.RoomId);
                var service = await ValidateAndGetServiceAsync(dto.ServiceId); // 服务验证（替换产品）
                var productPackage = await ValidateAndGetProductPackageAsync(dto.PackageId); // 保留套餐

                // 3. 业务规则校验：服务/套餐二选一
                ValidateServiceOrPackageSelection(service, productPackage);

                // 4. 冲突检查
                if (employee != null)
                    await CheckEmployeeConflictAsync(employee.EId, startTime, endTime);

                if (room != null)
                    await CheckRoomConflictAsync(room.RoomId, startTime, endTime);

                // 5. 创建预约实体：添加服务字段，保留套餐字段
                var appointment = new Appointment
                {
                    AId = Guid.NewGuid().ToString("N"),
                    AcId = customer.CId,
                    ArId = room?.RoomId,
                    AeId = employee?.EId,
                    AsId = service?.SId,          // 服务ID（替换原ApId）
                    AppId = productPackage?.PpId, // 保留套餐ID
                    BookingStartTime = startTime,
                    BookingEndTime = endTime,
                    BookingStatus = APPOINTMENT_PENDING_STATUS,
                    Remark = dto.Remark?.Trim() ?? string.Empty,
                    CreateTime = DateTime.Now
                };

                // 6. 保存到数据库
                _appointmentsIOC._appointments.Add(appointment);
                await _appointmentsIOC._appointments.SaveChangesAsync();

                // 7. 构建响应
                return MapToResponse(appointment, customer, room, employee, service, productPackage);
            }
            catch (ArgumentException ex)
            {
                throw new InvalidOperationException($"预约失败：{ex.Message}", ex);
            }
            catch (DbUpdateException ex)
            {
                throw new InvalidOperationException($"数据保存失败：{ex.InnerException?.Message ?? ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"新增预约时发生错误：{ex.Message}", ex);
            }
        }

        /// <summary>
        /// 验证请求参数
        /// </summary>
        private (DateTime startTime, DateTime endTime) ValidateDto(Pc_Appointment_Request_Dto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.CustomerId))
                throw new ArgumentException("客户ID不能为空");

            if (!DateTime.TryParse(dto.BookingStartTime, out DateTime startTime))
                throw new ArgumentException("预约开始时间格式不正确（需符合yyyy-MM-dd HH:mm:ss）");

            if (!DateTime.TryParse(dto.BookingEndTime, out DateTime endTime))
                throw new ArgumentException("预约结束时间格式不正确（需符合yyyy-MM-dd HH:mm:ss）");

            var earliestAllowedTime = DateTime.Now.AddDays(-MAX_HISTORY_DAYS).Date;
            if (startTime < earliestAllowedTime)
                throw new ArgumentException($"开始时间不能早于{earliestAllowedTime:yyyy-MM-dd}（仅允许补录{MAX_HISTORY_DAYS}天内的预约）");

            if (startTime >= endTime)
                throw new ArgumentException("开始时间不能晚于或等于结束时间");

            if (endTime.Subtract(startTime).TotalMinutes < MIN_BOOKING_MINUTES)
                throw new ArgumentException($"预约时长不能少于{MIN_BOOKING_MINUTES}分钟");

            if (endTime.Subtract(startTime).TotalHours > MAX_BOOKING_HOURS)
                throw new ArgumentException($"预约时长不能超过{MAX_BOOKING_HOURS}小时");

            return (startTime, endTime);
        }

        /// <summary>
        /// 验证服务/套餐二选一
        /// </summary>
        private void ValidateServiceOrPackageSelection(ServiceTo service, ProductPackage productPackage)
        {
            if (service == null && productPackage == null)
                throw new ArgumentException("请至少选择一个服务或套餐");
        }

        /// <summary>
        /// 验证并获取客户信息
        /// </summary>
        private async Task<Custom> ValidateAndGetCustomerAsync(string customerId)
        {
            var customer = await _customIOC._custom_EFCore
                .QueryAll(where: c => c.CId == customerId)
                .FirstOrDefaultAsync();

            if (customer == null)
                throw new ArgumentException("客户不存在");

            return customer;
        }

        /// <summary>
        /// 验证并获取员工信息
        /// </summary>
        private async Task<SysEmployee> ValidateAndGetEmployeeAsync(string employeeId)
        {
            if (string.IsNullOrWhiteSpace(employeeId))
                throw new ArgumentException("员工ID不能为空");

            var employee = await _employeesIOC._sys_Employees_EFCore
                .QueryAll(where: e => e.EId == employeeId)
                .FirstOrDefaultAsync();

            if (employee == null)
                throw new ArgumentException("员工不存在");

            if (employee.EStatus != EMPLOYEE_ACTIVE_STATUS)
                throw new ArgumentException("员工非在职状态，无法提供服务");

            return employee;
        }

        /// <summary>
        /// 验证并获取房间信息
        /// </summary>
        private async Task<Room> ValidateAndGetRoomAsync(long? roomId)
        {
            if (!roomId.HasValue)
                return null;

            var room = await _roomIOC._rooms_EFCore
                .QueryAll(where: r => r.RoomId == roomId.Value)
                .FirstOrDefaultAsync();

            if (room == null)
                throw new ArgumentException("房间不存在");

            if (room.RoomStatus != ROOM_AVAILABLE_STATUS)
                throw new ArgumentException("房间不可用（可能已占用或维护中）");

            return room;
        }

        /// <summary>
        /// 验证并获取服务信息（替换原产品验证）
        /// </summary>
        private async Task<ServiceTo> ValidateAndGetServiceAsync(string serviceId)
        {
            if (string.IsNullOrWhiteSpace(serviceId))
                return null;

            var service = await _serviceToIOC._service_EFCore
                .QueryAll(where: s => s.SId == serviceId)
                .FirstOrDefaultAsync();

            if (service == null)
                throw new ArgumentException("服务不存在");
            return service;
        }

        /// <summary>
        /// 验证并获取套餐信息（保留）
        /// </summary>
        private async Task<ProductPackage> ValidateAndGetProductPackageAsync(string packageId)
        {
            if (string.IsNullOrWhiteSpace(packageId))
                return null;

            var productPackage = await _productPackageIOC._product_Package_EFCore
                .QueryAll(where: pp => pp.PpId == packageId)
                .FirstOrDefaultAsync();

            if (productPackage == null)
                throw new ArgumentException("套餐不存在");

            if (productPackage.PpStatus != PRODUCT_PACKAGE_ACTIVE_STATUS)
                throw new ArgumentException("套餐已下架，无法预约");

            return productPackage;
        }

        /// <summary>
        /// 检查房间预约冲突
        /// </summary>
        private async Task CheckRoomConflictAsync(long roomId, DateTime startTime, DateTime endTime)
        {
            var hasConflict = await _appointmentsIOC._appointments
                .QueryAll(a =>
                    a.ArId == roomId &&
                    a.BookingStatus != APPOINTMENT_CANCELLED_STATUS &&
                    a.BookingStatus != APPOINTMENT_COMPLETED_STATUS &&
                    !(a.BookingEndTime <= startTime || a.BookingStartTime >= endTime)
                )
                .AnyAsync();

            if (hasConflict)
                throw new ArgumentException("该房间在所选时段已被预约，请选择其他时段或房间");
        }

        /// <summary>
        /// 检查员工预约冲突
        /// </summary>
        private async Task CheckEmployeeConflictAsync(string employeeId, DateTime startTime, DateTime endTime)
        {
            var hasConflict = await _appointmentsIOC._appointments
                .QueryAll(a =>
                    a.AeId == employeeId &&
                    a.BookingStatus != APPOINTMENT_CANCELLED_STATUS &&
                    a.BookingStatus != APPOINTMENT_COMPLETED_STATUS &&
                    !(a.BookingEndTime <= startTime || a.BookingStartTime >= endTime)
                )
                .AnyAsync();

            if (hasConflict)
                throw new ArgumentException("该员工在所选时段已有其他预约，请选择其他时段或员工");
        }

        /// <summary>
        /// 映射预约实体到响应对象
        /// </summary>
        private Pc_Appointments_Response MapToResponse(
            Appointment appointment,
            Custom customer,
            Room room,
            SysEmployee employee,
            ServiceTo service,
            ProductPackage productPackage)
        {
            return new Pc_Appointments_Response
            {
                id = appointment.AId,
                CustomsName = customer?.CName ?? string.Empty,
                CustomsPhone = customer?.CPhone ?? string.Empty,
                CustomerId = appointment.AcId,
                RoomNumber = room?.RoomNumber ?? string.Empty,
                RoomName = room?.RoomName ?? string.Empty,
                RoomId = appointment.ArId,
                EmployeeName = employee?.EName ?? string.Empty,
                EmployeeId = appointment.AeId,
                ServiceName= service?.SName ?? string.Empty,   // 服务名称（替换产品名称）
                ServiceId = appointment.AsId,                  // 服务ID（替换产品ID）
                ProductpackageName = productPackage?.PpName ?? string.Empty, // 保留套餐名称
                ProductpackageId = appointment.AppId,           // 保留套餐ID
                BookingStartTime = appointment.BookingStartTime?.ToString("yyyy-MM-dd HH:mm:ss") ?? string.Empty,
                BookingEndTime = appointment.BookingEndTime?.ToString("yyyy-MM-dd HH:mm:ss") ?? string.Empty,
                BookingStatus = appointment.BookingStatus,
                Remark = appointment.Remark ?? string.Empty,
                CreateTime = appointment.CreateTime?.ToString("yyyy-MM-dd HH:mm:ss") ?? string.Empty
            };
        }

        /// <summary>
        /// 转换预约状态为名称
        /// </summary>
        private string GetBookingStatusName(int status)
        {
            return status switch
            {
                APPOINTMENT_PENDING_STATUS => "待确认",
                1 => "已确认",
                APPOINTMENT_CANCELLED_STATUS => "已取消",
                APPOINTMENT_COMPLETED_STATUS => "已完成",
                _ => "未知状态"
            };
        }

        /// <summary>
        /// 获取所有预约
        /// </summary>
        public async Task<Api_Response_Dto> Get_Appointments(Pc_Appointment_Request_Dto dto)
        {
            try
            {
                // 1. 验证分页参数
                int page = dto.page <= 0 ? 1 : Convert.ToInt32(dto.page);
                int limit = dto.limit <= 0 ? 10 : Convert.ToInt32(dto.limit);

                // 2. 分页查询预约主表
                var appointments = await _appointmentsIOC._appointments
                    .QueryAll(out int total, page, limit, false, o => o.CreateTime)
                    .ToListAsync();

                // 3. 收集关联ID：服务ID替换产品ID，保留套餐ID
                var customerIds = appointments.Where(a => !string.IsNullOrWhiteSpace(a.AcId))
                                              .Select(a => a.AcId).Distinct().ToList();
                var employeeIds = appointments.Where(a => !string.IsNullOrWhiteSpace(a.AeId))
                                              .Select(a => a.AeId).Distinct().ToList();
                var serviceIds = appointments.Where(a => !string.IsNullOrWhiteSpace(a.AsId))
                                             .Select(a => a.AsId).Distinct().ToList();
                var packageIds = appointments.Where(a => !string.IsNullOrWhiteSpace(a.AppId))
                                             .Select(a => a.AppId).Distinct().ToList();
                var roomIds = appointments.Where(a => a.ArId.HasValue)
                                         .Select(a => a.ArId.Value).Distinct().ToList();

                // 4. 批量查询关联数据
                var customerDict = (await _customIOC._custom_EFCore
                    .QueryAll(c => customerIds.Contains(c.CId))
                    .ToListAsync())
                    .ToDictionary(c => c.CId);

                var employeeDict = (await _employeesIOC._sys_Employees_EFCore
                    .QueryAll(e => employeeIds.Contains(e.EId))
                    .ToListAsync())
                    .ToDictionary(e => e.EId);

                var serviceDict = (await _serviceToIOC._service_EFCore
                    .QueryAll(s => serviceIds.Contains(s.SId))
                    .ToListAsync())
                    .ToDictionary(s => s.SId);

                var packageDict = (await _productPackageIOC._product_Package_EFCore
                    .QueryAll(pp => packageIds.Contains(pp.PpId))
                    .ToListAsync())
                    .ToDictionary(pp => pp.PpId);

                var roomDict = (await _roomIOC._rooms_EFCore
                    .QueryAll(r => roomIds.Contains(r.RoomId))
                    .ToListAsync())
                    .ToDictionary(r => r.RoomId);

                // 5. 组装响应数据
                var data = new List<Pc_Appointments_Response>();
                foreach (var appointment in appointments)
                {
                    var customer = string.IsNullOrEmpty(appointment.AcId)
                        ? null
                        : customerDict.TryGetValue(appointment.AcId, out var c) ? c : null;

                    var employee = string.IsNullOrEmpty(appointment.AeId)
                        ? null
                        : employeeDict.TryGetValue(appointment.AeId, out var e) ? e : null;

                    var service = string.IsNullOrEmpty(appointment.AsId)
                        ? null
                        : serviceDict.TryGetValue(appointment.AsId, out var s) ? s : null;

                    var productPackage = string.IsNullOrEmpty(appointment.AppId)
                        ? null
                        : packageDict.TryGetValue(appointment.AppId, out var pp) ? pp : null;

                    var room = !appointment.ArId.HasValue
                        ? null
                        : roomDict.TryGetValue(appointment.ArId.Value, out var r) ? r : null;

                    var response = MapToResponse(appointment, customer, room, employee, service, productPackage);
                    data.Add(response);
                }

                return Result(1, "查询成功", new { total, data });
            }
            catch (Exception ex)
            {
                return Result(0, $"查询预约失败：{ex.Message}", null);
            }
        }

        /// <summary>
        /// 获取预约详情
        /// </summary>
        private async Task<Pc_Appointments_Response> GetAppointmentDetailsAsync(Appointment appointment)
        {
            Custom customer = null;
            if (!string.IsNullOrEmpty(appointment.AcId))
            {
                customer = await _customIOC._custom_EFCore
                    .QueryAll(c => c.CId == appointment.AcId)
                    .FirstOrDefaultAsync();
            }

            Room room = null;
            if (appointment.ArId.HasValue)
            {
                room = await _roomIOC._rooms_EFCore
                    .QueryAll(r => r.RoomId == appointment.ArId.Value)
                    .FirstOrDefaultAsync();
            }

            SysEmployee employee = null;
            if (!string.IsNullOrEmpty(appointment.AeId))
            {
                employee = await _employeesIOC._sys_Employees_EFCore
                    .QueryAll(e => e.EId == appointment.AeId)
                    .FirstOrDefaultAsync();
            }

            ServiceTo service = null;
            if (!string.IsNullOrEmpty(appointment.AsId))
            {
                service = await _serviceToIOC._service_EFCore
                    .QueryAll(s => s.SId == appointment.AsId)
                    .FirstOrDefaultAsync();
            }

            ProductPackage productPackage = null;
            if (!string.IsNullOrEmpty(appointment.AppId))
            {
                productPackage = await _productPackageIOC._product_Package_EFCore
                    .QueryAll(pp => pp.PpId == appointment.AppId)
                    .FirstOrDefaultAsync();
            }

            return MapToResponse(
                appointment,
                customer,
                room,
                employee,
                service,
                productPackage
            );
        }

        /// <summary>
        /// 获取所有房间
        /// </summary>
        public async Task<Api_Response_Dto> Get_Rooms(Pc_Rooms_Request_Dto dto)
        {
            try
            {
                int page = dto.page <= 0 ? 1 : Convert.ToInt32(dto.page);
                int limit = dto.limit <= 0 ? 10 : Convert.ToInt32(dto.limit);

                // 1. 查询房间列表（含分页和总条数）
                var rooms = await _roomIOC._rooms_EFCore
                    .QueryAll(out int total, page, limit, false, o => o.CreateTime)
                    .ToListAsync();

                // 2. 收集所有关联的订单ID（过滤null和空字符串）
                var orderIds = rooms
                    .Where(r => !string.IsNullOrWhiteSpace(r.ROrderId))
                    .Select(r => r.ROrderId)
                    .Distinct()
                    .ToList();

                // 3. 批量查询订单（获取订单关联的员工ID）
                var orderDict = new Dictionary<string, string>();
                if (orderIds.Any())
                {
                    var orders = await _orderIOC._order_EFCore
                        .QueryAll(o => orderIds.Contains(o.OId))
                        .ToListAsync();

                    // 过滤员工ID为null或空的情况
                    orderDict = orders
                        .Where(o => !string.IsNullOrWhiteSpace(o.OeId))
                        .ToDictionary(o => o.OId, o => o.OeId);
                }

                // 4. 收集所有员工ID并批量查询员工信息
                var employeeIds = orderDict.Values
                    .Distinct()
                    .ToList();

                var employeeDict = new Dictionary<string, string>();
                if (employeeIds.Any())
                {
                    employeeDict = await _employeesIOC._sys_Employees_EFCore
                        .QueryAll(e => employeeIds.Contains(e.EId))
                        .ToDictionaryAsync(e => e.EId, e => e.EName);
                }

                // 5. 组装响应数据
                var responseData = rooms.Select(room =>
                {
                    // 确保订单ID不为null
                    var orderId = room.ROrderId ?? string.Empty;
                    string eId = string.Empty;

                    // 只有当订单ID有效时才尝试获取员工ID
                    if (!string.IsNullOrWhiteSpace(orderId) && orderDict.TryGetValue(orderId, out var empId))
                    {
                        eId = empId;
                    }

                    return new
                    {
                        room = new Pc_Rooms_Response_Dto
                        {
                            id = room.RoomId.ToString(),
                            number = room.RoomNumber,
                            name = room.RoomName,
                            status = room.RoomStatus,
                            rOrderId = orderId,
                            rAppointmentId = room.RAppointmentId,
                            remark = room.Remark,
                            create_time = room.CreateTime?.ToString("yyyy-MM-dd HH:mm:ss") ?? string.Empty
                        },
                        dutyEmployee = new
                        {
                            id = eId,
                            name = !string.IsNullOrEmpty(eId) && employeeDict.TryGetValue(eId, out var eName)
                                ? eName
                                : string.Empty
                        }
                    };
                }).ToList();

                return Result(1, "查询成功", new { total, data = responseData });
            }
            catch (Exception ex)
            {
                return Result(0, $"查询房间失败：{ex.Message}", null);
            }
        }

        /// <summary>
        /// 获取所有员工
        /// </summary>
        public async Task<Api_Response_Dto> Get_employees(Pc_Employees_Request_Dto dto)
        {
            var date = await _employeesIOC._sys_Employees_EFCore.QueryAll(out int total, Convert.ToInt32(dto.page), Convert.ToInt32(dto.limit), false, o => o.ECreateTime)
             .Select(d => new Pc_Employees_Response_Dto
             {
                 id = d.EId,
                 name = d.EName,
                 account = d.EAccount,
                 dept = d.EDept,
                 duty = d.EDuty,
                 gender = d.EGender,
                 phone = d.EPhone,
                 status = d.EStatus,
                 CreateTime = d.ECreateTime!.Value.ToString("yyyy-MM-dd HH:mm:ss")
             }).ToListAsync();
            return Result(1, "ok", new
            {
                total,
                date
            });
        }

        /// <summary>
        /// 获取所有服务
        /// </summary>
        public async Task<Api_Response_Dto> Get_services(Pc_Service_Request_Dto dto)
        {
            var date = await _serviceToIOC._service_EFCore.QueryAll(out int total, Convert.ToInt32(dto.page), Convert.ToInt32(dto.limit), false, o => o.CreateTime)
             .Select(d => new Pc_Service_Response_Dto
             {
                 id = d.SId,
                 name = d.SName,
                 price = d.SPrice,
                 description = d.SDescription,
                 duration = d.SDuration,
                 createtime = d.CreateTime!.Value.ToString("yyyy-MM-dd HH:mm:ss")
             }).ToListAsync();
            return Result(1, "ok", new
            {
                total,
                date
            });
        }

        /// <summary>
        /// 获取所有套餐（保留）
        /// </summary>
        public async Task<Api_Response_Dto> Get_productpackage(Pc_Product_package_Request_Dto dto)
        {
            var date = await _productPackageIOC._product_Package_EFCore.QueryAll(out int total, Convert.ToInt32(dto.page), Convert.ToInt32(dto.limit), false, o => o.PpCreateTime)
              .Select(d => new Pc_Product_package_Response_Dto
              {
                  id = d.PpId,
                  name = d.PpName,
                  price = d.PpPrice,
                  status = d.PpStatus,
                  desc = d.PpDescription,
                  CreateTime = d.PpCreateTime!.Value.ToString("yyyy-MM-dd HH:mm:ss")
              }).ToListAsync();
            return Result(1, "ok", new
            {
                total,
                date
            });
        }

        /// <summary>
        /// 修改预约状态
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> UpdateAppointmentStatusAsync(Pc_UpdateAppointmentStatus_Request_Dto dto)
        {
            const string operationPrefix = "修改预约状态";

            try
            {
                #region 1. 基础参数验证
                // 验证预约ID
                if (string.IsNullOrWhiteSpace(dto.AppointmentId))
                    return Result(0, $"{operationPrefix}失败：预约ID不能为空", null);

                // 验证目标状态（仅允许合法状态值）
                var validStatusList = new List<int>
                {
                    APPOINTMENT_STATUS_PENDING,       // 待处理
                    APPOINTMENT_STATUS_CONFIRMED,     // 已确认
                    APPOINTMENT_STATUS_COMPLETED,     // 已完成
                    APPOINTMENT_STATUS_CANCELLED,     // 已取消
                    APPOINTMENT_STATUS_CONVERTED      // 已转为订单（谨慎修改，建议仅内部流程触发）
                };
                if (!validStatusList.Contains(dto.TargetStatus))
                {
                    var validStatusStr = string.Join("、", validStatusList.Select(s => $"{s}({GetAppointmentStatusName(s)})"));
                    return Result(0, $"{operationPrefix}失败：目标状态不合法，仅允许{validStatusStr}", null);
                }

                // 验证备注长度（复用订单服务的200字符限制）
                const int MAX_REMARK_LENGTH = 200;
                if (!string.IsNullOrWhiteSpace(dto.UpdateRemark) && dto.UpdateRemark.Trim().Length > MAX_REMARK_LENGTH)
                    return Result(0, $"{operationPrefix}失败：修改备注长度不能超过{MAX_REMARK_LENGTH}个字符", null);
                #endregion

                #region 2. 查询并验证预约信息
                // 查询预约（含排他锁，避免并发修改）
                var appointment = await _appointmentsIOC._appointments
                    .QueryAll(a => a.AId == dto.AppointmentId)
                    .FirstOrDefaultAsync();

                // 验证预约是否存在
                if (appointment == null)
                    return Result(0, $"{operationPrefix}失败：未找到ID为【{dto.AppointmentId}】的预约", null);

                // 验证状态是否无需修改（当前状态 == 目标状态）
                if (appointment.BookingStatus == dto.TargetStatus)
                {
                    var statusName = GetAppointmentStatusName(dto.TargetStatus);
                    return Result(1, $"{operationPrefix}提示：预约当前状态已为【{statusName}】，无需重复修改", null);
                }

                // 特殊状态流转限制（例如：已转为订单的预约不允许改回其他状态）
                if (appointment.BookingStatus == APPOINTMENT_STATUS_CONVERTED && dto.TargetStatus != APPOINTMENT_STATUS_CONVERTED)
                {
                    return Result(0, $"{operationPrefix}失败：已转为订单的预约不允许修改状态", null);
                }
                #endregion

                #region 3. 更新预约状态及备注
                // 备份原状态（用于响应返回）
                var originalStatus = appointment.BookingStatus;
                var originalStatusName = GetAppointmentStatusName(originalStatus);
                var targetStatusName = GetAppointmentStatusName(dto.TargetStatus);

                // 更新状态
                appointment.BookingStatus = dto.TargetStatus;

                // 更新备注（追加修改记录，保留历史信息）
                var updateRemark = string.IsNullOrWhiteSpace(dto.UpdateRemark)
                    ? "无备注"
                    : dto.UpdateRemark.Trim();
                appointment.Remark = $"{appointment.Remark ?? ""} | {operationPrefix}：{originalStatusName}→{targetStatusName}（{DateTime.Now:yyyy-MM-dd HH:mm}），备注：{updateRemark}";

                // 保存到数据库
                _appointmentsIOC._appointments.Update(appointment);
                await _appointmentsIOC._appointments.SaveChangesAsync();
                #endregion

                #region 4. 组装响应数据
                var resultData = new Pc_UpdateAppointmentStatus_Response_Dto
                {
                    AppointmentId = appointment.AId,
                    OriginalStatusName = originalStatusName,
                    TargetStatusName = targetStatusName,
                    UpdateRemark = updateRemark
                };
                #endregion

                return Result(1, $"{operationPrefix}成功：预约【{appointment.AId}】状态已从【{originalStatusName}】修改为【{targetStatusName}】", resultData);
            }
            catch (DbUpdateException ex)
            {
                // 数据库操作异常（如并发冲突、字段约束）
                var errorMsg = $"{operationPrefix}数据库操作失败：{ex.InnerException?.Message ?? ex.Message}";
                Console.WriteLine($"{errorMsg} | 堆栈：{ex.StackTrace}");
                return Result(0, errorMsg, null);
            }
            catch (Exception ex)
            {
                // 未知异常
                var errorMsg = $"{operationPrefix}发生未知错误：{ex.Message}";
                Console.WriteLine($"{errorMsg} | 堆栈：{ex.StackTrace}");
                return Result(0, errorMsg, null);
            }
        }
    }
    
}
