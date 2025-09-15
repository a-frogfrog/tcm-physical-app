using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.EFCore.MySql;
using Yuhetang.Repository.Interface;

namespace Yuhetang.Service.EFCore
{
    [Provider_, Inject_]
    public class Sys_Shift_EFCore : Base_EFCore<SysShift>
    {
        public Sys_Shift_EFCore(I_MySql_Repository<SysShift> repository) : base(repository)
        {
        }
    }
}
