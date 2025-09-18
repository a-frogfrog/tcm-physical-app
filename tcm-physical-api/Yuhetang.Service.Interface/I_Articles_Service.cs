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
    /// 文章管理
    /// </summary>
    public interface I_Articles_Service
    {
        /// <summary>
        /// 获取文章
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Articles(int page = 1, int limit = 10);
        /// <summary>
        /// 添加浏览人数
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Visitors(Articles_Request_Dto dto);
        /// <summary>
        /// 删除文章
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Del_Articles(string id);
        /// <summary>
        /// 修改
        /// </summary>
        /// <returns></returns>
        Task<Api_Response_Dto> Upd_Articles(Articles_Request_Dto dto);
        /// <summary>
        /// 新增文章
        /// </summary>
        /// <returns></returns>
        Task<Api_Response_Dto> Add_Articles(Articles_Request_Dto dto);
    }
}
