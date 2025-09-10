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
    public class Admin_Users_EFCor : Base_EFCore<AdminUser>
    {
        public Admin_Users_EFCor(I_MySql_Repository<AdminUser> repository) : base(repository)
        {
        }
    }
}
