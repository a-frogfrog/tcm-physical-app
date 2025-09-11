using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Yuhetang.Infrastructure.Dto.Request;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.Tools;
using Yuhetang.Service.Interface;

namespace Yuhetang.Admin.Controllers
{

    public class MobileController : BaseController
    {
        private readonly IConfiguration _configuration;
        private readonly I_Mobile_Service _mobile_Service;

        public MobileController(IConfiguration configuration, I_Mobile_Service mobile_Service)
        {
            _mobile_Service = mobile_Service;
            _configuration = configuration;
        }
        /// <summary>
        /// 客户登录/注册(如果没有账号就直接注册新账号)
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Logins(Login_Request_Dto dto)
        {
            dto.code = Config.GUID();
            var result = await _mobile_Service.Logins(dto);

            if (result.code == Api_Code.ok)
            {
                //登录成功生成凭据
                var claims = new[]
                 {
                    new Claim(ClaimTypes.Name,  dto.code),//要保存的内容  code=随机码 这个码在登录时已经存到数据库中去了
                    new Claim(ClaimTypes.Actor,dto.account!.Trim()),//保存用户账号信息 这个账号信息就是在redis中能够获取数据的关键key
                    new Claim(ClaimTypes.Role,"mobile")//role 角色设定 不是说写admin就有所有权限 
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecurityKey"]));//密钥 最好采用无意义的随机码
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                string jwtKey = _configuration["JWT:issuer"];
                var token = new JwtSecurityToken(
                    issuer: jwtKey,
                    audience: jwtKey,
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(60 * 12), //token 过期时间
                    signingCredentials: creds);

                result.data = new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                };
            }
            return Ok(result);
        }

        /// <summary>
        /// 获取当前登录的客户
        /// </summary>
        /// <returns></returns>
        private User_Response_Dto? Get_Current_Mobile()
        {
            var code = Response.HttpContext.User.Identity?.Name;
            var actorClaim = Response.HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Actor);
            string account = actorClaim!.Value;
            var merchant = _mobile_Service.Check_Login(code, account!);
            if (merchant == null)
            {
                throw new Exception("登录已过期");
            }
            return merchant;
        }

        /// <summary>
        /// 检查登录
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Roles = "mobile")] //移动设备 pc 电脑端
        public IActionResult Check_Login()
        {

            var user = this.Get_Current_Mobile();
            if (user == null)
            {
                return Unauthorized();//返回401
            }

            return Ok(new Api_Response_Dto
            {
                code = 0,
                message = "ok",
                data = user
            });
        }
    }
}
