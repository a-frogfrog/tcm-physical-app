using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response
{
    public class Employee_Schedule_Response_Dto
    {
        public string id { get; set; }
        /// <summary>
        /// 员工id
        /// </summary>
        public string? employeeID { get; set; }
        /// <summary>
        /// 员工名称
        /// </summary>
        public string? employeeName { get; set; }
        /// <summary>
        /// 部门id
        /// </summary>
        public string? departmentID { get; set; }
        /// <summary>
        /// 部门名称
        /// </summary>
        public string? departmentName { get; set; }
        /// <summary>
        /// 规则id
        /// </summary>
        public string? rulesID { get; set; }
        /// <summary>
        /// 规则名称
        /// </summary>
        public string? rulesName { get; set; }
        /// <summary>
        /// 排班日期
        /// </summary>
        public string? scheduleDate { get; set; }
        /// <summary>
        /// 班次id
        /// </summary>
        public string? shiftID { get; set; }
        /// <summary>
        /// 班次名称
        /// </summary>
        public string? shiftName { get; set; }
        /// <summary>
        /// 开始时间
        /// </summary>
        public string? startTime { get; set; }
        /// <summary>
        /// 结束时间
        /// </summary>
        public string? endTime { get; set; }
        /// <summary>
        /// 午休开始
        /// </summary>
        public string? breakStart { get; set; }
        /// <summary>
        /// 午休结束
        /// </summary>
        public string? breakEnd { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string? remark { get; set; }
        /// <summary>
        /// 排班创建人
        /// </summary>
        public string? creater { get; set; }
        /// <summary>
        /// 排班创建人ID
        /// </summary>
        public string? createID { get; set; }
        public string? time { get; set; }

    }
}
