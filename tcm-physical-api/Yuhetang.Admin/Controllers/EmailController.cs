using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Yuhetang.Infrastructure.Dto.Request;
using Yuhetang.Service.Interface;

namespace Yuhetang.Admin.Controllers
{
    /// <summary>
    /// 邮箱验证
    /// </summary>
    public class EmailController : BaseController
    {
        private readonly I_Verification_Code_Service _verificationCodeService;

        public EmailController(I_Verification_Code_Service verificationCodeService)
        {
            _verificationCodeService = verificationCodeService;
        }
        /// <summary>
        /// 发送验证码
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> SendVerificationCode([FromBody] Send_Verification_Code_Request request)
        {
            if (string.IsNullOrEmpty(request.Email))
            {
                return BadRequest("邮箱地址不能为空");
            }

            var result = await _verificationCodeService.SendVerificationCodeAsync(request.Email);

            return result.success ?
                Ok(new { message = result.message }) :
                BadRequest(new { message = result.message });
        }
        /// <summary>
        /// 验证验证码
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult VerifyCode([FromBody] Verify_Code_Request request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Code))
            {
                return BadRequest("邮箱和验证码不能为空");
            }

            var isValid = _verificationCodeService.ValidateVerificationCode(request.Email, request.Code);

            return isValid ?
                Ok(new { message = "验证码正确" }) :
                BadRequest(new { message = "验证码错误或已过期" });
        }
    }
}
