using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response
{
    public class Product_Response_Dto
    {

        public string? id { get; set; }
        /// <summary>
        /// 详情
        /// </summary>
        public string? desc { get; set; }
        /// <summary>
        /// 价格
        /// </summary>
        public decimal? price { get; set; }
        /// <summary>
        /// 佣金比例
        /// </summary>
        public decimal? rate { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string? time { get; set; }
    }
}
