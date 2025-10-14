using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response.Pc
{
    public class Pc_Employees_Response_Dto
    {
        /// <summary>
        /// 员工id
        /// </summary>
        public string? id { get; set; }
        /// <summary>
        /// 账号
        /// </summary>
        public string? account { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
        public string? name { get; set; }
        /// <summary>
        /// 性别
        /// </summary>
        public string? gender { get; set; }
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
        /// 状态：0-离职,1-在职，2-在忙
        /// </summary>
        public int? status { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string? CreateTime { get; set; }
    }
}
