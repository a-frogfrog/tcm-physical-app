using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 周期模版表
    /// </summary>
    public partial class SysPeriodSchedule
    {
        /// <summary>
        /// 周期ID
        /// </summary>
        public string SpId { get; set; } = null!;
        /// <summary>
        /// 周期名称
        /// </summary>
        public string? SpName { get; set; }
        /// <summary>
        /// 周期天数
        /// </summary>
        public int? SpDay { get; set; }
        /// <summary>
        /// 适用部门ID
        /// </summary>
        public string? SpDeptId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? ScCreateTime { get; set; }
    }
}
