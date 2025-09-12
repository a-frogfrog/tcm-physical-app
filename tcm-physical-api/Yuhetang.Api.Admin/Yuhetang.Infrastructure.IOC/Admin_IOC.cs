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
    [Provider_,Inject_]
    public class Admin_IOC
    {
        public readonly Admin_Login_Logs_EFCore _admin_Login_Logs_EFCore;
        public readonly Admin_Users_EFCor _admin_Users_EFCore;
        

        public Admin_IOC(
            Admin_Users_EFCor admin_Users_EFCore,
            Admin_Login_Logs_EFCore admin_Login_Logs_EFCore
           
            ) 
        {
            _admin_Login_Logs_EFCore = admin_Login_Logs_EFCore;
            _admin_Users_EFCore = admin_Users_EFCore;
        }
    }
}
