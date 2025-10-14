using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response.Pc
{
    public class Pc_AppointmentToOrder_Response_Dto : Pc_Order_Response_Dto
    {
        /// <summary>
        /// 原预约ID
        /// </summary>
        public string? AppointmentId { get; set; }

        /// <summary>
        /// 预约转订单时间
        /// </summary>
        public string? ConversionTime { get; set; }

        /// <summary>
        /// 原预约状态
        /// </summary>
        public string? OriginalAppointmentStatus { get; set; }
    }
}
