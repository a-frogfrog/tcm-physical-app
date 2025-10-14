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
using ServiceStack;

namespace Yuhetang.Service.EFCore
{
    [Inject_]
    public class Logins_Service : Base_Service, I_Logins_Service
    {
        private readonly Sys_IOC _sys_IOC;
        private readonly IConfiguration _configuration;
        private readonly RedisHashService _redisHashService;
        private readonly RedisStringService _redisStringService;
        private readonly I_Verification_Code_Service _verification_Code_Service;
        private readonly Promotion_IOC _promotion_IOC;

        public Logins_Service(
            Sys_IOC sys_IOC,
            Promotion_IOC promotion_IOC,
            IConfiguration configuration, 
            RedisHashService redisHashService,
            RedisStringService redisStringService,
            I_Verification_Code_Service verification_Code_Service
            )
        {
            _sys_IOC = sys_IOC;
            _configuration = configuration;
            _redisHashService = redisHashService;
            _redisStringService = redisStringService;
            _verification_Code_Service = verification_Code_Service;
            _promotion_IOC = promotion_IOC;
        }
        /// <summary>
        /// 检查登录（后台的）
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
        /// 登录(后台的)
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


        /// <summary>
        /// 检查登录
        /// </summary>
        /// <param name="code"></param>
        /// <param name="account"></param>
        /// <returns></returns>
        public User_Response_Dto Customer_Check_Login(string code, string account)
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
                var user = _sys_IOC._custom_EFCore.QueryAll(d => d.CEmail == account).Select(d => new
                User_Response_Dto
                {
                    id = d.CId,
                    name = d.CName,
                    account = d.CEmail,
                    time = d.CCreateTime!.Value.ToString("yyyy-MM-dd HH:mm:ss")
                }).Single();
                _redisStringService.Set(code, JsonConvert.SerializeObject(user), DateTime.Now.AddSeconds(60));
                return user;
            }
            else
                return null;
        }
        /// <summary>
        /// 登录（如果没有账号会自动注册新账号）
        /// </summary>
        /// <param name="code"></param>
        /// <param name="account"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Customer_Logins(Login_Request_Dto dto)
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
                var iq = _sys_IOC._custom_EFCore.QueryAll(d => d.CEmail == dto.account);
                var NewVIPID = Config.GUID2();
                if (!await iq.AnyAsync())
                {
                    Custom custom = new Custom();
                    //判断是否是推广人邀请的
                    if (!string.IsNullOrEmpty(dto.VIPID) && !string.IsNullOrEmpty(dto.VIPCode))
                    {

                        custom = new Custom
                        {
                            CId = NewVIPID,
                            CUserName = Config.GenerateRandomName(),
                            CAge = 0,
                            CEmail = dto.account,
                            CStatus = 1,
                            CResource = 3,
                            IsConvert = 0,
                            CvcVipid = dto.VIPID,
                            CvcCode = dto.VIPCode,
                            CCreateTime = DateTime.Now
                        };
                        _sys_IOC._custom_EFCore.Add(custom);
                        await _sys_IOC._custom_EFCore.SaveChangesAsync();
                        //佣金记录
                        CustomerVipCpsCommission customerVipCpsCommission = new CustomerVipCpsCommission()
                        {
                            CvccId = Config.GUID2(),
                            CvccVipid = dto.VIPID,
                            CvccNewVipid = NewVIPID,
                            CvccAmount = 10,
                            CvccStatus = 1,
                            CvccSettleTime = DateTime.Now,
                            CvccCreateTime = DateTime.Now
                        };

                        _promotion_IOC._customerVipCpsCommission_EFCore.Add(customerVipCpsCommission);
                        await _promotion_IOC._customerVipCpsCommission_EFCore.SaveChangesAsync();
                        //初始化钱包
                        CustomsVip customsVip = new CustomsVip()
                        {
                            CvId = Config.GUID2(),
                            CvCustomerId = NewVIPID,
                            CvLevel = 0,
                            CvBalance = 0,
                            CvTotalConsume = 0,
                            CvTotalRecharge = 0,
                            CvStatus = 1,
                            CvCreateTime = DateTime.Now
                        };
                        _promotion_IOC._customsVip_EFCore.Add(customsVip);
                        await _promotion_IOC._customsVip_EFCore.SaveChangesAsync();
                        //推广人余额追加佣金
                        var balance = await _promotion_IOC._customsVip_EFCore.QueryAll(d => d.CvCustomerId == dto.VIPID).SingleOrDefaultAsync();
                        balance!.CvBalance += 10;

                        _promotion_IOC._customsVip_EFCore.Update(balance);
                        await _promotion_IOC._customsVip_EFCore.SaveChangesAsync();
                    }
                    else
                    {
                        custom = new Custom
                        {
                            CId = Config.GUID2(),
                            CUserName = Config.GenerateRandomName(),
                            CGender = 3,
                            CAge = 0,
                            CEmail = dto.account,
                            CResource = 3,
                            IsConvert = 0,
                            CCreateTime = DateTime.Now
                        };
                        _sys_IOC._custom_EFCore.Add(custom);
                        await _sys_IOC._custom_EFCore.SaveChangesAsync();
                    }

                }
                //登录日志

                var user = await iq.SingleOrDefaultAsync();
                if (user.CStatus == 0)
                {
                    return Result(0, "账号已禁用");
                }
                var loginLog = new SysLoginLog
                {
                    Llid = Config.GUID(),
                    LlcreateTime = DateTime.Now,
                    LlEid = user?.CId ?? string.Empty, // 账号不存在时用空字符串
                    LlEname = user?.CUserName ?? "未知账号",
                    Llbrowser = Config.GetBrowserInfo(),
                    Llcode = dto.code ?? "无凭据",
                    LlloginResult = 1,
                    LlfailureReason = "",
                    LldeviceType = Config.GetLoginType(),
                    Lllocation = Config.GetLoginLocation(),
                    LlloginIp = Config.GetIp() ?? "未知IP"
                };


                _sys_IOC._sys_Login_Logs_EFCore.Add(loginLog);
                await _sys_IOC._sys_Login_Logs_EFCore.SaveChangesAsync();

                // Redis键值拼接（避免硬编码，增加空值保护）
                var redisKey = $"{_configuration["Redis:Keys:Mobile_Check_Login"]}{user.CEmail}";
                // 存储登录凭据（24小时有效期，使用异步方法避免阻塞）
                _redisStringService.Set(redisKey, dto.code ?? string.Empty, TimeSpan.FromDays(1));
                // 返回成功结果
                return Result(1, "登录成功");
            }

            catch (Exception)
            {

                return Result(0, "稍后再试");
            }

        }
    }
}
