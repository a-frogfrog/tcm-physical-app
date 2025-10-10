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
            Appointments = new HashSet<Appointment>();
            CustomFollows = new HashSet<CustomFollow>();
            MembershipCards = new HashSet<MembershipCard>();
            Orders = new HashSet<Order>();
        }

        /// <summary>
        /// 客户ID
        /// </summary>
        public string CId { get; set; } = null!;
        /// <summary>
        /// 客户邮箱
        /// </summary>
        public string? CEmail { get; set; }
        /// <summary>
        /// 客户用户名
        /// </summary>
        public string? CUserName { get; set; }
        /// <summary>
        /// 客户姓名
        /// </summary>
        public string? CName { get; set; }
        /// <summary>
        /// 0-禁用,1-启动
        /// </summary>
        public int? CStatus { get; set; }
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
        /// 客户来源：1-广告，2-介绍，3-自行上门
        /// </summary>
        public int? CResource { get; set; }
        /// <summary>
        /// 是否转换：0-未转换，1-已转换
        /// </summary>
        public int? IsConvert { get; set; }
        /// <summary>
        /// 推广人id
        /// </summary>
        public string? CvcVipid { get; set; }
        /// <summary>
        /// 推广码
        /// </summary>
        public string? CvcCode { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CCreateTime { get; set; }
        /// <summary>
        /// 近期消费时间
        /// </summary>
        public DateTime? CConsumptionTime { get; set; }
        /// <summary>
        /// 累计消费
        /// </summary>
        public int? CTotalSpending { get; set; }

        public virtual ICollection<Appointment> Appointments { get; set; }
        public virtual ICollection<CustomFollow> CustomFollows { get; set; }
        public virtual ICollection<MembershipCard> MembershipCards { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
