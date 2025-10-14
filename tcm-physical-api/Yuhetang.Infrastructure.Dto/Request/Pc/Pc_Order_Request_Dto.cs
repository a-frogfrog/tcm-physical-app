using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request.Pc
{
    public class Pc_Order_Request_Dto : Base_Request
    {
        /// <summary>
        /// 订单金额
        /// </summary>
        public decimal? OrderAmount { get; set; }

        /// <summary>
        /// 备注（非必填）
        /// </summary>
        public string? Remark { get; set; }

        /// <summary>
        /// 预约ID（非必填，无预约则为空）
        /// </summary>
        public string? AppointmentId { get; set; }

        /// <summary>
        /// 客户ID（必填）
        /// </summary>
        public string? CustomerId { get; set; }

        /// <summary>
        /// 房间ID（非必填，无房间关联则为空）
        /// </summary>
        public long? RoomId { get; set; }

        /// <summary>
        /// 员工ID（必填，服务提供方）
        /// </summary>
        public string? EmployeeId { get; set; }

        /// <summary>
        /// 套餐ID（非必填）
        /// </summary>
        public string? PackageId { get; set; }

        /// <summary>
        /// 产品ID（非必填）
        /// </summary>
        public string? ProductId { get; set; }

        /// <summary>
        /// 服务ID（非必填，无服务则为空）
        /// </summary>
        public string? ServiceId { get; set; }
    }
}
