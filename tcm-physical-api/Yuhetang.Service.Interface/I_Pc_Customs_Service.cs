using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request.Pc;
using Yuhetang.Infrastructure.Dto.Response;

namespace Yuhetang.Service.Interface
{
    [Provider_]
    public interface I_Pc_Customs_Service
    {
        /// <summary>
        /// 获取所有客户
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Customs(Pc_Customs_Request_Dto dto);

        /// <summary>
        /// 新增客户
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Add_Customs(Pc_Customs_Request_Dto dto);
    }
}
