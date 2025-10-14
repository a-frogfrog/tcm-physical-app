using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request.Pc
{
    public class Pc_Employees_Request_Dto :Base_Request
    {
        /// <summary>
        /// 员工名称
        /// </summary>
        public string? name { get; set; }

        /// <summary>
        /// 员工账号
        /// </summary>
        public string? Account { get; set; }

        /// <summary>
        /// 员工联系电话
        /// </summary>
        public string? Phone { get; set; }

        /// <summary>
        /// 员工岗位
        /// </summary>
        public string? Duty { get; set; }

        /// <summary>
        /// 员工所属部门
        /// </summary>
        public string? Dept { get; set; }

        /// <summary>
        /// 员工状态
        /// </summary>
        public int? Status { get; set; }
    }
}
