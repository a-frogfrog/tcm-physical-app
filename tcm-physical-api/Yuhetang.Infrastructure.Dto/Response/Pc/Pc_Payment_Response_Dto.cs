using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response.Pc
{
    public class Pc_Payment_Response_Dto
    {
        /// <summary>
        /// 支付记录ID
        /// </summary>
        public string? PaymentId { get; set; }

        /// <summary>
        /// 订单ID
        /// </summary>
        public string? OrderId { get; set; }

        /// <summary>
        /// 支付方式名称（现金/微信/支付宝）
        /// </summary>
        public int? PaymentType { get; set; }

        /// <summary>
        /// 支付金额
        /// </summary>
        public decimal PaymentAmount { get; set; }

        /// <summary>
        /// 支付时间
        /// </summary>
        public string? PaymentTime { get; set; }

        /// <summary>
        /// 订单当前状态（1-已支付）
        /// </summary>
        public int? OrderStatus { get; set; }

        /// <summary>
        /// 订单状态名称
        /// </summary>
        public string? OrderStatusName { get; set; }
    }
}
