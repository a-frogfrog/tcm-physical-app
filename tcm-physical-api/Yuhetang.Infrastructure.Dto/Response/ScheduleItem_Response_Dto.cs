using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response
{
    /// <summary>
    /// 排班信息模型
    /// </summary>
    public class ScheduleItem_Response_Dto
    {
        public string Date { get; set; } // 日期
        public string EmployeeName { get; set; } // 员工姓名
        public string ShiftName { get; set; } // 班次名称（如早班/晚班）
        public string StartTime { get; set; } // 上班时间
        public string EndTime { get; set; } // 下班时间
        public string BreakStart { get; set; } // 休息时间
        public string BreakEnd { get; set; } // 休息时间
    }
}
