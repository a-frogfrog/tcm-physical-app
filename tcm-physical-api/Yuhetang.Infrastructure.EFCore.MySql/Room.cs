using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    public partial class Room
    {
        public Room()
        {
            Appointments = new HashSet<Appointment>();
            Orders = new HashSet<Order>();
        }

        /// <summary>
        /// 房间ID
        /// </summary>
        public long RoomId { get; set; }
        /// <summary>
        /// 房间号
        /// </summary>
        public string? RoomNumber { get; set; }
        /// <summary>
        /// 房间名称
        /// </summary>
        public string? RoomName { get; set; }
        /// <summary>
        /// 房间状态:0-空闲,1-占用,2-已预约,3-维修
        /// </summary>
        public int? RoomStatus { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string? Remark { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CreateTime { get; set; }
        /// <summary>
        /// 当前占用房间的订单ID
        /// </summary>
        public string? ROrderId { get; set; }
        /// <summary>
        /// 当前预约房间的预约ID
        /// </summary>
        public string? RAppointmentId { get; set; }

        public virtual Appointment? RAppointment { get; set; }
        public virtual Order? ROrder { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
