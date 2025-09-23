using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response.Pc
{
    public class Pc_Appointments_Response
    {
        /// <summary>
        /// 预约id
        /// </summary>
        public string? Id { get; set; }
        /// <summary>
        /// 预约人姓名
        /// </summary>
        public string? CustomerName { get; set; }
        /// <summary>
        /// 预约人电话号码
        /// </summary>
        public string? CustomerPhone { get; set; }
        /// <summary>
        /// 预约时间
        /// </summary>
        public string? AppointmentTime { get; set; }
        /// <summary>
        /// 套餐id
        /// </summary>
        public string? PP_ID { get; set; }
        /// <summary>
        /// 预约状态
        /// </summary>
        public int? Status { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string? Remark { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string? CreatedAt { get; set; }
        /// <summary>
        /// 员工id
        /// </summary>
        public string? AE_ID { get; set; }
    }
}
