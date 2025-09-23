using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    public partial class Room
    {
        public Room()
        {
            Appointments = new HashSet<Appointment>();
        }

        /// <summary>
        /// 房间ID
        /// </summary>
        public long RoomId { get; set; }
        /// <summary>
        /// 房间号
        /// </summary>
        public string RoomNumber { get; set; } = null!;
        /// <summary>
        /// 房间名称
        /// </summary>
        public string? RoomName { get; set; }
        /// <summary>
        /// 房间状态:0-可用,1-停用,2-维修
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

        public virtual ICollection<Appointment> Appointments { get; set; }
    }
}
