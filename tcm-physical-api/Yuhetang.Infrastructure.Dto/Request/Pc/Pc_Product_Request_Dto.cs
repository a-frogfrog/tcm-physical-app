using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request.Pc
{
    public class Pc_Product_Request_Dto : Base_Request
    {
        /// <summary>
        /// 产品名称
        /// </summary>
        public string? name { get; set; }

        /// <summary>
        /// 产品价格
        /// </summary>
        public decimal? Price { get; set; }

        /// <summary>
        /// 描述
        /// </summary>
        public string? Description { get; set; }

    }
}
