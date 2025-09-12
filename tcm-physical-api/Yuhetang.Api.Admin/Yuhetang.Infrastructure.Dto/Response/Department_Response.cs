using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response
{
    public class Department_Response
    {
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
        /// 状态
        /// </summary>
        public int? status { get; set; }
        public string? time { get; set; }
        public List<Department_Response> children { get; set; }
    }
}
