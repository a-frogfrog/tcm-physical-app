using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.EFCore.MySql;
using Yuhetang.Service.EFCore;

namespace Yuhetang.Infrastructure.IOC
{
    [Provider_, Inject_]
    public class Employees_IOC
    {
        public readonly Sys_Employees_EFCore _sys_Employees_EFCore;

        public Employees_IOC(Sys_Employees_EFCore sys_Employees_EFCore )
        {
            _sys_Employees_EFCore = sys_Employees_EFCore;
        }
    }
}
