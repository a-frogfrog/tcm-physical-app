using Yuhetang.Service.Instance;
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
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.EFCore
{
    [Inject_]
    public class Logins_Service : Base_Service, I_Logins_Service
    {
        private readonly Sys_IOC _sys_IOC;
        private readonly IConfiguration _configuration;
        private readonly RedisHashService _redisHashService;
        private readonly RedisStringService _redisStringService;

        public Logins_Service(
            Sys_IOC sys_IOC, 
            IConfiguration configuration, 
            RedisHashService redisHashService,
            RedisStringService redisStringService
            )
        {
            _sys_IOC = sys_IOC;
            _configuration = configuration;
            _redisHashService = redisHashService;
            _redisStringService = redisStringService;
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


            var key = _configuration["Redis:Keys:Admin_Check_Login"];
            //如果在此处你查询了这个
            var jwt = _redisStringService.Get<string>(key + account);
            if (code == jwt)
            {
                var user = _sys_IOC._sys_Employees_EFCore.QueryAll(d => d.EAccount == account).Select(d => new
                User_Response_Dto
                {
                    id = d.EId,
                    name = d.EName,
                    account = d.EAccount,
                    gender = d.EGender,
                    isBan = d.EIsBan,
                    time = d.ECreateTime!.Value.ToString("yyyy-MM-dd HH:mm:ss")
                }).Single();
                _redisStringService.Set(code, JsonConvert.SerializeObject(user), DateTime.Now.AddSeconds(60));
                return user;
            }
            else
                return null;

        }
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <summary>
        public async Task<Api_Response_Dto> Logins(Login_Request_Dto dto)
        {
            // 1. 基础参数校验（避免空引用，提前拦截无效请求）
            if (string.IsNullOrWhiteSpace(dto.account) || string.IsNullOrWhiteSpace(dto.password))
            {
                // 记录无效请求日志（账号/密码为空）
                AddLoginLog(null, dto.code, "账号或密码不能为空", 0);
                return Result(0, "账号或密码不能为空");
            }

            // 2. 查询管理员信息（异步查询，避免同步阻塞）
            var adminQuery = _sys_IOC._sys_Employees_EFCore.QueryAll(d => d.EAccount == dto.account);
            var user = await adminQuery.SingleOrDefaultAsync();

            // 3. 账号不存在校验
            if (user == null)
            {
                AddLoginLog(null, dto.code, "账号或密码错误", 0);
                return Result(0, "账号或密码错误");
            }

            // 4. 密码正确性校验（统一使用异步日志记录）
            var pwd = EncryptUtil.LoginMd5(dto.password, user.ESalt ?? string.Empty);
            if (user.EPassword != pwd)
            {
                AddLoginLog(user, dto.code, "账号或密码错误", 0);
                return Result(0, "账号或密码错误");
            }

            // 5. 账号禁用校验
            if (user.EIsBan == 1)
            {
                AddLoginLog(user, dto.code, "账号已禁用", 0);
                return Result(0, "账号已禁用");
            }

            // 6. 登录成功：记录成功日志 + 存储Redis登录凭据
            AddLoginLog(user, dto.code, "登录成功", 1);

            // Redis键值拼接（避免硬编码，增加空值保护）
            var redisKey = $"{_configuration["Redis:Keys:Admin_Check_Login"]}{user.EAccount}";
            // 存储登录凭据（24小时有效期，使用异步方法避免阻塞）
            _redisStringService.Set(redisKey, dto.code ?? string.Empty, TimeSpan.FromDays(1));

            // 7. 返回成功结果
            return Result(1, "登录成功");
        }

        /// 异步添加登录日志
        /// </summary>
        /// <param name="user">管理员信息（登录成功时为非空，失败时可为空）</param>
        /// <param name="loginCode">登录凭据</param>
        /// <param name="failureReason">失败原因（成功时传"登录成功"）</param>
        /// <param name="loginResult">登录结果：1=成功，0=失败</param>
        private int AddLoginLog(SysEmployee? user, string? loginCode, string failureReason, int loginResult)
        {
            var loginLog = new SysLoginLog
            {
                Llid = Config.GUID(),
                LlcreateTime = DateTime.Now,
                LlEid = user?.EId ?? string.Empty, // 账号不存在时用空字符串
                LlEname = user?.EName ?? "未知账号", 
                Llbrowser = Config.GetBrowserInfo(),
                Llcode = loginCode ?? "无凭据", 
                LlloginResult = loginResult,
                LlfailureReason = failureReason,
                LldeviceType = Config.GetLoginType(),
                Lllocation = Config.GetLoginLocation(),
                LlloginIp = Config.GetIp() ?? "未知IP"
            };

 
            _sys_IOC._sys_Login_Logs_EFCore.Add(loginLog);
            return _sys_IOC._sys_Login_Logs_EFCore.SaveChanges();
        }


    }
}
