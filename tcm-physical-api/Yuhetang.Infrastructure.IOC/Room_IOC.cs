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
    public class Room_IOC
    {
        public readonly Rooms_EFCore _rooms_EFCore;

        public Room_IOC(Rooms_EFCore rooms_EFCore)
        {
            _rooms_EFCore = rooms_EFCore;
        }
    }
}
