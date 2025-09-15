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
    public class Sys_Duty_EFCore : Base_EFCore<SysDuty>
    {
        public Sys_Duty_EFCore(I_MySql_Repository<SysDuty> repository) : base(repository)
        {
        }
    }
}
