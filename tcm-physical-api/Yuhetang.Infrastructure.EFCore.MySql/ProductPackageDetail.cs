using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 套餐明细表
    /// </summary>
    public partial class ProductPackageDetail
    {
        /// <summary>
        /// 套餐明细ID
        /// </summary>
        public string PpdId { get; set; } = null!;
        /// <summary>
        /// 套餐ID
        /// </summary>
        public string? PpdPackageId { get; set; }
        /// <summary>
        /// 产品ID
        /// </summary>
        public string? PpdProductId { get; set; }
        /// <summary>
        /// 产品数量
        /// </summary>
        public int? PpdQuantity { get; set; }
        /// <summary>
        /// 明细价格
        /// </summary>
        public decimal? PpdPrice { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? PpdCreateTime { get; set; }

        public virtual ProductPackage? PpdPackage { get; set; }
        public virtual Product? PpdProduct { get; set; }
    }
}
