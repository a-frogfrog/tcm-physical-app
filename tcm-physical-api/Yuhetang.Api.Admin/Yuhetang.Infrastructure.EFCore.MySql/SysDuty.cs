using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 岗位信息表
    /// </summary>
    public partial class SysDuty
    {
        /// <summary>
        /// 岗位ID
        /// </summary>
        public string DId { get; set; } = null!;
        /// <summary>
        /// 岗位名称
        /// </summary>
        public string DName { get; set; } = null!;
        /// <summary>
        /// 岗位描述
        /// </summary>
        public string? DDescription { get; set; }
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
