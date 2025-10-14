using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response.Pc
{
    public class Pc_Order_Response_Dto
    {
        /// <summary>
        /// 订单ID
        /// </summary>
        public string?  OrderId { get; set; }

        /// <summary>
        /// 订单金额
        /// </summary>
        public decimal? OrderAmount { get; set; }

        /// <summary>
        /// 订单状态（0-未支付，1-已支付）
        /// </summary>
        public int? OrderStatus { get; set; }

        /// <summary>
        /// 订单状态名称
        /// </summary>
        public string? OrderStatusName { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string? Remark { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public string? CreateTime { get; set; }

        /// <summary>
        /// 预约ID
        /// </summary>
        public string? AppointmentId { get; set; }

        /// <summary>
        /// 客户ID
        /// </summary>
        public string? CustomerId { get; set; }

        /// <summary>
        /// 客户名称（关联查询）
        /// </summary>
        public string? CustomerName { get; set; }

        /// <summary>
        /// 房间ID
        /// </summary>
        public long? RoomId { get; set; }

        /// <summary>
        /// 房间名称（关联查询）
        /// </summary>
        public string? RoomName { get; set; }

        /// <summary>
        /// 员工ID
        /// </summary>
        public string? EmployeeId { get; set; }

        /// <summary>
        /// 员工名称（关联查询）
        /// </summary>
        public string? EmployeeName { get; set; }

        /// <summary>
        /// 套餐ID
        /// </summary>
        public string? PackageId { get; set; }

        /// <summary>
        /// 套餐名称（关联查询）
        /// </summary>
        public string? PackageName { get; set; }

        /// <summary>
        /// 产品ID
        /// </summary>
        public string? ProductId { get; set; }

        /// <summary>
        /// 产品名称（关联查询）
        /// </summary>
        public string? ProductName { get; set; }

        /// <summary>
        /// 服务ID
        /// </summary>
        public string? ServiceId { get; set; }

        /// <summary>
        /// 服务名称（关联查询）
        /// </summary>
        public string? ServiceName { get; set; }
    }
}
