using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 库存记录表
    /// </summary>
    public partial class ProductInventory
    {
        /// <summary>
        /// 库存记录ID
        /// </summary>
        public string PiId { get; set; } = null!;
        /// <summary>
        /// 产品ID
        /// </summary>
        public string PiProductId { get; set; } = null!;
        /// <summary>
        /// 规格ID
        /// </summary>
        public string? PiSpecsId { get; set; }
        /// <summary>
        /// 变动类型：1-入库，2-出库，3-调整
        /// </summary>
        public int PiType { get; set; }
        /// <summary>
        /// 变动数量
        /// </summary>
        public int PiQuantity { get; set; }
        /// <summary>
        /// 变更前库存
        /// </summary>
        public int PiBeforeStock { get; set; }
        /// <summary>
        /// 变更后库存
        /// </summary>
        public int PiAfterStock { get; set; }
        /// <summary>
        /// 变动原因
        /// </summary>
        public string? PiReason { get; set; }
        /// <summary>
        /// 操作人
        /// </summary>
        public string? PiOperator { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? PiCreateTime { get; set; }

        public virtual Product PiProduct { get; set; } = null!;
        public virtual ProductSpec? PiSpecs { get; set; }
    }
}
