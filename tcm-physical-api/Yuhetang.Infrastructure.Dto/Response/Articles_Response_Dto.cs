using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response
{
    public class Articles_Response_Dto
    {
        public string? id { get; set; }
        public string? title { get; set; }
        public string? content { get; set; }
        public int? visitors { get; set; }
        public string? time { get; set; }
    }
}
