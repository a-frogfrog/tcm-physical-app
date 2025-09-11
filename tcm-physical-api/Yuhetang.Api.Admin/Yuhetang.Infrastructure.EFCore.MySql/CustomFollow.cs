using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 客户跟进记录表
    /// </summary>
    public partial class CustomFollow
    {
        /// <summary>
        /// 跟进记录ID
        /// </summary>
        public string CfId { get; set; } = null!;
        /// <summary>
        /// 客户ID
        /// </summary>
        public string CfCustomerId { get; set; } = null!;
        /// <summary>
        /// 跟进内容
        /// </summary>
        public string CfContent { get; set; } = null!;
        /// <summary>
        /// 跟进类型：1-电话，2-微信，3-面谈
        /// </summary>
        public int? CfType { get; set; }
        /// <summary>
        /// 下次跟进时间
        /// </summary>
        public DateTime? CfNextTime { get; set; }
        /// <summary>
        /// 跟进人
        /// </summary>
        public string CfOperator { get; set; } = null!;
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CfCreateTime { get; set; }

        public virtual Custom CfCustomer { get; set; } = null!;
    }
}
