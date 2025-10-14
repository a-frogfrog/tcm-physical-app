using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response.Pc
{
    /// <summary>
    /// 预约状态修改响应DTO
    /// </summary>
    public class Pc_UpdateAppointmentStatus_Response_Dto
    {
        /// <summary>
        /// 预约ID
        /// </summary>
        public string? AppointmentId { get; set; }

        /// <summary>
        /// 修改前状态
        /// </summary>
        public string? OriginalStatusName { get; set; }

        /// <summary>
        /// 修改后状态
        /// </summary>
        public string? TargetStatusName { get; set; }



        /// <summary>
        /// 修改备注
        /// </summary>
        public string? UpdateRemark { get; set; }
    }
}

