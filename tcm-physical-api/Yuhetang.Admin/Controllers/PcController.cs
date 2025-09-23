using Microsoft.AspNetCore.Mvc;
using Yuhetang.Infrastructure.Dto.Request.Pc;
using Yuhetang.Service.Instance;
using Yuhetang.Service.Interface;

namespace Yuhetang.Admin.Controllers
{
    public class PcController : BaseController
    {
        private readonly I_Pc_Appointments_Service _pc_Appointments_Service;
        private readonly I_Pc_Customs_Service _pc_Customs_Service;

        public PcController(I_Logins_Service login_Service,I_Pc_Appointments_Service pc_Appointments_Service , I_Pc_Customs_Service pc_Customs_Service) : base(login_Service)
        {
            _pc_Appointments_Service = pc_Appointments_Service;
            _pc_Customs_Service = pc_Customs_Service;
        }

        /// <summary>
        /// 获取预约列表
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Pc_Appointments(int? page = 1, int? limit = 10, string? key = "")
        {
            var result = await _pc_Appointments_Service.Get_Appointment(new Pc_Appointment_Request_Dto()
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
        public async Task<IActionResult> Get_Pc_Customs(int? page = 1,int? limit = 10,string? key="")
        {
            var result = await _pc_Customs_Service.Get_Customs(new Pc_Customs_Request_Dto()
            {
                page = page ?? 1,
                limit = limit ?? 10,
                key = key ?? ""
            });
            return Ok(result);
        }
    }
}
