using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Service.EFCore;
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
        /// <summary>
        /// 获取当前登录
        /// </summary>
        /// <returns></returns>
        protected User_Response_Dto? Get_Current_Admin()
        {
            var code = Response.HttpContext.User.Identity?.Name;
            var actorClaim = Response.HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Actor);
            string account = actorClaim!.Value;
            var merchant = _login_Service.Check_Login(code, account!);
            if (merchant == null)
            {
                throw new Exception("登录已过期");
            }
            return merchant;
        }

        protected User_Response_Dto? Get_Current_Customer()
        {
            var code = Response.HttpContext.User.Identity?.Name;
            var actorClaim = Response.HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Actor);
            string account = actorClaim!.Value;
            var merchant = _login_Service.Customer_Check_Login(code, account!);
            if (merchant == null)
            {
                throw new Exception("登录已过期");
            }
            return merchant;
        }
    }
}
