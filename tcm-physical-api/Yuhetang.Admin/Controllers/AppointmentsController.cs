using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;
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
        /// 获取预约列表
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Appointments(int page = 1, int limit = 10, string? key = "")
        {
            var result = await _appointments_Service.Get_Appointments( 
                page,
                limit,
                key = key ?? ""
            );
            return Ok(result);
        }

    }
}
