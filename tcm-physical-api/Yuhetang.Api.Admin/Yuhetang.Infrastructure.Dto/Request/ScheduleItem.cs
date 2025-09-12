using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    public class ScheduleItem
    {
        [Required] public string TherapistId { get; set; } = string.Empty;
        [Required] public DateOnly Date { get; set; }
        [Required] public TimeOnly StartTime { get; set; }
        [Required] public TimeOnly EndTime { get; set; }
        public int Status { get; set; } = 1; // 1-正常排班
        public string? Remark { get; set; }
    }
}
