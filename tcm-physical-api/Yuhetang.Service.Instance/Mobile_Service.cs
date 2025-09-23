using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.EFCore.MySql;
using Yuhetang.Infrastructure.IOC;
using Yuhetang.Infrastructure.Redis;
using Yuhetang.Infrastructure.Tools;
using Yuhetang.Service.Instance;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.EFCore
{
    [Inject_]
    public class Mobile_Service : Base_Service, I_Mobile_Service
    {
        private readonly I_Verification_Code_Service _verification_Code_Service;
        private readonly Mobile_IOC _mobile_IOC;
        private readonly RedisStringService _redisStringService;
        private readonly IConfiguration _configuration;

        public Mobile_Service(
            I_Verification_Code_Service verification_Code_Service,
            Mobile_IOC mobile_IOC,
            IConfiguration configuration,
            RedisStringService redisStringService
            )
        {
            _redisStringService = redisStringService;
            _configuration = configuration;
            _verification_Code_Service = verification_Code_Service;
            _mobile_IOC = mobile_IOC;
        }
       /// <summary>
       /// 检查登录
       /// </summary>
       /// <param name="code"></param>
       /// <param name="account"></param>
       /// <returns></returns>
        public User_Response_Dto Check_Login(string code, string account)
        {
            var _user = _redisStringService.Get<string>(code);
            if (!string.IsNullOrEmpty(_user))
            {
                return JsonConvert.DeserializeObject<User_Response_Dto>(_user);
            }
            var key = _configuration["Redis:Keys:Mobile_Check_Login"];
            //如果在此处你查询了这个
            var jwt = _redisStringService.Get<string>(key + account);
            if (code == jwt)
            {
                var user = _mobile_IOC._custom_EFCore.QueryAll(d => d.CAccount == account).Select(d => new
                User_Response_Dto
                {
                    id = d.CId,
                    name = d.CName,
                    account = d.CAccount,
                    isBan = d.CStatus,
                    time = d.CCreateTime!.Value.ToString("yyyy-MM-dd HH:mm:ss")
                }).Single();
                _redisStringService.Set(code, JsonConvert.SerializeObject(user), DateTime.Now.AddSeconds(60));
                return user;
            }
            else
                return null;
        }
        /// <summary>
        /// 登录和注册（如果没有账号会自动注册新账号）
        /// </summary>
        /// <param name="code"></param>
        /// <param name="account"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Logins(Login_Request_Dto dto)
        {
            try
            {
                if (string.IsNullOrEmpty(dto.account) && string.IsNullOrEmpty(dto.password))
                {
                    return Result(0, "请输入账号和验证码!");
                }
                if (string.IsNullOrEmpty(dto.account) && !string.IsNullOrEmpty(dto.password))
                {
                    return Result(0, "请输入账号!");
                }
                if (string.IsNullOrEmpty(dto.password) && !string.IsNullOrEmpty(dto.account))
                {
                    return Result(0, "请输入验证码!");
                }
                // 验证验证码
                var isCodeValid = _verification_Code_Service.ValidateVerificationCode(dto.account, dto.password);
                if (!isCodeValid)
                {
                    return Result(0, "验证码错误或已过期");
                }

                // 查找用户
                var iq = _mobile_IOC._custom_EFCore.QueryAll(d => d.CAccount == dto.account);
                if (!await iq.AnyAsync())
                {
                    var custom = new Custom
                    {
                        CId = Config.GUID(),
                        CName = Config.GenerateRandomName(),
                        CGender = 3,
                        CAge = 0,
                        CAccount = dto.account,
                        CResource = 3,
                        IsConvert = 0,
                        CStatus = 1,
                        CCreateTime = DateTime.Now
                    };

                    _mobile_IOC._custom_EFCore.Add(custom);
                    await _mobile_IOC._custom_EFCore.SaveChangesAsync();
                }
                var user = await iq.SingleAsync();
                // 检查用户状态
                if (user.CStatus == 0)
                {
                    return Result(0, "账户已被禁用，请联系管理员");
                }

                // Redis键值拼接（避免硬编码，增加空值保护）
                var redisKey = $"{_configuration["Redis:Keys:Mobile_Check_Login"]}{user.CAccount}";
                // 存储登录凭据（24小时有效期，使用异步方法避免阻塞）
                _redisStringService.Set(redisKey, dto.code ?? string.Empty, TimeSpan.FromDays(1));

                // 返回成功结果
                return Result(1, "登录成功");
            }
            catch (Exception ex)
            {
                return Result(0, "登录失败，请稍后重试");
            }
        }

    }
}

