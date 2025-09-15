using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response
{
    public class Period_Day_Reponse_Dto
    {
        public string? id { get; set; }
        /// <summary>
        /// 周期排班id
        /// </summary>
        public string? sp_id { get; set; }
        public int? day_no { get; set; }
        /// <summary>
        /// 班次id
        /// </summary>
        public string? sps_id { get; set; }
        /// <summary>
        /// 班次名称
        /// </summary>
        public string? name { get; set; }
        /// <summary>
        /// 开始时间
        /// </summary>
        public string? startTime { get; set; }
        /// <summary>
        /// 结束时间
        /// </summary>
        public string? endTime { get; set; }
        public string? time { get; set; }
    }
}
