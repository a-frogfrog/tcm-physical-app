using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 理疗师排班表
    /// </summary>
    public partial class TherapistSchedule
    {
        /// <summary>
        /// 排班ID
        /// </summary>
        public string TsId { get; set; } = null!;
        /// <summary>
        /// 理疗师ID
        /// </summary>
        public string? TId { get; set; }
        /// <summary>
        /// 排班日期
        /// </summary>
        public DateOnly TsDate { get; set; }
        /// <summary>
        /// 开始时间
        /// </summary>
        public TimeOnly TsStartTime { get; set; }
        /// <summary>
        /// 结束时间
        /// </summary>
        public TimeOnly TsEndTime { get; set; }
        /// <summary>
        /// 状态: 1-正常排班, 2-请假, 3-调休
        /// </summary>
        public int TsStatus { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string? TsRemark { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime TsCreateTime { get; set; }
    }
}
