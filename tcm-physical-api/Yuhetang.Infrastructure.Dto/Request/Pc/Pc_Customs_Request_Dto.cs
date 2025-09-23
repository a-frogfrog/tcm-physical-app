using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request.Pc
{
    public class Pc_Customs_Request_Dto : Base_Request
    {
        /// <summary>
        /// 客户姓名
        /// </summary>
        public string? name { get; set; }

        /// <summary>
        /// 客户手机号码
        /// </summary>
        public string? phone { get; set; }

        /// <summary>
        /// 性别
        /// </summary>
        public int? Gender { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public string? CreateTime { get; set; }

        /// <summary>
        /// 最后一次消费时间
        /// </summary>
        public string? ConsumptionTime { get; set; }

        /// <summary>
        /// 累计消费
        /// </summary>
        public int? TotalSpending { get; set; }
    }
}
