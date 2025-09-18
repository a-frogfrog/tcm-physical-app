using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    public class Articles_Request_Dto
    {
        public string? id { get; set; }
        public string? title { get; set; }
        public string? content { get; set; }
        public int? visitors { get; set; }
    }
}
