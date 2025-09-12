using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response
{
    public class Appointments_Response
    {
        /// <summary>
        /// 预约id
        /// </summary>
        public string id { get; set; }
        /// <summary>
        /// 客户id
        /// </summary>
        public string? customerID { get; set; }
        /// <summary>
        /// 医师id
        /// </summary>
        public string? doctorID { get; set; }
        /// <summary>
        /// 项目类型
        /// </summary>
        public int? type { get; set; }
        /// <summary>
        /// 项目id
        /// </summary>
        public string? itemID { get; set; }
        /// <summary>
        /// 预约日期
        /// </summary>
        public string? appointDate { get; set; }
        public string? startTime { get; set; }
        public string? endTime { get; set; }
        /// <summary>
        /// 预约时长
        /// </summary>
        public int? duration { get; set; }
        /// <summary>
        /// 状态:0-待确认,1-已确认,2-已完成,3-客户失约
        /// </summary>
        public int? status { get; set; }
        /// <summary>
        /// 预约来源:1-前台预约,2-微信预约,3-电话预约
        /// </summary>
        public int? source { get; set; }
        public string? createTime { get; set; }
        /// <summary>
        /// 最后更新时间
        /// </summary>
        public string? updateTime { get; set; }
    }
}
