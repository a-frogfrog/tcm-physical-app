using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    public class Employees_Request_Dto
    {
        public string account { get; set; }
        public string name { get; set; }
        /// <summary>
        /// 性别
        /// </summary>
        public int gender { get; set; }
        /// <summary>
        /// 手机号
        /// </summary>
        public string? phone { get; set; }
        /// <summary>
        /// 所属部门id
        /// </summary>
        public string? dept { get; set; }
        /// <summary>
        /// 岗位id
        /// </summary>
        public string? duty { get; set; }
        /// <summary>
        /// 状态：0-离职,1-在职
        /// </summary>
        public int status { get; set; }
    }
}
