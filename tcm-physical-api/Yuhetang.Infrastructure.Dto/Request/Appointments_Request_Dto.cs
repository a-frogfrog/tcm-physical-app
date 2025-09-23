using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    public class Appointments_Request_Dto
    {
        public string? name { get; set; }
        public string? phone { get; set; }
        /// <summary>
        /// 预约时间
        /// </summary>
        public string? aim_time { get; set; }
        /// <summary>
        /// 套餐id
        /// </summary>
        public string? pp_id { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string? remark { get; set; }
    }
}
