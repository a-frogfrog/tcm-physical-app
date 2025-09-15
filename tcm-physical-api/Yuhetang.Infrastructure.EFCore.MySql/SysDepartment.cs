using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 部门信息表
    /// </summary>
    public partial class SysDepartment
    {
        /// <summary>
        /// 部门ID
        /// </summary>
        public string DId { get; set; } = null!;
        /// <summary>
        /// 部门名称
        /// </summary>
        public string DName { get; set; } = null!;
        /// <summary>
        /// 部门经理员工ID
        /// </summary>
        public string? DManager { get; set; }
        /// <summary>
        /// 上级部门ID
        /// </summary>
        public string? DParentId { get; set; }
        /// <summary>
        /// 状态：0-停用，1-启用
        /// </summary>
        public int? DStatus { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? DCreateTime { get; set; }
    }
}
