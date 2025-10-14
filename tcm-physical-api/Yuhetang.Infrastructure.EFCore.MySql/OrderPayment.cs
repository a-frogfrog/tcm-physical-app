using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 支付记录表
    /// </summary>
    public partial class OrderPayment
    {
        /// <summary>
        /// 支付ID
        /// </summary>
        public string OpId { get; set; } = null!;
        /// <summary>
        /// 订单ID
        /// </summary>
        public string? OpOrderId { get; set; }
        /// <summary>
        /// 支付方式：1-现金，2-微信，3-支付宝
        /// </summary>
        public int? OpType { get; set; }
        /// <summary>
        /// 支付金额
        /// </summary>
        public decimal? OpAmount { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? OpCreateTime { get; set; }

        public virtual Order? OpOrder { get; set; }
    }
}
