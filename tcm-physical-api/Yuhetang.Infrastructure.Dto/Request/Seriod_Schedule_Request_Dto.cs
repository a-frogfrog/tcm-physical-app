using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    public class Seriod_Schedule_Request_Dto
    {
        /// <summary>
        /// 周期天数
        /// </summary>
        public int day { get; set; }
        /// <summary>
        /// 适用部门
        /// </summary>
        public string? deptID { get; set; }
        public List<Period_Day_Request_Dto> period_day { get; set; }
    }
}
