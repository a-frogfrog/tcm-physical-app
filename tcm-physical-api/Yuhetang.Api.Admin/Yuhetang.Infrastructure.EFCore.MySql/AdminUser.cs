using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 管理员用户表
    /// </summary>
    public partial class AdminUser
    {
        public AdminUser()
        {
            AdminLoginLogs = new HashSet<AdminLoginLog>();
        }

        /// <summary>
        /// 管理员ID
        /// </summary>
        public string Auid { get; set; } = null!;
        /// <summary>
        /// 用户名
        /// </summary>
        public string Auaccount { get; set; } = null!;
        /// <summary>
        /// 密码
        /// </summary>
        public string Aupassword { get; set; } = null!;
        /// <summary>
        /// 盐
        /// </summary>
        public string Ausalt { get; set; } = null!;
        /// <summary>
        /// 真实姓名
        /// </summary>
        public string? AurealName { get; set; }
        /// <summary>
        /// 邮箱
        /// </summary>
        public string? Auemail { get; set; }
        /// <summary>
        /// 手机号
        /// </summary>
        public string? Auphone { get; set; }
        /// <summary>
        /// 头像URL
        /// </summary>
        public string? Auavatar { get; set; }
        /// <summary>
        /// 角色: super_admin-超级管理员, admin-普通管理员
        /// </summary>
        public string Aurole { get; set; } = null!;
        /// <summary>
        /// 状态: 1-正常, 0-禁用
        /// </summary>
        public sbyte AuisBan { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime AucreateTime { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string? Auremark { get; set; }

        public virtual ICollection<AdminLoginLog> AdminLoginLogs { get; set; }
    }
}
