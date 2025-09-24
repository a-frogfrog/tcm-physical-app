using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request;
using Yuhetang.Infrastructure.Dto.Request.Pc;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.Dto.Response.Pc;

namespace Yuhetang.Service.Interface
{
    /// <summary>
    /// 预约管理
    /// </summary>
    [Provider_]
    public interface I_Appointments_Service
    {
        /// <summary>
        /// 新增预约
        /// </summary>
        /// <param name="requestDto">预约请求数据</param>
        /// <returns>新增的预约信息</returns>
        Task<Api_Response_Dto> Add_Appointment(Appointments_Request_Dto dto);
    }
}
