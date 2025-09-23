using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response.Pc
{
    public class Pc_Appointments_Response
    {
        /// <summary>
        /// 预约ID
        /// </summary>
        public string? id { get; set; }
        
        /// <summary>
        /// 客户姓名
        /// </summary>
        public string? name { get; set; }

        /// <summary>
        /// 房间号
        /// </summary>
        public string? RoomNumber { get; set; }

        /// <summary>
        /// 员工姓名
        /// </summary>
        public string? EmployeeName { get; set; }

        /// <summary>
        /// 套餐名称
        /// </summary>
        public string? PackageName { get; set; }

        /// <summary>
        /// 预约开始时间
        /// </summary>
        public string? BookingStartTime { get; set; }

        /// <summary>
        /// 预约结束时间
        /// </summary>
        public string? BookingEndTime { get; set; }

        /// <summary>
        /// 预约状态
        /// </summary>
        public int? BookingStatus { get; set; }

        /// <summary>
        /// 预约状态名称
        /// </summary>
        public string BookingStatusName => BookingStatus switch
        {
            0 => "待确认",
            1 => "已确认",
            2 => "已取消",
            3 => "已完成"
        };

        /// <summary>
        /// 创建时间
        /// </summary>
        public string? CreateTime { get; set; }
    }
}
