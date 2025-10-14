using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response
{
    public class Appointments_Response_Dto
    {
        /// <summary>
        /// 预约id
        /// </summary>
        public string? id { get; set; }
        /// <summary>
        /// 客户id
        /// </summary>
        public string? customerID { get; set; }
        /// <summary>
        /// 项目类型
        /// </summary>
        public int? type { get; set; }
        public string? startTime { get; set; }
        public string? endTime { get; set; }
        /// <summary>
        /// 预约时长
        /// </summary>
        public int? duration { get; set; }
        /// <summary>
        /// 预约状态：0-待确认，1-已确认，2-已取消，3-已完成
        /// </summary>
        public int? status { get; set; }
        public string? createTime { get; set; }


        public string? serviceName { get; set; }
        public decimal? price { get; set; }

        public string? cover { get; set; }

    }
}
