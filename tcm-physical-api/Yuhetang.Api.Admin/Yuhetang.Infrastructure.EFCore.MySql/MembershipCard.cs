using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 会员卡表
    /// </summary>
    public partial class MembershipCard
    {
        /// <summary>
        /// 会员卡ID
        /// </summary>
        public string CardId { get; set; } = null!;
        /// <summary>
        /// 客户ID
        /// </summary>
        public string CId { get; set; } = null!;
        /// <summary>
        /// 余额
        /// </summary>
        public decimal? Balance { get; set; }
        /// <summary>
        /// 支付密码(加密存储)
        /// </summary>
        public string? Password { get; set; }
        /// <summary>
        /// 盐值
        /// </summary>
        public string? Salt { get; set; }
        /// <summary>
        /// 会员卡创建时间
        /// </summary>
        public DateTime? CreatedTime { get; set; }
        /// <summary>
        /// 会员卡状态: 0-无效, 1-有效
        /// </summary>
        public int? CardStatus { get; set; }

        public virtual Custom CIdNavigation { get; set; } = null!;
    }
}
