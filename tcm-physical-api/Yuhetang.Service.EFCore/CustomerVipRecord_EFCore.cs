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
    public class CustomerVipRecord_EFCore : Base_EFCore<CustomerVipRecord>
    {
        public CustomerVipRecord_EFCore(I_MySql_Repository<CustomerVipRecord> repository) : base(repository)
        {
        }
    }
}
