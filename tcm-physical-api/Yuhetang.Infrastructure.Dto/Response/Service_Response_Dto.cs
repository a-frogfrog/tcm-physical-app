using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response
{
    public class Service_Response_Dto
    {
        public string id { get; set; }
        public string cover { get; set; }
        public string? name { get; set; }
        public int? duration { get; set; }
        public decimal? price { get; set; }
        public string? desc { get; set; }
        public string? time { get; set; }
        public decimal? rate { get; set; }
    }
}
