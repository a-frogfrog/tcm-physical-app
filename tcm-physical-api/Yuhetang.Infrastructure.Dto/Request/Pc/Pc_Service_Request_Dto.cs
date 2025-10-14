using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request.Pc
{
    public class Pc_Service_Request_Dto : Base_Request
    {
        /// <summary>
        /// 服务名称
        /// </summary>
        public string? name { get; set; }

        /// <summary>
        /// 服务时间
        /// </summary>
        public int? duration { get; set; }

        /// <summary>
        /// 服务价格
        /// </summary>
        public decimal? price { get; set; }

        /// <summary>
        /// 服务详情
        /// </summary>
        public string? description { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public string? createtime { get; set; }
    }
}
