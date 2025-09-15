using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 客户信息表
    /// </summary>
    public partial class Custom
    {
        public Custom()
        {
            CustomFollows = new HashSet<CustomFollow>();
            MembershipCards = new HashSet<MembershipCard>();
        }

        /// <summary>
        /// 客户ID
        /// </summary>
        public string CId { get; set; } = null!;
        /// <summary>
        /// 客户姓名
        /// </summary>
        public string? CName { get; set; }
        /// <summary>
        /// 手机号码
        /// </summary>
        public string? CPhone { get; set; }
        /// <summary>
        /// 性别：0-女，1-男
        /// </summary>
        public int? CGender { get; set; }
        /// <summary>
        /// 年龄
        /// </summary>
        public int? CAge { get; set; }
        /// <summary>
        /// 邮箱账号
        /// </summary>
        public string? CAccount { get; set; }
        /// <summary>
        /// 地址
        /// </summary>
        public string? CAddress { get; set; }
        /// <summary>
        /// 客户来源：1-广告，2-介绍，3-自行上门
        /// </summary>
        public int? CResource { get; set; }
        /// <summary>
        /// 是否转换：0-未转换，1-已转换
        /// </summary>
        public int? IsConvert { get; set; }
        /// <summary>
        /// 状态：0-无效，1-有效
        /// </summary>
        public int? CStatus { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CCreateTime { get; set; }

        public virtual CustomsVip CustomsVip { get; set; } = null!;
        public virtual ICollection<CustomFollow> CustomFollows { get; set; }
        public virtual ICollection<MembershipCard> MembershipCards { get; set; }
    }
}
