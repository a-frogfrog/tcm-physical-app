using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request.Pc;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.Dto.Response.Pc;

namespace Yuhetang.Service.Interface
{
    [Provider_]
    /// <summary>
    /// Pc端预约管理
    /// </summary>
    public interface I_Pc_Appointments_Service
    {
        /// <summary>
        /// 新增预约
        /// </summary>
        /// <param name="requestDto">预约请求数据</param>
        /// <returns>新增的预约信息</returns>
        Task<Pc_Appointments_Response> AddAppointmentAsync(Pc_Appointment_Request_Dto dto);
    }
}
