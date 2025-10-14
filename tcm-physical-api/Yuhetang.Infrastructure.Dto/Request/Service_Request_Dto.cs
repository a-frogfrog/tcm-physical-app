using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    public class Service_Request_Dto
    {
        public string? id { get; set; }
        /// <summary>
        /// 服务名称
        /// </summary>
        public string? name { get; set; }
        /// <summary>
        /// 封面
        /// </summary>
        public string? cover { get; set; }
        /// <summary>
        /// 服务时长(min)
        /// </summary>
        public int? duration { get; set; }
        /// <summary>
        /// 价格
        /// </summary>
        public decimal? price { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string? desc { get; set; }
        /// <summary>
        /// 佣金比例
        /// </summary>
        public decimal? rate { get; set; }
    }
}
