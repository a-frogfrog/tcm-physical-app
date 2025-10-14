using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response.Pc
{
    public class Pc_product_Response_Dto
    {
        /// <summary>
        /// 产品ID
        /// </summary>
        public string? id { get; set; }

        /// <summary>
        /// 产品名称
        /// </summary>
        public string? name { get; set; }

        /// <summary>
        /// 产品描述
        /// </summary>
        public string? description { get; set; }

        /// <summary>
        /// 产品价格
        /// </summary>
        public decimal? price { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public string? CreateTime { get; set; }
    }
}
