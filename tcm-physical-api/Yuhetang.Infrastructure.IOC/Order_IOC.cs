using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Service.EFCore;

namespace Yuhetang.Infrastructure.IOC
{
    [Provider_, Inject_]
    public class Order_IOC
    {
        public readonly Order_EFCore _order_EFCore;
        public readonly Order_payment_EFCore _order_Payment_EFCore;

        public Order_IOC(Order_EFCore order_EFCore,Order_payment_EFCore order_Payment_EFCore)
        {
            _order_EFCore = order_EFCore;
            _order_Payment_EFCore = order_Payment_EFCore;
        }
    }
}
