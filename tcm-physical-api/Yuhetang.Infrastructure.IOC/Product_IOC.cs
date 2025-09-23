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
    public class Product_IOC
    {
        public readonly Product_EFCore _product_EFCore;

        public Product_IOC(Product_EFCore product_EFCore)
        {
            _product_EFCore = product_EFCore;
        }
    }
}
