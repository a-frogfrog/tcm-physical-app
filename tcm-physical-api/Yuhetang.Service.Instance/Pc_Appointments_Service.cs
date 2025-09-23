using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request.Pc;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.Dto.Response.Pc;
using Yuhetang.Infrastructure.IOC;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.Instance
{
    [Inject_]
    public class Pc_Appointments_Service : Base_Service, I_Pc_Appointments_Service
    {
        private readonly Appointments_IOC _appointments_IOC;

        public Pc_Appointments_Service(Appointments_IOC appointments_IOC)
        {
            _appointments_IOC = appointments_IOC;
        }

        /// <summary>
        /// 获取所有预约
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Get_Appointment(Pc_Appointment_Request_Dto dto)
        {
            var data = await _appointments_IOC._appointments_EFCore.QueryAll(out int total,
            Convert.ToInt32(dto.page), Convert.ToInt32(dto.limit), false, o => o.CreatedAt)
            .Select(d => new Pc_Appointments_Response()
            {
                Id = d.Id,
                AE_ID = d.AeId,
                PP_ID = d.PpId,
                CustomerName = d.CustomerName,
                CustomerPhone = d.CustomerPhone,
                AppointmentTime = d.AppointmentTime!.Value.ToString("yyyy-MM-dd HH:mm:ss"),
                CreatedAt = d.CreatedAt!.Value.ToString("yyyy-MM-dd HH:mm:ss"),
                Remark = d.Remark,
                Status = d.Status,
            }).ToListAsync();
            return Result(1, "ok", new
            {
                total,
                data
            });
        }
    }
}
