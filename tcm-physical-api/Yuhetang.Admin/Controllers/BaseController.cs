using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Service.Interface;

namespace Yuhetang.Admin.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected readonly I_Logins_Service _login_Service;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="login_Service"></param>
        public BaseController(I_Logins_Service login_Service)
        {
            _login_Service = login_Service;

            //测试用，随机延迟1-5s 正式环境请注释此行代码
            //Thread.Sleep(Config.GetRandom(1000, 3000));
        }

        /// <summary>
        /// 获取当前登录对象
        /// </summary>
        /// <returns></returns>
        protected User_Response_Dto Get_Current_User()
        {
            var code = Response.HttpContext.User.Identity?.Name;

            return _login_Service.Check_Login(code, "");
        }
    }
}
