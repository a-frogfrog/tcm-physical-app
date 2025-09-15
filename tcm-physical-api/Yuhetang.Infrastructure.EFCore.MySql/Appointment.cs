using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 预约表
    /// </summary>
    public partial class Appointment
    {
        /// <summary>
        /// 预约ID
        /// </summary>
        public string AId { get; set; } = null!;
        /// <summary>
        /// 客户ID
        /// </summary>
        public string ACustomerId { get; set; } = null!;
        /// <summary>
        /// 医师ID
        /// </summary>
        public string? ADoctorId { get; set; }
        /// <summary>
        /// 项目类型：1-服务项目，2-产品套餐
        /// </summary>
        public int AItemType { get; set; }
        /// <summary>
        /// 项目ID（服务ID或套餐ID）
        /// </summary>
        public string AItemId { get; set; } = null!;
        /// <summary>
        /// 预约日期
        /// </summary>
        public DateOnly AAppointDate { get; set; }
        /// <summary>
        /// 开始时间
        /// </summary>
        public TimeOnly AStartTime { get; set; }
        /// <summary>
        /// 结束时间
        /// </summary>
        public TimeOnly AEndTime { get; set; }
        /// <summary>
        /// 预约时长（分钟）
        /// </summary>
        public int ADuration { get; set; }
        /// <summary>
        /// 状态：0-待确认，1-已确认，2-已完成，3-已取消，4-客户失约
        /// </summary>
        public int AStatus { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string? ARemark { get; set; }
        /// <summary>
        /// 预约来源：1-前台预约，2-微信预约，3-电话预约，4-医师推荐
        /// </summary>
        public int? ASource { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? ACreateTime { get; set; }
        /// <summary>
        /// 最后更新时间
        /// </summary>
        public DateTime? AUpdateTime { get; set; }
    }
}
