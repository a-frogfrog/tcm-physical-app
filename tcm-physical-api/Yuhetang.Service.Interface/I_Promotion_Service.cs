using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.EFCore.MySql;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Yuhetang.Service.Interface
{
    [Provider_]
    /// <summary>
    /// 推广
    /// </summary>
    public interface I_Promotion_Service
    {
        /// <summary>
        /// 生成链接
        /// </summary>
        /// <returns></returns>
        Task<Api_Response_Dto> Generate_Link(string id);

        /// <summary>
        /// 生成二维码
        /// </summary>
        /// <param name="shortUrl"></param>
        Task<string> Generate_QRCode(string longUrl);
        /// <summary>
        /// 获取推广链接
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_CustomsVipCps(int page=1,int limit = 10);
        /// <summary>
        /// 推广数据统计
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Promotion_Data_Statistics(string id);
    }
}
