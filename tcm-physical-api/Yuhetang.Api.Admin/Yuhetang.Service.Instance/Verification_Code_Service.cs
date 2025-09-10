using Microsoft.Extensions.Caching.Memory;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.Instance
{
    [Inject_]
    public class Verification_Code_Service:Base_Service,I_Verification_Code_Service
    {
        private readonly I_Email_Service _emailService;
        private readonly IMemoryCache _memoryCache;
        private readonly Random _random = new();

        public Verification_Code_Service(I_Email_Service emailService, IMemoryCache memoryCache)
        {
            _emailService = emailService;
            _memoryCache = memoryCache;
        }

        public string GenerateVerificationCode(int length = 6)
        {
            const string chars = "0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[_random.Next(s.Length)]).ToArray());
        }

        public async Task<(bool success, string message)> SendVerificationCodeAsync(string email)
        {
            // 检查发送频率（防止频繁发送）
            if (_memoryCache.TryGetValue($"send_time_{email}", out DateTime lastSendTime))
            {
                if ((DateTime.Now - lastSendTime).TotalSeconds < 60)
                {
                    return (false, "请等待60秒后再发送验证码");
                }
            }

            var verificationCode = GenerateVerificationCode();
            var cacheKey = $"verification_code_{email}";

            // 存储验证码，有效期10分钟
            _memoryCache.Set(cacheKey, verificationCode, TimeSpan.FromMinutes(10));
            // 记录发送时间
            _memoryCache.Set($"send_time_{email}", DateTime.Now, TimeSpan.FromMinutes(1));

            // 发送邮件
            var result = await _emailService.SendVerificationCodeAsync(email, verificationCode);

            return result ?
                (true, "验证码发送成功") :
                (false, "验证码发送失败，请稍后重试");
        }

        public bool ValidateVerificationCode(string email, string code)
        {
            var cacheKey = $"verification_code_{email}";
            if (_memoryCache.TryGetValue(cacheKey, out string storedCode))
            {
                return string.Equals(storedCode, code, StringComparison.OrdinalIgnoreCase);
            }
            return false;
        }
    }
}
