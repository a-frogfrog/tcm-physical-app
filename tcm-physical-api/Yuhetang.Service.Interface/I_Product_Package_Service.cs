using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request;
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
        /// 获取套餐列表
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Package(int page=1,int limit=10);
        /// <summary>
        /// 新增套餐
        /// </summary>
        /// <returns></returns>
        Task<Api_Response_Dto> Add_Package(Package_Resquest_Dto dto);
        /// <summary>
        /// 更新套餐
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Upd_Package(Package_Resquest_Dto dto);
        /// <summary>
        /// 删除套餐
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Del_Package(string id);
        /// <summary>
        /// 获取产品列表
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Products(int page = 1, int limit = 10);
        /// <summary>
        /// 新增产品
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Add_Products(Product_Request_Dto dto);
        /// <summary>
        /// 更新产品
        /// </summary>
        /// <returns></returns>
        Task<Api_Response_Dto> Upd_Products(Product_Request_Dto dto);
        /// <summary>
        /// 删除产品
        /// </summary>
        /// <returns></returns>
        Task<Api_Response_Dto> Del_Products(string id);
    }
}
