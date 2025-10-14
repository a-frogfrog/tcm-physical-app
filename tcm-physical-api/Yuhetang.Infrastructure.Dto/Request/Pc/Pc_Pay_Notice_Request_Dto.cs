using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request.Pc
{
    public class Pc_Pay_Notice_Request_Dto
    {
        /// <summary>
        /// 交易订单id
        /// </summary>
        public string? trade_order_id { get; set; }
        /// <summary>
        /// 总费用
        /// </summary>
        public string? total_fee { get; set; }
        /// <summary>
        /// 交易id
        /// </summary>
        public string? transaction_id { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string? plugins { get; set; }
        /// <summary>
        /// 状态
        /// </summary>
        public string? status { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string? hash { get; set; }
    }
}
