using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 管理员登录日志表
    /// </summary>
    public partial class AdminLoginLog
    {
        /// <summary>
        /// 日志ID
        /// </summary>
        public string Allid { get; set; } = null!;
        /// <summary>
        /// 管理员ID
        /// </summary>
        public string Auid { get; set; } = null!;
        /// <summary>
        /// 用户名
        /// </summary>
        public string Auname { get; set; } = null!;
        /// <summary>
        /// 登录时间
        /// </summary>
        public DateTime? AllloginTime { get; set; }
        /// <summary>
        /// 登录IP
        /// </summary>
        public string AllloginIp { get; set; } = null!;
        /// <summary>
        /// 登录凭据
        /// </summary>
        public string? Allcode { get; set; }
        /// <summary>
        /// 登录结果: 1-成功, 0-失败
        /// </summary>
        public int AllloginResult { get; set; }
        /// <summary>
        /// 失败原因
        /// </summary>
        public string? AllfailureReason { get; set; }
        /// <summary>
        /// 设备类型: pc, mobile,tablet
        /// </summary>
        public string? AlldeviceType { get; set; }
        /// <summary>
        /// 浏览器
        /// </summary>
        public string? Allbrowser { get; set; }
        /// <summary>
        /// 登录地点
        /// </summary>
        public string? Alllocation { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime AllcreateTime { get; set; }

        public virtual AdminUser Au { get; set; } = null!;
    }
}
