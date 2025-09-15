using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 订单表
    /// </summary>
    public partial class Order
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
            OrderPayments = new HashSet<OrderPayment>();
        }

        /// <summary>
        /// 订单ID
        /// </summary>
        public string OId { get; set; } = null!;
        /// <summary>
        /// VIP ID
        /// </summary>
        public string? OVip { get; set; }
        /// <summary>
        /// 订单类型：1-商品订单，2-服务订单
        /// </summary>
        public int OType { get; set; }
        /// <summary>
        /// 订单金额
        /// </summary>
        public decimal OAmount { get; set; }
        /// <summary>
        /// 折扣金额
        /// </summary>
        public decimal? ODiscount { get; set; }
        /// <summary>
        /// 实际支付金额
        /// </summary>
        public decimal OPayAmount { get; set; }
        /// <summary>
        /// 状态：1-待支付，2-已支付，3-已完成，4-已取消
        /// </summary>
        public int OStatus { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string? ORemark { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? OCreateTime { get; set; }
        /// <summary>
        /// 最后更新时间
        /// </summary>
        public DateTime? OUpdateTime { get; set; }

        public virtual CustomsVip? OVipNavigation { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<OrderPayment> OrderPayments { get; set; }
    }
}
