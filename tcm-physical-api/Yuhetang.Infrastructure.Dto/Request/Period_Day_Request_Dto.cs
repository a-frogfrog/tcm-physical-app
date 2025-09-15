using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    public class Period_Day_Request_Dto
    {
        /// <summary>
        /// 周期内的第几天
        /// </summary>
        public int day_no { get; set; }
        /// <summary>
        /// 班次id
        /// </summary>
        public string sps_id { get; set; }
    }
}
