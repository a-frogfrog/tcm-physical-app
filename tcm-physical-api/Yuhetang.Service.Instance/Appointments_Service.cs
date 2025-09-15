using Microsoft.EntityFrameworkCore;
using ServiceStack;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.IOC;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.Instance
{
    [Inject_]
    public class Appointments_Service : Base_Service, I_Appointments_Service
    {
        private readonly Appointments_IOC _appointments_IOC;

        public Appointments_Service(Appointments_IOC appointments_IOC)
        {
            _appointments_IOC = appointments_IOC;
        }

        public Task<Api_Response_Dto> Add_Appointments()
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 获取预约列表(没写完)
        /// </summary>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Get_Appointments(int page, int limit, string? key)
        {
            var appointments = await _appointments_IOC._appointments.QueryAll(out int total, page, limit, false, 
                o => o.ACreateTime)
                .Select(d=>new Appointments_Response
                {
                    id = d.AId,
                    customerID = d.ACustomerId,
                    doctorID = d.ADoctorId,
                    type = d.AItemType,
                    itemID = d.AItemId,
                    appointDate = d.AAppointDate.ToString(),
                    startTime = d.AStartTime.ToString(),
                    endTime = d.AEndTime.ToString(),
                    status = d.AStatus,
                    source = d.ASource,
                    createTime = d.ACreateTime!.Value.ToString("yyyy-MM-dd HH:mm:ss"),
                    updateTime = d.AUpdateTime!.Value.ToString("yyyy-MM-dd HH:mm:ss"),
                })
                .ToListAsync();
            if (appointments == null)
            {
                return Result(0, "没有数据");
            }

            return Result(1, "ok",appointments);
        }
    }
}
