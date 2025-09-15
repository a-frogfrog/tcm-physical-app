using System;
using System.Collections.Generic;

namespace Yuhetang.Infrastructure.EFCore.MySql
{
    /// <summary>
    /// 理疗师表
    /// </summary>
    public partial class Therapist
    {
        /// <summary>
        /// 理疗师ID
        /// </summary>
        public string TId { get; set; } = null!;
        /// <summary>
        /// 员工ID
        /// </summary>
        public string TStaffId { get; set; } = null!;
        /// <summary>
        /// 理疗师姓名
        /// </summary>
        public string TName { get; set; } = null!;
        /// <summary>
        /// 性别
        /// </summary>
        public string? TGender { get; set; }
        /// <summary>
        /// 照片
        /// </summary>
        public string? TPhoto { get; set; }
        /// <summary>
        /// 擅长项目
        /// </summary>
        public string? TSpecialty { get; set; }
        /// <summary>
        /// 理疗师介绍
        /// </summary>
        public string? TIntroduction { get; set; }
        /// <summary>
        /// 资格证书
        /// </summary>
        public string? TCertificate { get; set; }
        /// <summary>
        /// 技术特长
        /// </summary>
        public string? TSkills { get; set; }
        /// <summary>
        /// 是否可预约：0-否，1-是
        /// </summary>
        public bool? TIsAvailable { get; set; }
        /// <summary>
        /// 状态：0-离职，1-在职，2-休假
        /// </summary>
        public int? TStatus { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? TCreateTime { get; set; }
        /// <summary>
        /// 最后更新时间
        /// </summary>
        public DateTime? TUpdateTime { get; set; }
    }
}
