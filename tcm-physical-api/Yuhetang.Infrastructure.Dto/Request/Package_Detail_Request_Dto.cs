using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    public class Package_Detail_Request_Dto
    {
        public string? id { get; set; }
        /// <summary>
        /// 套餐id
        /// </summary>
        public string? packageID { get; set; }
        /// <summary>
        /// 服务id
        /// </summary>
        public string? serviceID { get; set; }
        /// <summary>
        /// 服务数量
        /// </summary>
        public int? quantity { get; set; }
        /// <summary>
        /// 明细价格
        /// </summary>
        public decimal? price { get; set; }
    }
}
