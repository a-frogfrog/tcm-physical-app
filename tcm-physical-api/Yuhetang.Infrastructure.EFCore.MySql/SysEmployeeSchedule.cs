using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 员工排班表
    /// </summary>
    public partial class SysEmployeeSchedule
    {
        /// <summary>
        /// 排班记录ID
        /// </summary>
        public string SesId { get; set; } = null!;
        /// <summary>
        /// 关联员工ID
        /// </summary>
        public string? SesEmployeeId { get; set; }
        /// <summary>
        /// 关联部门ID
        /// </summary>
        public string? SesDepartmentId { get; set; }
        /// <summary>
        /// 规则ID
        /// </summary>
        public string? ScId { get; set; }
        /// <summary>
        /// 星期几
        /// </summary>
        public string? SesWeek { get; set; }
        /// <summary>
        /// 排班日期
        /// </summary>
        public DateTime? SesScheduleDate { get; set; }
        /// <summary>
        /// 关联班次ID
        /// </summary>
        public string? SesShiftId { get; set; }
        /// <summary>
        /// 排班备注
        /// </summary>
        public string? SesRemark { get; set; }
        /// <summary>
        /// 排班创建人ID
        /// </summary>
        public string? SesCreatorId { get; set; }
        /// <summary>
        /// 排班创建时间
        /// </summary>
        public DateTime? SesCreateTime { get; set; }
    }
}
