using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 登录日志表
    /// </summary>
    public partial class SysLoginLog
    {
        /// <summary>
        /// 日志ID
        /// </summary>
        public string Llid { get; set; } = null!;
        /// <summary>
        /// 员工ID
        /// </summary>
        public string? LlEid { get; set; }
        /// <summary>
        /// 员工名
        /// </summary>
        public string? LlEname { get; set; }
        /// <summary>
        /// 登录IP
        /// </summary>
        public string? LlloginIp { get; set; }
        /// <summary>
        /// 登录凭据
        /// </summary>
        public string? Llcode { get; set; }
        /// <summary>
        /// 登录结果: 1-成功, 0-失败
        /// </summary>
        public int LlloginResult { get; set; }
        /// <summary>
        /// 失败原因
        /// </summary>
        public string? LlfailureReason { get; set; }
        /// <summary>
        /// 设备类型: pc, mobile,tablet
        /// </summary>
        public string? LldeviceType { get; set; }
        /// <summary>
        /// 浏览器
        /// </summary>
        public string? Llbrowser { get; set; }
        /// <summary>
        /// 登录地点
        /// </summary>
        public string? Lllocation { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? LlcreateTime { get; set; }
    }
}
