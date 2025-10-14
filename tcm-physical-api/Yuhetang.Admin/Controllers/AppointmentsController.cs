using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;
using Yuhetang.Infrastructure.Dto.Request;
using Yuhetang.Service.Instance;
using Yuhetang.Service.Interface;

namespace Yuhetang.Admin.Controllers
{
    /// <summary>
    /// 预约管理
    /// </summary>
    public class AppointmentsController : BaseController
    {
        private readonly I_Appointments_Service _appointments_Service;

        public AppointmentsController(I_Appointments_Service appointments_Service,I_Logins_Service logins_Service):base(logins_Service)
        {
            _appointments_Service = appointments_Service;
        }

        /// <summary>
        /// 获取预约日期
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetAvailableDates()
        {
            var result = _appointments_Service.GetAvailableDates();

            return Ok(result);
        }

        /// <summary>
        /// 获取某天可预约时间
        /// </summary>
        /// <param name="data"></param>
        /// <param name="min"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAvailableSlots(string data, double min)
        {
            var result = await _appointments_Service.GetAvailableSlots(data, min);

            return Ok(result);
        }

        /// <summary>
        /// 新增预约
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add_Appointment(Appointments_Request_Dto dto)
        {
            var user = this.Get_Current_Customer();
            dto.CustomerId = user.id;
            var result = await _appointments_Service.Add_Appointment(dto);

            return Ok(result);
        }

        /// <summary>
        /// 获取我的预约
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_My_Appointment(int page = 1,int limit = 10)
        {
            var user = this.Get_Current_Customer();
            var result = await _appointments_Service.Get_My_Appointment(page,limit,user.id);

            return Ok(result);
        }
        /// <summary>
        /// 获取全部预约(admin)
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Appointment(int page = 1, int limit = 10)
        {
            var result = await _appointments_Service.Get_Appointment(page, limit);

            return Ok(result);
        }
        /// <summary>
        /// 更新预约(admin)
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Upd_Appointment(Appointments_Request_Dto dto)
        {
            var result = await _appointments_Service.Upd_Appointment(dto);

            return Ok(result);
        }
        /// <summary>
        /// 取消预约
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Cancel_Appointment(string id)
        {
            var result = await _appointments_Service.Cancel_Appointment(id);

            return Ok(result);
        }

        /// <summary>
        /// 获取预约详情
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Appointment_Details(string id)
        {
            var result = await _appointments_Service.Get_Appointment_Details(id);

            return Ok(result);
        }

        /// <summary>
        /// 获取预约订单总数量
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_My_Appointment_Order_Count()
        {
            var user = this.Get_Current_Customer();
            var result = await _appointments_Service.Get_My_Appointment_Order_Count(user.id);

            return Ok(result);
        }
    }
}
