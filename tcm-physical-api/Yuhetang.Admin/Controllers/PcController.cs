using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI.Common;
using Yuhetang.Infrastructure.Dto.Request.Pc;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.Dto.Response.Pc;
using Yuhetang.Service.Instance;
using Yuhetang.Service.Interface;

namespace Yuhetang.Admin.Controllers
{
    public class PcController : BaseController
    {
        private readonly I_Pc_Appointments_Service _pc_Appointments_Service;
        private readonly I_Pc_Customs_Service _pc_Customs_Service;
        private readonly I_Pc_Order_Service _pc_Order_Service;

        public PcController(I_Logins_Service login_Service, I_Pc_Appointments_Service pc_Appointments_Service, I_Pc_Customs_Service pc_Customs_Service, I_Pc_Order_Service pc_Order_Service) : base(login_Service)
        {
            _pc_Appointments_Service = pc_Appointments_Service;
            _pc_Customs_Service = pc_Customs_Service;
            _pc_Order_Service = pc_Order_Service;
        }

        /// <summary>
        /// 获取预约列表
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Appointments(int? page = 1, int? limit = 10, string? key = "")
        {
            var result = await _pc_Appointments_Service.Get_Appointments(new Pc_Appointment_Request_Dto
            {
                page = page ?? 1,
                limit = limit ?? 10,
                key = key ?? ""
            });
            return Ok(result);
        }

        /// <summary>
        /// 获取所有客户
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Pc_Customs(int? page = 1, int? limit = 10, string? key = "")
        {
            var result = await _pc_Customs_Service.Get_Customs(new Pc_Customs_Request_Dto()
            {
                page = page ?? 1,
                limit = limit ?? 10,
                key = key ?? ""
            });
            return Ok(result);
        }

        /// <summary>
        /// 新增预约
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> AddAppointmentAsync(Pc_Appointment_Request_Dto dto)
        {
            var result = await _pc_Appointments_Service.AddAppointmentAsync(dto);
            return Ok(result);
        }

        /// <summary>
        /// 获取所有房间
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Rooms(int? page = 1, int? limit = 10, string? key = "")
        {
            var result = await _pc_Appointments_Service.Get_Rooms(new Pc_Rooms_Request_Dto()
            {
                page = page ?? 1,
                limit = limit ?? 10,
                key = key ?? ""
            });
            return Ok(result);
        }

        /// <summary>
        /// 获取所有员工
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Employees(int? page = 1, int? limit = 10, string? key = "")
        {
            var result = await _pc_Appointments_Service.Get_employees(new Pc_Employees_Request_Dto()
            {
                page = page ?? 1,
                limit = limit ?? 10,
                key = key ?? ""
            });
            return Ok(result);
        }
        /// <summary>
        /// 获取所有产品
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Product(int? page = 1, int? limit = 10, string? key = "")
        {
            var result = await _pc_Order_Service.Get_product(new Pc_Product_Request_Dto()
            {
                page = page ?? 1,
                limit = limit ?? 10,
                key = key ?? ""
            });
            return Ok(result);
        }

        /// <summary>
        /// 获取所有套餐
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Productpackage(int? page = 1, int? limit = 10, string? key = "")
        {
            var result = await _pc_Appointments_Service.Get_productpackage(new Pc_Product_package_Request_Dto()
            {
                page = page ?? 1,
                limit = limit ?? 10,
                key = key ?? ""
            });
            return Ok(result);
        }

        /// <summary>
        /// 新增客户
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add_Customs(Pc_Customs_Request_Dto dto)
        {
            var result = await _pc_Customs_Service.Add_Customs(dto);
            return Ok(result);
        }

        /// <summary>
        /// 新增订单
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> AddOrderAsync(Pc_Order_Request_Dto dto)
        {
            var result = await _pc_Order_Service.AddOrderAsync(dto);
            return Ok(result);
        }
    
        /// <summary>
        /// 获取订单列表
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Orders(int? page = 1, int? limit = 10, string? key = "")
        {
            var result = await _pc_Order_Service.Get_Orders(new Pc_Order_Request_Dto
            {
                page = page ?? 1,
                limit = limit ?? 10,
                key = key ?? ""
            });
            return Ok(result);
        }

        /// <summary>
        /// 获取服务列表
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Services(int? page = 1, int? limit = 10, string? key = "")
        {
            var result = await _pc_Appointments_Service.Get_services(new Pc_Service_Request_Dto
            {
                page = page ?? 1,
                limit = limit ?? 10,
                key = key ?? ""
            });
            return Ok(result);
        }

