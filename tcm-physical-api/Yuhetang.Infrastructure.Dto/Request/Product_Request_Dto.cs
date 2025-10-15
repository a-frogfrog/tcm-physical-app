using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    /// <summary>
    /// 产品
    /// </summary>
    public class Product_Request_Dto
    {
        public string? id { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string? name { get; set; }
        /// <summary>
        /// 封面
        /// </summary>
        public string? cover { get; set; }
        /// <summary>
        /// 描述
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
        /// 0-下架,1-上架
        /// </summary>
        public int? status { get; set; }
        public string? time { get; set; }
    }
}
