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
    /// <summary>
    /// 产品套餐
    /// </summary>s
    public interface I_Product_Package_Service
    {
        /// <summary>
        /// 获取产品套餐
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Product_Package(int page=1,int limit=10);
        /// <summary>
        /// 获取服务
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Service(int page = 1, int limit = 10);
        
    }
}
