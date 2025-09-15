using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 订单详情表
    /// </summary>
    public partial class OrderDetail
    {
        /// <summary>
        /// 订单明细ID
        /// </summary>
        public string OdId { get; set; } = null!;
        /// <summary>
        /// 订单ID
        /// </summary>
        public string OdOrderId { get; set; } = null!;
        /// <summary>
        /// 产品ID
        /// </summary>
        public string OdProductId { get; set; } = null!;
        /// <summary>
        /// 规格ID
        /// </summary>
        public string? OdSpecsId { get; set; }
        /// <summary>
        /// 数量
        /// </summary>
        public int OdQuantity { get; set; }
        /// <summary>
        /// 单价
        /// </summary>
        public decimal OdPrice { get; set; }
        /// <summary>
        /// 总金额
        /// </summary>
        public decimal OdTotalAmount { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? OdCreateTime { get; set; }

        public virtual Order OdOrder { get; set; } = null!;
        public virtual Product OdProduct { get; set; } = null!;
        public virtual ProductSpec? OdSpecs { get; set; }
    }
}
