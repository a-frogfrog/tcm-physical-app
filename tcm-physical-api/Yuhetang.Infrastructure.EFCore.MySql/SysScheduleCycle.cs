using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 周期规则表
    /// </summary>
    public partial class SysScheduleCycle
    {
        /// <summary>
        /// 周期规则ID
        /// </summary>
        public string ScId { get; set; } = null!;
        /// <summary>
        /// 规则名称
        /// </summary>
        public string? ScName { get; set; }
        /// <summary>
        /// 部门ID
        /// </summary>
        public string? ScDeptId { get; set; }
        /// <summary>
        /// 开始日期
        /// </summary>
        public DateTime? ScStartTime { get; set; }
        /// <summary>
        /// 结束日期
        /// </summary>
        public DateTime? ScEndTime { get; set; }
        /// <summary>
        /// 是否启用：0-禁用，1-启用
        /// </summary>
        public int? ScIsBan { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string? ScRemark { get; set; }
        /// <summary>
        /// 创建人ID
        /// </summary>
        public string ScCreatorId { get; set; } = null!;
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? ScCreateTime { get; set; }
    }
}
