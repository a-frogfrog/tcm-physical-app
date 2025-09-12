using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.EFCore.MySql;
using Yuhetang.Repository.Interface;

namespace Yuhetang.Service.EFCore
{
    [Provider_, Inject_]
    public class Sys_Employees_EFCore : Base_EFCore<SysEmployee>
    {
        public Sys_Employees_EFCore(I_MySql_Repository<SysEmployee> repository) : base(repository)
        {
        }
    }
}
