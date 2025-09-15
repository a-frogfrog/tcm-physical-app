using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    public class Verify_Code_Request
    {
        public string Email { get; set; }
        public string Code { get; set; }
    }
}
