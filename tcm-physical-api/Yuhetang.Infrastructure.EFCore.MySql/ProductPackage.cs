using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 产品套餐表
    /// </summary>
    public partial class ProductPackage
    {
        public ProductPackage()
        {
            Appointments = new HashSet<Appointment>();
            ProductPackageDetails = new HashSet<ProductPackageDetail>();
        }

        /// <summary>
        /// 套餐ID
        /// </summary>
        public string PpId { get; set; } = null!;
        /// <summary>
        /// 套餐名称
        /// </summary>
        public string PpName { get; set; } = null!;
        /// <summary>
        /// 套餐描述
        /// </summary>
        public string? PpDescription { get; set; }
        /// <summary>
        /// 套餐价格
        /// </summary>
        public decimal PpPrice { get; set; }
        /// <summary>
        /// 折扣率
        /// </summary>
        public decimal? PpDiscount { get; set; }
        /// <summary>
        /// 状态：0-下架，1-上架
        /// </summary>
        public int? PpStatus { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? PpCreateTime { get; set; }

        public virtual ICollection<Appointment> Appointments { get; set; }
        public virtual ICollection<ProductPackageDetail> ProductPackageDetails { get; set; }
    }
}
