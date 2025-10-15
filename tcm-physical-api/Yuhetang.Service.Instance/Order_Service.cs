using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.IOC;
using Yuhetang.Service.EFCore;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.Instance 
{
    [Inject_]
    public class Order_Service : Base_Service, I_Order_Service
    {
        private readonly Orders_IOC _orders_IOC;

        public Order_Service(Orders_IOC orders_IOC)
        {
            _orders_IOC = orders_IOC;
        }
        /// <summary>
        /// 获取我的订单
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Get_My_Order(int page, int limit, int type, string id)
        {
            var iq = _orders_IOC._order_EFCore.QueryAll(out int total, page, limit, false, d => d.OcId == id && d.OStatus == type);
            return Result(1, "ok");
        }
        /// <summary>
        /// 获取订单
        /// </summary>
        /// <returns></returns>
        public Task<Api_Response_Dto> Get_Order(int page=1, int limit=10)
        {
            throw new NotImplementedException();
        }
    }
}
