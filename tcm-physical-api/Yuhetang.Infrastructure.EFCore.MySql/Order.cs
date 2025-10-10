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
            Rooms = new HashSet<Room>();
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
        /// 订单金额
        /// </summary>
        public decimal? OAmount { get; set; }
        /// <summary>
        /// 状态：0-未支付，1-已支付
        /// </summary>
        public int? OStatus { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string? ORemark { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? OCreateTime { get; set; }
        /// <summary>
        /// 预约ID
        /// </summary>
        public string? OaId { get; set; }
        /// <summary>
        /// 客户ID
        /// </summary>
        public string? OcId { get; set; }
        /// <summary>
        /// 房间ID
        /// </summary>
        public long? OrId { get; set; }
        /// <summary>
        /// 员工ID
        /// </summary>
        public string? OeId { get; set; }
        /// <summary>
        /// 套餐ID
        /// </summary>
        public string? OppId { get; set; }
        /// <summary>
        /// 产品ID
        /// </summary>
        public string? OpId { get; set; }
        /// <summary>
        /// 服务ID
        /// </summary>
        public string? OsId { get; set; }

        public virtual CustomsVip? OVipNavigation { get; set; }
        public virtual Appointment? Oa { get; set; }
        public virtual Custom? Oc { get; set; }
        public virtual SysEmployee? Oe { get; set; }
        public virtual Product? Op { get; set; }
        public virtual ProductPackage? Opp { get; set; }
        public virtual Room? Or { get; set; }
        public virtual ServiceTo? Os { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<OrderPayment> OrderPayments { get; set; }
        public virtual ICollection<Room> Rooms { get; set; }
    }
}
