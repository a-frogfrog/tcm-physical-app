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
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Promotion_Data_Statistics(string id)
        {
            var iq = _promotion_IOC._customerVipRecord_EFCore.QueryAll(d=>d.CvrVipid == id && d.CvrType == 1);
            if(!await iq.AnyAsync())
            {
                return Result(1, "ok");
            }

            var promotion = await iq.ToListAsync();

            List<Promotion_Data_Statistics_Response_Dto> data = new List<Promotion_Data_Statistics_Response_Dto>();
            var customs = await _promotion_IOC._custom_EFCore.QueryAll(d => d.CvcVipid == id).ToListAsync();

            var jackpot = 0m;
            var withdrawal_amount = 0m;
            promotion.ForEach(d =>
            {
                jackpot += d.CvrAmount;
                if(d.CvrSatus == 1)
                {
                    withdrawal_amount += d.CvrAmount;
                }
            });

            data.Add(new Promotion_Data_Statistics_Response_Dto
            {
                total_number_of_people = customs.Count(),
                jackpot = jackpot,
                withdrawal_amount = 0
            });

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
        
        
    }
}
