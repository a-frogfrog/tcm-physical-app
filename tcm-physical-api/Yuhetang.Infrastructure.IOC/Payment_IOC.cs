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
    public class Payment_IOC
    {
        public readonly Order_payment_EFCore _order_Payment_EFCore;

        public Payment_IOC(Order_payment_EFCore order_Payment_EFCore)
        {
            _order_Payment_EFCore = order_Payment_EFCore;
        }
    }
}
