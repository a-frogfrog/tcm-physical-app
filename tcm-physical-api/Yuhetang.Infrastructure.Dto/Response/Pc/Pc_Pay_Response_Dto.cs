using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response.Pc
{
    public class Pc_Pay_Response_Dto
    {
        public string errcode { get; set; }
        public string errmsg { get; set; }
        public string hash { get; set; }
        public string openid { get; set; }
        public string url { get; set; }
    }
}
