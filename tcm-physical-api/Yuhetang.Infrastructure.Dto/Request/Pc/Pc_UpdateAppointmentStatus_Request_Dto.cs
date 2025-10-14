using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request.Pc
{
    public class Pc_UpdateAppointmentStatus_Request_Dto :Base_Request
    {
        /// <summary>
        /// 预约ID
        /// </summary>
        public string? AppointmentId { get; set; }

        /// <summary>
        /// 目标状态
        /// </summary>
        public int TargetStatus { get; set; }

        /// <summary>
        /// 状态修改备注
        /// </summary>
        public string? UpdateRemark { get; set; }
    }
}
