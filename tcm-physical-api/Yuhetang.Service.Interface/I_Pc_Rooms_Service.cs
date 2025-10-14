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
    public interface I_Pc_Rooms_Service
    {
        /// <summary>
        /// 获取房间使用情况
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> GetRoomCurrentUsage(long roomId);

        /// <summary>
        /// 获取房间当前关联的订单和预约信息
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> GetRoomCurrentUsageAsync(long roomId);
    }   
        
}
