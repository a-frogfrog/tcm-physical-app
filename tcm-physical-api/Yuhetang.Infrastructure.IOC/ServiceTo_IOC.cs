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
    public class ServiceTo_IOC
    {
        public readonly Service_EFCore _service_EFCore;

        public ServiceTo_IOC(Service_EFCore service_EFCore)
        {
            _service_EFCore = service_EFCore;
        }
    }
}
