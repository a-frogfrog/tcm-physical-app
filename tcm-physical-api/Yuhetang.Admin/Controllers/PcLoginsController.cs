using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Yuhetang.Infrastructure.Dto.Request;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.Tools;
using Yuhetang.Service.EFCore;
using Yuhetang.Service.Interface;

namespace Yuhetang.Admin.Controllers
{
    public class PcLoginsController : BaseController
    {
        private readonly IConfiguration _configuration;
        private readonly I_Logins_Service _logins_Service;

        public PcLoginsController(IConfiguration configuration, I_Logins_Service logins_Service) : base(logins_Service)
        {
            _logins_Service = logins_Service;
            _configuration = configuration;
        }
        /// <summary>
        /// 管理员登录(密码：123456)
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Logins(Login_Request_Dto dto)
        {


            dto.code = Config.GUID();
            var result = await _logins_Service.Logins(dto);

            if (result.code == Api_Code.ok)
            {
                //登录成功生成凭据
                var claims = new[]
                 {
                    new Claim(ClaimTypes.Name,  dto.code),//要保存的内容  code=随机码 这个码在登录时已经存到数据库中去了
                    new Claim(ClaimTypes.Actor,dto.account!.Trim()),//保存用户账号信息 这个账号信息就是在redis中能够获取数据的关键key
                    new Claim(ClaimTypes.Role,"admin")//role 角色设定 不是说写admin就有所有权限 
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
        /// 检查登录
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Roles = "admin")] //移动设备 pc 电脑端
        public IActionResult Check_Login()
        {

            var user = this.Get_Current_Admin();
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
