using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 推广佣金记录表
    /// </summary>
    public partial class CustomerVipCpsCommission
    {
        /// <summary>
        /// 佣金记录ID
        /// </summary>
        public string CvccId { get; set; } = null!;
        /// <summary>
        /// VIPid
        /// </summary>
        public string? CvccVipid { get; set; }
        /// <summary>
        /// 推广链接ID
        /// </summary>
        public string CvccCpsid { get; set; } = null!;
        /// <summary>
        /// 新注册VIP ID
        /// </summary>
        public string CvccNewVipid { get; set; } = null!;
        /// <summary>
        /// 佣金金额
        /// </summary>
        public decimal CvccAmount { get; set; }
        /// <summary>
        /// 状态：0-未结算，1-已结算
        /// </summary>
        public int? CvccStatus { get; set; }
        /// <summary>
        /// 结算时间
        /// </summary>
        public DateTime? CvccSettleTime { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CvccCreateTime { get; set; }

        public virtual CustomsVipCp CvccCps { get; set; } = null!;
        public virtual CustomsVip CvccNewVip { get; set; } = null!;
    }
}
