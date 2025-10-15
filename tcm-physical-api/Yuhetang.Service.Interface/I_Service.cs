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
    public interface I_Service
    {
        /// <summary>
        /// 获取服务
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Service(int page = 1, int limit = 10);
        /// <summary>
        /// 新增服务
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Add_Service(Service_Request_Dto dto);
        /// <summary>
        /// 删除服务
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Del_Service(string id);
        /// <summary>
        /// 修改服务
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Upd_Service(Service_Request_Dto dto);
        /// <summary>
        /// 获取服务详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Service_Detail(string id);
    }
}
