using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response.Pc
{
    public class Pc_Rooms_Response_Dto
    {
        /// <summary>
        /// 房间id
        /// </summary>
        public string? id { get; set; }

        /// <summary>
        /// 房间号
        /// </summary>
        public string? number { get; set; }

        /// <summary>
        /// 房间名称
        /// </summary>
        public string? name { get; set; }

        /// <summary>
        /// 房间状态0-空闲, 1-占用, 2-已预约, 3-维修
        /// </summary>
        public int? status { get; set; }
        
        /// <summary>
        ///订单id 
        /// </summary>
        public string? rOrderId { get; set; } // 关联订单ID

        /// <summary>
        /// 预约id
        /// </summary>
        public string? rAppointmentId { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string? remark { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public string? create_time { get; set; }

    }
}
