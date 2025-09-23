using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request.Pc;
using Yuhetang.Infrastructure.Dto.Response;

namespace Yuhetang.Service.Interface
{
    [Provider_]
    /// <summary>
    /// Pc端预约管理
    /// </summary>
    public interface I_Pc_Appointments_Service
    {
        /// <summary>
        /// 获取所有预约
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Appointment(Pc_Appointment_Request_Dto dto);
    }
}
