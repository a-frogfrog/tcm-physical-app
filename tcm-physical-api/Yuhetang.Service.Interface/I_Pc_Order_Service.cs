using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request.Pc;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.Dto.Response.Pc;

namespace Yuhetang.Service.Interface
{
    [Provider_]
    public interface I_Pc_Order_Service
    {
        /// <summary>
        /// 清除房间关联的订单并恢复房间空闲状态
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> ClearRoomOrderAsync(long roomId);
        /// <summary>
        /// 订单支付
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Pc_Payment_Response_Dto> PayOrderAsync(Pc_Order_payment_Request_Dto dto);
        /// <summary>
        /// 完成支付
        /// </summary>
        /// <param name="pay_id"></param>
        /// <param name="o_id"></param>
        /// <param name="money"></param>
        /// <returns></returns>
        bool PayMent(string pay_id, string o_id, string money);

        /// <summary>
        /// 新增订单
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Pc_Order_Response_Dto> AddOrderAsync(Pc_Order_Request_Dto dto);

        /// <summary>
        /// 获取所有订单
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Orders(Pc_Order_Request_Dto dto);

        /// <summary>
        /// 获取所有产品
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_product(Pc_Product_Request_Dto dto);

        /// <summary>
        /// 按房间查订单id
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        Task<Pc_Order_Response_Dto> GetOrderByRoomIdAsync(long roomId);

        
    }
}
