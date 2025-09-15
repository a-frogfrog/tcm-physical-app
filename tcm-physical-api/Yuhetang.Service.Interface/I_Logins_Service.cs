using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request;
using Yuhetang.Infrastructure.Dto.Response;

namespace Yuhetang.Service.Interface
{
    [Provider_]
    public interface I_Logins_Service
    {
        /// <summary>
        /// 员工登录
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Logins(Login_Request_Dto dto);

        /// <summary>
        /// 检查登录
        /// </summary>
        /// <param name="code"></param>
        /// <param name="account">账号</param>
        /// <returns></returns>
        User_Response_Dto Check_Login(string code, string account);
    }
}
