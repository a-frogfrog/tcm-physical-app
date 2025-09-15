using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 班次模版表
    /// </summary>
    public partial class SysShift
    {
        /// <summary>
        /// 班次ID
        /// </summary>
        public string SId { get; set; } = null!;
        /// <summary>
        /// 班次名称
        /// </summary>
        public string? SName { get; set; }
        /// <summary>
        /// 班次开始时间
        /// </summary>
        public TimeOnly? SStartTime { get; set; }
        /// <summary>
        /// 班次结束时间
        /// </summary>
        public TimeOnly? SEndTime { get; set; }
        /// <summary>
        /// 午休开始时间（可选）
        /// </summary>
        public TimeOnly? SBreakStart { get; set; }
        /// <summary>
        /// 午休结束时间（可选）
        /// </summary>
        public TimeOnly? SBreakEnd { get; set; }
        /// <summary>
        /// 状态：0-停用，1-启用
        /// </summary>
        public int? SStatus { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? SCreateTime { get; set; }
    }
}
