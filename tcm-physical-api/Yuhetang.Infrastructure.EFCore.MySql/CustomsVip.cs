using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// VIP会员信息表
    /// </summary>
    public partial class CustomsVip
    {
        public CustomsVip()
        {
            CustomerVipCpsCommissions = new HashSet<CustomerVipCpsCommission>();
            CustomerVipRecords = new HashSet<CustomerVipRecord>();
            Orders = new HashSet<Order>();
        }

        /// <summary>
        /// VIPID
        /// </summary>
        public string CvId { get; set; } = null!;
        /// <summary>
        /// 客户ID
        /// </summary>
        public string CvCustomerId { get; set; } = null!;
        /// <summary>
        /// VIP等级
        /// </summary>
        public int? CvLevel { get; set; }
        /// <summary>
        /// 账户余额
        /// </summary>
        public decimal? CvBalance { get; set; }
        /// <summary>
        /// 累计充值金额
        /// </summary>
        public decimal? CvTotalRecharge { get; set; }
        /// <summary>
        /// 累计消费金额
        /// </summary>
        public decimal? CvTotalConsume { get; set; }
        /// <summary>
        /// 状态：0-冻结，1-正常
        /// </summary>
        public int? CvStatus { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CvCreateTime { get; set; }
        /// <summary>
        /// 最后更新时间
        /// </summary>
        public DateTime? CvUpdateTime { get; set; }

        public virtual Custom CvCustomer { get; set; } = null!;
        public virtual ICollection<CustomerVipCpsCommission> CustomerVipCpsCommissions { get; set; }
        public virtual ICollection<CustomerVipRecord> CustomerVipRecords { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
