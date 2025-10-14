using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request.Pc
{
    public class Pc_Order_Pay_Request_Dto
    {
        /// <summary>
        /// 订单ID（必填）
        /// </summary>
        public string? OrderId { get; set; }

        /// <summary>
        /// 支付方式（可选，如：1-微信支付，2-支付宝，3-现金）
        /// </summary>
        public int? PayType { get; set; }

        /// <summary>
        /// 支付金额
        /// </summary>
        public string? Amount { get; set; }
    }
}
