using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    public partial class Article
    {
        /// <summary>
        /// 文章ID
        /// </summary>
        public string Id { get; set; } = null!;
        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; } = null!;
        /// <summary>
        /// 内容
        /// </summary>
        public string Content { get; set; } = null!;
        /// <summary>
        /// 浏览人数
        /// </summary>
        public int? Visitors { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreatedTime { get; set; }
    }
}
