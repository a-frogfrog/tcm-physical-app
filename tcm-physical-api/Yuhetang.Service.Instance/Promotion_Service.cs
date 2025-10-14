using Microsoft.EntityFrameworkCore;
using QRCoder;
using System.Security.Cryptography;
using System.Text;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.EFCore.MySql;
using Yuhetang.Infrastructure.IOC;
using Yuhetang.Infrastructure.Tools;
using Yuhetang.Service.EFCore;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.Instance
{
    [Inject_]
    public class Promotion_Service : Base_Service, I_Promotion_Service
    {
        private readonly Promotion_IOC _promotion_IOC;

        public Promotion_Service(Promotion_IOC promotion_IOC)
        {
            _promotion_IOC = promotion_IOC;
        }


        /// <summary>
        /// 生成链接
        /// </summary>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Generate_Link(string id)
        {
            // 1. 生成推广记录
            CustomsVipCp customsVipCp = new CustomsVipCp()
            {
                CvcId = Config.GUID2(),
                CvcVipid = id,
                CvcCode = Config.GenerateCode(),
                CvcStatus = 1,
                CvcCreateTime = DateTime.Now
            };

            // 2. 生成长链接，例如带推广码参数
            string baseDomain = "http://8.134.187.124:8081/home";
            customsVipCp.CvcLongUrl = $"{baseDomain}?user={id}&code={customsVipCp.CvcCode}";

            // 3. 生成短链接（这里演示一个简单的Base62生成，实际可以调用第三方接口）
            customsVipCp.CvcShortUrl = GenerateShortUrl(customsVipCp.CvcLongUrl);

            // 4. 保存到数据库（假设你用 EF Core）
            _promotion_IOC._customerVipCps_EFCore.Add(customsVipCp);
            await _promotion_IOC._customerVipCps_EFCore.SaveChangesAsync();

            // 5. 返回结果
            return Result(1, "ok", customsVipCp);
        }
        /// <summary>
        /// 生成二维码
        /// </summary>
        /// <param name="longUrl"></param>
        /// <returns></returns>
        public async Task<string> Generate_QRCode(string longUrl)
        {
            using var qrGenerator = new QRCodeGenerator();
            using var qrCodeData = qrGenerator.CreateQrCode(longUrl, QRCodeGenerator.ECCLevel.Q);
            var qrCode = new BitmapByteQRCode(qrCodeData);
            var qrBytes = qrCode.GetGraphic(20);

            var base64 = Convert.ToBase64String(qrBytes);
            return $"data:image/png;base64,{base64}";
        }
        /// <summary>
        /// 佣金明细
        /// </summary>
        /// <param name="vipId"></param>
        /// <param name="status"></param>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Get_Commission_List(string vipId, int status = -1, int page = 1, int limit = 10)
        {
            var query = _promotion_IOC._customerVipCpsCommission_EFCore.QueryAll(out int total,page,limit,false,o=>o.CvccCreateTime, d => d.CvccCpsid == vipId);

            if (status >= 0)
                query = query.Where(d => d.CvccStatus == status);

            var data = await query.ToListAsync();

            return Result(1, "ok", new
            {
                total,
                records = data
            });
        }

        /// <summary>
        /// 获取推广链接列表
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Get_CustomsVipCps(int page = 1, int limit = 10)
        {
            var iq = _promotion_IOC._customerVipCps_EFCore.QueryAll(out int total,page,limit,false,o=>o.CvcCreateTime);
            if(!await iq.AnyAsync())
            {
                return Result(1, "没有链接");
            }
            var data = await iq.ToListAsync();
            return Result(1, "ok", new
            {
                total,
                data
            });
        }
        /// <summary>
        /// 推广数据统计
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Promotion_Data_Statistics(string vipId)
        {
            var startOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);

            // 1. 全部推广流水（累计）
            var promotionRecords = await _promotion_IOC._customerVipRecord_EFCore
                .QueryAll(d => d.CvrVipid == vipId && d.CvrType == 1)
                .ToListAsync();

            // 2. 本月推广流水
            var promotionRecordsThisMonth = promotionRecords
                .Where(d => d.CvrCreateTime >= startOfMonth)
                .ToList();

            // 3. 累计推广人数
            var totalPromotedUsers = await _promotion_IOC._custom_EFCore
                .QueryAll(d => d.CvcVipid == vipId)
                .CountAsync();

            // 4. 本月推广人数
            var promotedUsersThisMonth = await _promotion_IOC._custom_EFCore
                .QueryAll(d => d.CvcVipid == vipId && d.CCreateTime >= startOfMonth)
                .CountAsync();

            // 5. 累计奖金 & 提现金额
            decimal jackpot = promotionRecords.Sum(d => d.CvrAmount);
            decimal withdrawalAmount = promotionRecords
                .Where(d => d.CvrSatus == 1) // 已结算/可提现
                .Sum(d => d.CvrAmount);

            // 6. 结果组装
            var data = new Promotion_Data_Statistics_Response_Dto
            {
                total_number_of_people = totalPromotedUsers,
                jackpot = jackpot,
                withdrawal_amount = withdrawalAmount,
                promotionedCount = promotedUsersThisMonth
            };

            return Result(1, "ok", data);
        }


        /// <summary>
        /// 简单生成短链接（Base62哈希）
        /// 实际项目中可替换为调用第三方短链服务
        /// </summary>
        private string GenerateShortUrl(string longUrl)
        {
            // 用哈希取固定长度
            using var md5 = MD5.Create();
            var hashBytes = md5.ComputeHash(Encoding.UTF8.GetBytes(longUrl));
            var hashNum = BitConverter.ToUInt32(hashBytes, 0);

            const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var sb = new StringBuilder();

            for (int i = 0; i < 6; i++)
            {
                sb.Append(chars[(int)(hashNum % (uint)chars.Length)]);
                hashNum /= (uint)chars.Length;
            }

            return $"http://8.134.187.124:8081/home/{sb}";
        }



        /// <summary>
        /// 获取余额
        /// </summary>
        /// <param name="vipId"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Get_Balance(string vipId)
        {
            var data = await _promotion_IOC._customsVip_EFCore
                .QueryAll(d => d.CvCustomerId == vipId)
                .SingleOrDefaultAsync();

            return Result(1, "ok", new
            {
                balance = data.CvBalance
            });
        }

        /// <summary>
        /// 申请提现
        /// </summary>
        /// <param name="vipId"></param>
        /// <param name="amount"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Withdraw(string vipId, decimal amount)
        {
            // 1. 校验余额
            var balance = await _promotion_IOC._customsVip_EFCore
                .QueryAll(d => d.CvCustomerId == vipId).SingleOrDefaultAsync();

            if (amount <= 0 || amount > balance.CvBalance)
                return Result(0, "余额不足");

            // 2. 插入提现申请流水
            var record = new CustomerVipRecord
            {
                CvrVipid = vipId,
                CvrType = 4, // 提现
                CvrAmount = -amount,
                CvrSatus = 0, // 0=待审核
                CvrCreateTime = DateTime.Now
            };
            _promotion_IOC._customerVipRecord_EFCore.Add(record);
            await _promotion_IOC._customerVipRecord_EFCore.SaveChangesAsync();

            return Result(1, "提现申请已提交，等待审核");
        }


    }
}
