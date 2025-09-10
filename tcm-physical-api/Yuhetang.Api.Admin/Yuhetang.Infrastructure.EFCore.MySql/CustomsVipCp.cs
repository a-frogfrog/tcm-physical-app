using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// VIP推广链接表
    /// </summary>
    public partial class CustomsVipCp
    {
        public CustomsVipCp()
        {
            CustomerVipCpsCommissions = new HashSet<CustomerVipCpsCommission>();
        }

        /// <summary>
        /// 推广链接ID
        /// </summary>
        public string CvcId { get; set; } = null!;
        /// <summary>
        /// VIP ID
        /// </summary>
        public string CvcVipid { get; set; } = null!;
        /// <summary>
        /// 推广链接URL
        /// </summary>
        public string CvcUrl { get; set; } = null!;
        /// <summary>
        /// 状态：0-停用，1-启用
        /// </summary>
        public int? CvcStatus { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CvcCreateTime { get; set; }

        public virtual CustomsVip CvcVip { get; set; } = null!;
        public virtual ICollection<CustomerVipCpsCommission> CustomerVipCpsCommissions { get; set; }
    }
}
