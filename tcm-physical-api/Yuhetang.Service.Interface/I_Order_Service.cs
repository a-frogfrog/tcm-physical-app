using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Response;

namespace Yuhetang.Service.Interface
{
    [Provider_]
    public interface I_Order_Service
    {
        /// <summary>
        /// 获取我的订单
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_My_Order(int page,int limit,int type,string id);
        /// <summary>
        /// 获取订单(Admin)
        /// </summary>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Order(int page=1,int limit = 10);
    }
}
