

namespace Yuhetang.Infrastructure.Dto.Request
{
    public class Create_Schedule_Request
    {
        public List<ScheduleItem> Schedules { get; set; } = new();

        public bool SkipConflicts { get; set; } = false; // 是否跳过冲突排班
    }
}
