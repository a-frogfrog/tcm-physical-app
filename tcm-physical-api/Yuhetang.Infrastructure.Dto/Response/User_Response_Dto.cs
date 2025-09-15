using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response
{
    public class User_Response_Dto
    {
        public string? id { get; set; }
        public string? account { get; set; }
        public string? name { get; set; }
        public string? gender { get; set; }
        public string? email { get; set; }
        public string? phone { get; set; }
        public string? avatar { get; set; }
        public string? time { get; set; }
        public int? isBan { get; set; }
    }
}
