using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response
{
    public class Product_Package_Response_Dto
    {
        public string? id { get; set; }
        public string? name { get; set; }
        public string? desc { get; set; }
        public decimal? price { get; set; }
        public decimal? discount { get; set; }
        public int? status { get; set; }
        public string? time { get; set; }
        public List<Product_Package_Response_Detail_Dto> detail { get; set; }
    }
}
