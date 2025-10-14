using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response.Pc
{
    public class Pc_Product_package_Response_Dto
    {
        /// <summary>
        /// 套餐id
        /// </summary>
        public string? id { get; set; }

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

        /// <summary>
        /// 套餐状态
        /// </summary>
        public int? status { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public string? CreateTime { get; set; }
    }
}
