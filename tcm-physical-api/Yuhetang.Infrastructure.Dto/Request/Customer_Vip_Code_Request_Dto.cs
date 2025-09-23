using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    public class Customer_Vip_Code_Request_Dto
    {
        public string? id { get; set; }
        public string? VIPID { get; set; }
        public string? code { get; set; }
        public string? longUrl { get; set; }
        public string? shortUrl { get; set; }
        public int? status { get; set; }
    }
}
