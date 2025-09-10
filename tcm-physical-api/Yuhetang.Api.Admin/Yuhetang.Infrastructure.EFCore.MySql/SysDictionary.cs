using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 系统字典表
    /// </summary>
    public partial class SysDictionary
    {
        /// <summary>
        /// 字典ID
        /// </summary>
        public string DId { get; set; } = null!;
        /// <summary>
        /// 字典类型
        /// </summary>
        public string DType { get; set; } = null!;
        /// <summary>
        /// 字典值
        /// </summary>
        public string DValue { get; set; } = null!;
        /// <summary>
        /// 排序号
        /// </summary>
        public int? DSort { get; set; }
        /// <summary>
        /// 状态：0-停用，1-启用
        /// </summary>
        public int? DStatus { get; set; }
        /// <summary>
        /// 字典描述
        /// </summary>
        public string? DDescription { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? DCreateTime { get; set; }
    }
}
