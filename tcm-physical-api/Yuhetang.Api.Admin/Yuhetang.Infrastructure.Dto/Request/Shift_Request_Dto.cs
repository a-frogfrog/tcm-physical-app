using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    public class Shift_Request_Dto
    { 
        /// <summary>
        /// 班次名称
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 班次开始时间
        /// </summary>
        public string? startTime { get; set; }
        /// <summary>
        /// 班次结束时间
        /// </summary>
        public string? endTime { get; set; }
        /// <summary>
        /// 午休开始时间
        /// </summary>
        public string? breakStart { get; set; }
        /// <summary>
        /// 午休结束时间
        /// </summary>
        public string? breakEnd { get; set; }
        /// <summary>
        /// 状态:0-停用,1-启用
        /// </summary>
        public int? status { get; set; }

    }
}
