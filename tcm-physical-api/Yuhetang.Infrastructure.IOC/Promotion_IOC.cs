using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Service.EFCore;

namespace Yuhetang.Infrastructure.IOC
{
    [Provider_,Inject_]
    public class Promotion_IOC
    {
        public readonly CustomerVipCps_EFCore _customerVipCps_EFCore;
        public readonly CustomerVipRecord_EFCore _customerVipRecord_EFCore;
        public readonly CustomsVip_EFCore _customsVip_EFCore;
        public readonly Order_EFCore _order_EFCore;
        public readonly Custom_EFCore _custom_EFCore;

        public Promotion_IOC
            (
                CustomerVipCps_EFCore customerVipCps_EFCore,
                CustomerVipRecord_EFCore customerVipRecord_EFCore,
                CustomsVip_EFCore customsVip_EFCore,
                Order_EFCore order_EFCore,
                Custom_EFCore custom_EFCore
            )
        {
            _customerVipCps_EFCore = customerVipCps_EFCore;
            _customerVipRecord_EFCore = customerVipRecord_EFCore;
            _customsVip_EFCore = customsVip_EFCore;
            _order_EFCore = order_EFCore;
            _custom_EFCore = custom_EFCore;
        }

    }
}
