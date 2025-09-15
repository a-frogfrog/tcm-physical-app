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
        /// 支付记录ID
        /// </summary>
        public string OpId { get; set; } = null!;
        /// <summary>
        /// 订单ID
        /// </summary>
        public string OpOrderId { get; set; } = null!;
        /// <summary>
        /// 支付方式：1-现金，2-微信，3-支付宝，4-银行卡
        /// </summary>
        public int OpType { get; set; }
        /// <summary>
        /// 支付金额
        /// </summary>
        public decimal OpAmount { get; set; }
        /// <summary>
        /// 支付状态：1-支付中，2-支付成功，3-支付失败
        /// </summary>
        public int OpStatus { get; set; }
        /// <summary>
        /// 交易流水号
        /// </summary>
        public string? OpTransactionNo { get; set; }
        /// <summary>
        /// 支付时间
        /// </summary>
        public DateTime? OpPayTime { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? OpCreateTime { get; set; }

        public virtual Order OpOrder { get; set; } = null!;
    }
}
