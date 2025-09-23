using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Service.EFCore;

namespace Yuhetang.Infrastructure.IOC
{
    [Inject_,Provider_]
    public class Custom_IOC
    {
        public readonly Custom_EFCore _custom_EFCore;

        public Custom_IOC(Custom_EFCore custom_EFCore)
        {
            _custom_EFCore = custom_EFCore;
        }
    }
}
