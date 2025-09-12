using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    /// <summary>
    /// 部门
    /// </summary>
    public class Department_Request_Dto
    {
        /// <summary>
        /// 部门id
        /// </summary>
        public string? id { get; set; }
        /// <summary>
        /// 部门名称
        /// </summary>
        public string? name { get; set; }
        /// <summary>
        /// 部门经理员ID
        /// </summary>
        public string? manager { get; set; }
        /// <summary>
        /// 上级部门ID
        /// </summary>
        public string? parentID { get; set; }
        /// <summary>
        /// 状态:0-停用，1-启用
        /// </summary>
        public int? status { get; set; }
    }
}
