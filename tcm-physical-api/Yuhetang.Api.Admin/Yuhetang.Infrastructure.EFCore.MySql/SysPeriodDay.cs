using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 周期内天数排班详情表
    /// </summary>
    public partial class SysPeriodDay
    {
        /// <summary>
        /// 详情ID
        /// </summary>
        public string SpdId { get; set; } = null!;
        /// <summary>
        /// 关联周期模板ID
        /// </summary>
        public string SpId { get; set; } = null!;
        /// <summary>
        /// 周期内的第几天
        /// </summary>
        public int SpDayNo { get; set; }
        /// <summary>
        /// 关联班次ID
        /// </summary>
        public string SpsId { get; set; } = null!;
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? SpCreateTime { get; set; }
    }
}
