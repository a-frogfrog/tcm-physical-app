using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Yuhetang.Infrastructure.Dto.Response
{
    public class Promotion_Data_Statistics_Response_Dto
    {
        /// <summary>
        /// 总人数
        /// </summary>
        public int? total_number_of_people { get; set; }
        /// <summary>
        /// 累计奖金
        /// </summary>
        public decimal? jackpot { get; set; }
        /// <summary>
        /// 提现金额
        /// </summary>
        public decimal? withdrawal_amount { get; set; }
    }
}
