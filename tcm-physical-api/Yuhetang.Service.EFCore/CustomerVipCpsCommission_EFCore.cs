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
    public class CustomerVipCpsCommission_EFCore : Base_EFCore<CustomerVipCpsCommission>
    {
        public CustomerVipCpsCommission_EFCore(I_MySql_Repository<CustomerVipCpsCommission> repository) : base(repository)
        {
        }
    }
}
