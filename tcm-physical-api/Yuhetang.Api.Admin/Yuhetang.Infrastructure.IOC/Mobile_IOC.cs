using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Service.EFCore;

namespace Yuhetang.Infrastructure.IOC
{
    [Provider_, Inject_]
    public class Mobile_IOC
    {
        public readonly Custom_EFCore _custom_EFCore;

        public Mobile_IOC(
            Custom_EFCore custom_EFCore
            )
        {
            _custom_EFCore = custom_EFCore;
        }
    }
}
