using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 产品规格表
    /// </summary>
    public partial class ProductSpec
    {
        public ProductSpec()
        {
            OrderDetails = new HashSet<OrderDetail>();
            ProductInventories = new HashSet<ProductInventory>();
        }

        /// <summary>
        /// 规格ID
        /// </summary>
        public string PsId { get; set; } = null!;
        /// <summary>
        /// 产品ID
        /// </summary>
        public string PsProductId { get; set; } = null!;
        /// <summary>
        /// 规格名称
        /// </summary>
        public string PsName { get; set; } = null!;
        /// <summary>
        /// 规格值
        /// </summary>
        public string PsValue { get; set; } = null!;
        /// <summary>
        /// 规格价格
        /// </summary>
        public decimal? PsPrice { get; set; }
        /// <summary>
        /// 库存数量
        /// </summary>
        public int? PsStock { get; set; }
        /// <summary>
        /// 状态：0-停用，1-启用
        /// </summary>
        public int? PsStatus { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? PsCreateTime { get; set; }

        public virtual Product PsProduct { get; set; } = null!;
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<ProductInventory> ProductInventories { get; set; }
    }
}
