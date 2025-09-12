using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Response;

namespace Yuhetang.Service.Interface
{
    /// <summary>
    /// 预约管理
    /// </summary>
    [Provider_]
    public interface I_Appointments_Service
    {
        /// <summary>
        /// 获取预约管理表
        /// </summary>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Appointments(int page = 1 , int limit = 10, string? key="");
        /// <summary>
        /// 创建新预约
        /// </summary>
        /// <returns></returns>
        Task<Api_Response_Dto> Add_Appointments();

    }
}
