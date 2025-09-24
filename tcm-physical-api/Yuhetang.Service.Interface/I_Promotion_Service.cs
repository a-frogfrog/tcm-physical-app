using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Response;

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
        /// 删除推广链接
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Del_Link(string id);
        /// <summary>
        /// 启用/禁用链接
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Upd_Link_Status(string id);
        /// <summary>
        /// 推广数据统计
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Promotion_Data_Statistics(string id);
        /// <summary>
        /// 佣金明细
        /// </summary>
        /// <param name="vipId"></param>
        /// <param name="status"></param>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Commission_List(string vipId, int status = -1, int page = 1, int limit = 10);
        /// <summary>
        /// 获取余额
        /// </summary>
        /// <param name="vipId"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Balance(string vipId);
        /// <summary>
        /// 申请提现
        /// </summary>
        /// <param name="vipId"></param>
        /// <param name="amount"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Withdraw(string vipId, decimal amount);
    }
}
