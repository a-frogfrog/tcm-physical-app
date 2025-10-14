using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.EFCore.MySql;

namespace Yuhetang.Service.EFCore
{
    [Provider_, Inject_]
    public class Service_EFCore : Base_EFCore<ServiceTo>
    {
        public Service_EFCore(Repository.Interface.I_MySql_Repository<ServiceTo> repository) : base(repository)
        {
        }
    }
}