        /// <summary>
        /// 按房间ID查询关联的订单详情
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetOrderByRoomId(long roomId)
        {
            try
            {
                // 调用服务层按房间ID查询订单
                var orderDetail = await _pc_Order_Service.GetOrderByRoomIdAsync(roomId);

                if (orderDetail == null)
                {
                    return Ok(new
                    {
                        Success = false,
                        Message = "该房间无关联订单或订单已失效",
                        Data = (Pc_Order_Response_Dto)null
                    });
                }

                return Ok(new
                {
                    Success = true,
                    Message = "查询成功",
                    Data = orderDetail
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Success = false,
                    Message = $"查询订单失败：{ex.Message}"
                });
            }
        }

        /// <summary>
        /// 订单支付接口
        /// </summary>
        /// <param name="dto">支付请求参数（订单ID、支付方式、支付金额等）</param>
        /// <returns>支付结果（支付记录ID、订单状态、支付信息等）</returns>
        /// <remarks>
        /// 支付方式枚举：1-现金，2-微信，3-支付宝<br/>
        /// 仅支持“待支付”状态（OStatus=0）的订单进行支付
        /// </remarks>
        [HttpPost]
        public async Task<IActionResult> PayOrder([FromBody] Pc_Order_payment_Request_Dto dto)
        {
            try
            {
                #region 1. 参数验证
                if (!ModelState.IsValid)
                {
                    var errorMsg = string.Join("；", ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage));
                    return BadRequest(new { code = 0, msg = $"参数错误：{errorMsg}" });
                }
                #endregion

                #region 2. 调用支付服务
                var paymentResult = await _pc_Order_Service.PayOrderAsync(dto);
                #endregion

                #region 3. 返回成功结果
                return Ok(new
                {
                    code = 1,
                    msg = "支付成功",
                    data = paymentResult
                });
                #endregion
            }
            catch (ArgumentException ex)
            {
                // 参数错误
                return BadRequest(new { code = 0, msg = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                // 业务逻辑错误
                return BadRequest(new { code = 0, msg = ex.Message });
            }
            catch (Exception)
            {
                // 未知错误
                return StatusCode(500, new { code = 0, msg = "支付失败，请联系管理员" });
            }
        }

        /// <summary>
        /// 清除房间关联的订单并恢复房间空闲状态
        /// </summary>
        /// <param name="roomId">房间ID</param>
        /// <returns>操作结果</returns>
        /// <response code="200">操作成功（包含业务成功/失败状态）</response>
        /// <response code="400">请求参数错误</response>
        /// <response code="500">服务器内部错误</response>
        [HttpGet]
        public async Task<IActionResult> ClearRoomOrderAsync(long roomId)
        {
            var result = await _pc_Order_Service.ClearRoomOrderAsync(roomId);
            return Ok(result);
        }

        /// <summary>
        /// 预约转订单接口（与现有订单接口风格一致）
        /// </summary>
        /// <param name="dto">预约转订单请求参数</param>
        /// <returns>转单结果（包含预约+订单信息）</returns>
        [HttpPost]
        public async Task<IActionResult> ConvertAppointmentToOrder([FromBody] Pc_AppointmentToOrder_Request_Dto dto)
        {
            try
            {
                // 参数校验（使用ModelState，与PayOrder接口风格一致）
                if (!ModelState.IsValid)
                {
                    var errorMsg = string.Join("；", ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage));
                    return Ok(new { code = 0, message = $"参数错误：{errorMsg}", data = (object)null });
                }

                // 调用服务层转单方法
                var result = await _pc_Appointments_Service.ConvertAppointmentToOrderAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(new { code = 0, message = $"预约转订单失败：{ex.Message}", data = (object)null });
            }
        }

        /// <summary>
        /// 修改预约状态
        /// </summary>
        /// <param name="dto">状态修改请求参数</param>
        /// <returns>包含修改结果的API响应</returns>
        [HttpPost]
        public async Task<Api_Response_Dto> UpdateAppointmentStatus([FromBody] Pc_UpdateAppointmentStatus_Request_Dto dto)
        {
            try
            {
                // 参数验证（模型验证）
                if (!ModelState.IsValid)
                {
                    var errorMsg = string.Join("；", ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage));
                    return new Api_Response_Dto { code = 0, message = $"参数验证失败：{errorMsg}", data = null };
                }

                // 调用服务层方法处理业务逻辑
                return await _pc_Appointments_Service.UpdateAppointmentStatusAsync(dto);
            }
            catch (InvalidOperationException ex)
            {
                // 捕获业务逻辑异常
                return new Api_Response_Dto { code = 0, message = ex.Message, data = null };
            }
            catch (Exception ex)
            {
                // 捕获未处理的异常
                return new Api_Response_Dto { code = 0, message = $"系统异常：{ex.Message}", data = null };
            }
        }
    }
}
