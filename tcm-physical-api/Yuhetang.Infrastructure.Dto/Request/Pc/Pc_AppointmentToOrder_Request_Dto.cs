using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request.Pc
{
    public class Pc_AppointmentToOrder_Request_Dto : Base_Request
    {
        /// <summary>
        /// 预约ID（必填）
        /// </summary>
        public string? AppointmentId { get; set; }

        /// <summary>
        /// 订单备注（可选，默认：由预约自动生成）
        /// </summary>
        public string? Remark { get; set; } 
    }
}
