using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    public class Employee_Schedult_Request_Dto
    {
        /// <summary>
        ///员工id
        /// </summary>
        public string? employeeID { get; set; }
        /// <summary>
        /// 部门id
        /// </summary>
        public string? departmentID { get; set; }
        /// <summary>
        /// 规则id
        /// </summary>
        public string? rulesID { get; set; }
        /// <summary>
        /// 排班日期
        /// </summary>
        public string? scheduleDate { get; set; }
        /// <summary>
        /// 班次id
        /// </summary>
        public string? shiftID { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string? remark { get; set; }
        /// <summary>
        /// 排班创建人
        /// </summary>
        public string? CreatorID { get; set; }
    }
}
