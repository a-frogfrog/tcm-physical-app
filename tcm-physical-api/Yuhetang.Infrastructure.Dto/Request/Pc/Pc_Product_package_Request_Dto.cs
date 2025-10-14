using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request.Pc
{
    public class Pc_Product_package_Request_Dto : Base_Request
    {
        /// <summary>
        /// 套餐名称
        /// </summary>
        public string? name { get; set; }

        /// <summary>
        /// 套餐描述
        /// </summary>
        public string? desc { get; set; }

        /// <summary>
        /// 套餐价格
        /// </summary>
        public decimal? price { get; set; }
    }
}
