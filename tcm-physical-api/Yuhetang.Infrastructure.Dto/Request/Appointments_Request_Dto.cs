using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    public class Appointments_Request_Dto
    {
        /// <summary>
        /// 客户ID
        /// </summary>
        public string CustomerId { get; set; }


        /// <summary>
        /// 产品ID（可选）
        /// </summary>
        public string? ProductId { get; set; }

        /// <summary>
        /// 套餐ID
        /// </summary>
        public string? ProductpackageId { get; set; }

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
