using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response
{
    public class Schedule_Cycle_Response_Dto
    {
        public string? id { get; set; }
        /// <summary>
        /// 部门id
        /// </summary>
        public string? name { get; set; }
        public string? deptID { get; set; }
        /// <summary>
        /// 开始日期
        /// </summary>
        public string? startTime { get; set; }
        /// <summary>
        /// 结束日期
        /// </summary>
        public string? endTime { get; set; }
        public int? isBan { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string? remark { get; set; }
        public string? creatorName { get; set; }
        /// <summary>
        /// 创建人
        /// </summary>
        public string? creatorID { get; set; }
        public string? time { get; set; }
    }
}
