using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request.Pc
{
    public class Pc_Appointment_Request_Dto:Base_Request
    {
        /// <summary>
        /// 预约人姓名
        /// </summary>
        public string? CustomerName { get; set; }

        /// <summary>
        /// 预约人联系电话
        /// </summary>
        public string? CustomerPhone { get; set; }

        /// <summary>
        /// 预约时间
        /// </summary>
        public string? AppointmentTime { get; set; }

        /// <summary>
        /// 预约套餐id
        /// </summary>
        public string? PP_ID { get; set; }

        /// <summary>
        /// 员工id
        /// </summary>
        public string? AE_ID { get; set; }

        /// <summary>
        /// 预约状态(0 待确认,1-已确认,2-已完成,3-已取消)
        /// </summary>
        public int Status { get; set; }

    }
}
