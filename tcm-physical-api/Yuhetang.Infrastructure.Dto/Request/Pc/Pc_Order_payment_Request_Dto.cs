using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request.Pc
{
    public class Pc_Order_payment_Request_Dto
    {
        /// <summary>
        /// 订单ID（必填）
        /// </summary>
        public string? OrderId { get; set; }

        /// <summary>
        /// 支付方式（1-现金，2-微信，3-支付宝，必填）
        /// </summary>
        public int? PaymentType { get; set; }

        /// <summary>
        /// 支付金额（必填，需与订单金额一致）
        /// </summary>
        public decimal PaymentAmount { get; set; }

        /// <summary>
        /// 支付备注（非必填）
        /// </summary>
        public string? PaymentRemark { get; set; }
    }
}
