using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// VIP行为记录表
    /// </summary>
    public partial class CustomerVipRecord
    {
        /// <summary>
        /// 行为记录ID
        /// </summary>
        public string CvrId { get; set; } = null!;
        /// <summary>
        /// VIP ID
        /// </summary>
        public string CvrVipid { get; set; } = null!;
        /// <summary>
        /// 行为类型：1-推广奖励，3-佣金
        /// </summary>
        public int CvrType { get; set; }
        /// <summary>
        /// 0=冻结 1=可提现 2=已提现 3=退回
        /// </summary>
        public int? CvrSatus { get; set; }
        /// <summary>
        /// 金额
        /// </summary>
        public decimal CvrAmount { get; set; }
        /// <summary>
        /// 操作前余额
        /// </summary>
        public decimal CvrBeforeBalance { get; set; }
        /// <summary>
        /// 操作后余额
        /// </summary>
        public decimal CvrAfterBalance { get; set; }
        /// <summary>
        /// 关联订单ID
        /// </summary>
        public string? CvrOrderId { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string? CvrDescription { get; set; }
        /// <summary>
        /// 操作人
        /// </summary>
        public string? CvrOperator { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CvrCreateTime { get; set; }

        public virtual CustomsVip CvrVip { get; set; } = null!;
    }
}
