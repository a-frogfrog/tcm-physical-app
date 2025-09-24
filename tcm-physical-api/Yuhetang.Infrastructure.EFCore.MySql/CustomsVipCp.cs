using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// VIP推广链接表
    /// </summary>
    public partial class CustomsVipCp
    {
        /// <summary>
        /// 推广链接ID
        /// </summary>
        public string CvcId { get; set; } = null!;
        /// <summary>
        /// VIP ID
        /// </summary>
        public string CvcVipid { get; set; } = null!;
        /// <summary>
        /// 推广码
        /// </summary>
        public string? CvcCode { get; set; }
        /// <summary>
        /// 推广长链接URL
        /// </summary>
        public string CvcLongUrl { get; set; } = null!;
        /// <summary>
        /// 推广短链接URL
        /// </summary>
        public string? CvcShortUrl { get; set; }
        /// <summary>
        /// 状态：0-停用，1-启用
        /// </summary>
        public int? CvcStatus { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CvcCreateTime { get; set; }
    }
}
