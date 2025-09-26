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
    public class Product_Package_IOC
    {
        public readonly Product_Package_EFCore _product_Package_EFCore;
        public readonly Product_Package_Details_EFCore _product_Package_Details_EFCore;
        public readonly Product_EFCore _product_EFCore;
        public Product_Package_IOC(
            Product_Package_EFCore product_Package_EFCore,
            Product_Package_Details_EFCore product_Package_Details_EFCore,
            Product_EFCore product_EFCore
            )
        {
            _product_Package_EFCore = product_Package_EFCore;
            _product_Package_Details_EFCore = product_Package_Details_EFCore;
            _product_EFCore = product_EFCore;
        }
    }
}
