using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 产品信息表
    /// </summary>
    public partial class Product
    {
        public Product()
        {
            OrderDetails = new HashSet<OrderDetail>();
            Orders = new HashSet<Order>();
            ProductInventories = new HashSet<ProductInventory>();
            ProductPackageDetails = new HashSet<ProductPackageDetail>();
            ProductSpecs = new HashSet<ProductSpec>();
        }

        /// <summary>
        /// 产品ID
        /// </summary>
        public string PId { get; set; } = null!;
        /// <summary>
        /// 产品封面
        /// </summary>
        public string? PCover { get; set; }
        /// <summary>
        /// 产品名称
        /// </summary>
        public string PName { get; set; } = null!;
        /// <summary>
        /// 产品分类ID
        /// </summary>
        public string? PCategory { get; set; }
        /// <summary>
        /// 产品描述
        /// </summary>
        public string? PDescription { get; set; }
        /// <summary>
        /// 产品价格
        /// </summary>
        public decimal? PPrice { get; set; }
        /// <summary>
        /// 佣金比例
        /// </summary>
        public decimal? PCommissionRate { get; set; }
        /// <summary>
        /// 状态：0-下架，1-上架
        /// </summary>
        public int? PStatus { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? PCreateTime { get; set; }

        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<ProductInventory> ProductInventories { get; set; }
        public virtual ICollection<ProductPackageDetail> ProductPackageDetails { get; set; }
        public virtual ICollection<ProductSpec> ProductSpecs { get; set; }
    }
}
