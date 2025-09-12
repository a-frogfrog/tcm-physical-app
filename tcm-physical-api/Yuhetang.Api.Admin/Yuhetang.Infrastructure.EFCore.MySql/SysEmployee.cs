using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 系统员工信息表
    /// </summary>
    public partial class SysEmployee
    {
        /// <summary>
        /// 员工ID
        /// </summary>
        public string EId { get; set; } = null!;
        /// <summary>
        /// 员工登录账号
        /// </summary>
        public string? EAccount { get; set; }
        /// <summary>
        /// 登录密码
        /// </summary>
        public string? EPassword { get; set; }
        /// <summary>
        /// 员工姓名
        /// </summary>
        public string? EName { get; set; }
        /// <summary>
        /// 性别：0-女，1-男
        /// </summary>
        public int? EGender { get; set; }
        /// <summary>
        /// 联系电话
        /// </summary>
        public string? EPhone { get; set; }
        /// <summary>
        /// 所属部门ID
        /// </summary>
        public string? EDept { get; set; }
        /// <summary>
        /// 岗位ID
        /// </summary>
        public string? EDuty { get; set; }
        /// <summary>
        /// 状态：0-离职，1-在职
        /// </summary>
        public int? EStatus { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? ECreateTime { get; set; }
    }
}
