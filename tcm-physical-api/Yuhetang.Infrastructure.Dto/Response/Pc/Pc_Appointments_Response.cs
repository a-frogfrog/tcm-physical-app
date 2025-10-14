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
        public string? CustomsName { get; set; }

        /// <summary>
        /// 客户ID
        /// </summary>
        public string? CustomerId { get; set; }
        /// <summary>
        /// 客户手机号码
        /// </summary>
        public string? CustomsPhone { get; set; }

        /// <summary>
        /// 房间号
        /// </summary>
        public string? RoomNumber { get; set; }

        /// <summary>
        /// 房间名称
        /// </summary>
        public string? RoomName { get; set; }

        /// <summary>
        /// 房间状态
        /// </summary>
        public int? status { get; set; }

        /// <summary>
        /// 房间ID
        /// </summary>
        public long? RoomId { get; set; }

        /// <summary>
        /// 员工姓名
        /// </summary>
        public string? EmployeeName { get; set; }

        /// <summary>
        /// 员工姓名
        /// </summary>
        public string? EmployeePosition { get; set; }
        /// <summary>
        /// 员工ID
        /// </summary>
        public string? EmployeeId { get; set; }
        /// <summary>
        /// 套餐名称
        /// </summary>
        public string? ProductpackageName { get; set; }

        /// <summary>
        /// 套餐价格
        /// </summary>
        public decimal? ProductpackagePrice { get; set; }
        /// <summary>
        /// 套餐ID
        /// </summary>
        public string? ProductpackageId { get; set; }

        /// <summary>
        /// 服务价格
        /// </summary>
        public decimal? ServicePrice { get; set; }
        /// <summary>
        /// 服务名称
        /// </summary>
        public string? ServiceName { get; set; }

        /// <summary>
        /// 服务ID
        /// </summary>
        public string? ServiceId { get; set; }

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
        /// 备注
        /// </summary>
        public string? Remark { get; set; }
        /// <summary>
        /// 预约状态名称
        /// </summary>
        public string? BookingStatusName => BookingStatus switch
        {
            0 => "待确认",
            1 => "已确认",
            2 => "已取消",
            3 => "已完成",
            4 => "转成订单"
        };

        /// <summary>
        /// 创建时间 
        /// </summary> 
        public string? CreateTime { get; set; }
    }
}
