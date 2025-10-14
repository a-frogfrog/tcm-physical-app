using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 服务信息表
    /// </summary>
    public partial class Service
    {
        /// <summary>
        /// 服务ID
        /// </summary>
        public string SId { get; set; } = null!;
        /// <summary>
        /// 服务名称
        /// </summary>
        public string? SName { get; set; }
        /// <summary>
        /// 服务时长（单位：分钟）
        /// </summary>
        public int? SDuration { get; set; }
        /// <summary>
        /// 服务价格
        /// </summary>
        public decimal? SPrice { get; set; }
        /// <summary>
        /// 服务详情描述
        /// </summary>
        public string? SDescription { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CreateTime { get; set; }
    }
}
