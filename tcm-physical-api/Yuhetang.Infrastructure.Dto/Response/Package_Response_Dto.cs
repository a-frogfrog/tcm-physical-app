using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response
{
    public class Package_Response_Dto
    {
        public string? id { get; set; }
        /// <summary>
        /// 套餐名称
        /// </summary>
        public string? name { get; set; }
        /// <summary>
        /// 套餐详情
        /// </summary>
        public string? desc { get; set; }
        /// <summary>
        /// 套餐价格
        /// </summary>
        public decimal? price { get; set; }
        /// <summary>
        /// 折扣率
        /// </summary>
        public decimal? discount { get; set; }
        /// <summary>
        /// 佣金比例
        /// </summary>
        public decimal? rate { get; set; }
        /// <summary>
        /// 0-下架,1-上架
        /// </summary>
        public int? status { get; set; }
        /// <summary>
        /// 服务id
        /// </summary>
        public List<string>? package_detail { get; set; }
        public string time { get; set; }
    }
}
