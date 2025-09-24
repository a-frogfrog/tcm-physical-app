using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 预约信息表
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
        public string? AcId { get; set; }
        /// <summary>
        /// 房间ID
        /// </summary>
        public long? ArId { get; set; }
        /// <summary>
        /// 员工ID
        /// </summary>
        public string? AeId { get; set; }
        /// <summary>
        /// 套餐ID
        /// </summary>
        public string? AppId { get; set; }
        /// <summary>
        /// 产品ID
        /// </summary>
        public string? ApId { get; set; }
        /// <summary>
        /// 预约开始时间
        /// </summary>
        public DateTime? BookingStartTime { get; set; }
        /// <summary>
        /// 预约结束时间
        /// </summary>
        public DateTime? BookingEndTime { get; set; }
        /// <summary>
        /// 预约状态：0-待确认，1-已确认，2-已取消，3-已完成
        /// </summary>
        public int? BookingStatus { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string? Remark { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CreateTime { get; set; }

        public virtual Custom? Ac { get; set; }
        public virtual SysEmployee? Ae { get; set; }
        public virtual Product? Ap { get; set; }
        public virtual ProductPackage? App { get; set; }
        public virtual Room? Ar { get; set; }
    }
}
