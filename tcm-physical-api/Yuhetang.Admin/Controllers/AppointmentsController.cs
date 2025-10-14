using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;
using Yuhetang.Infrastructure.Dto.Request;
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
        

    }
}
