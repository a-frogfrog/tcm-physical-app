using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request.Pc
{
    /// <summary>
    /// 新增预约请求DTO
    /// </summary>
    public class Pc_Appointment_Request_Dto:Base_Request
    {

            /// <summary>
            /// 客户ID
            /// </summary>
            public string CustomerId { get; set; }

            /// <summary>
            /// 房间ID（可选）
            /// </summary>
            public long? RoomId { get; set; }

            /// <summary>
            /// 员工ID（可选）
            /// </summary>
            public string? EmployeeId { get; set; }

            /// <summary>
            /// 套餐ID（可选）
            /// </summary>
            public string? PackageId { get; set; }

            /// <summary>
            /// 预约开始时间
            /// </summary>
            public string? BookingStartTime { get; set; }

            /// <summary>
            /// 预约结束时间
            /// </summary>
            public string? BookingEndTime { get; set; }

            /// <summary>
            /// 预约备注
            /// </summary>
            public string? Remark { get; set; }
        }
}
