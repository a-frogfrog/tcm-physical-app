using Microsoft.EntityFrameworkCore;
using ServiceStack;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.EFCore.MySql;
using Yuhetang.Infrastructure.IOC;
using Yuhetang.Infrastructure.Tools;
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
        /// <summary>
        /// 新增预约
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Add_Appointment(Appointments_Request_Dto dto)
        {
            Appointment appointment = new Appointment();
            if (!string.IsNullOrEmpty(dto.ProductpackageId))
            {
                appointment = new Appointment()
                {
                    AId = Config.GUID2(),
                    AcId = dto.CustomerId,
                    AppId = dto.ProductpackageId,
                    BookingStartTime = DateTime.Parse(dto.BookingStartTime),
                    BookingEndTime = DateTime.Parse(dto.BookingEndTime),
                    BookingStatus = 0,
                    Remark = dto.Remark,
                    CreateTime = DateTime.Now
                };
            }
            else
            {
                appointment = new Appointment()
                {
                    AId = Config.GUID2(),
                    AcId = dto.CustomerId,
                    ApId = dto.ProductId,
                    BookingStartTime = DateTime.Parse(dto.BookingStartTime),
                    BookingEndTime = DateTime.Parse(dto.BookingEndTime),
                    BookingStatus = 0,
                    Remark = dto.Remark,
                    CreateTime = DateTime.Now
                };
            }
            _appointments_IOC._appointments.Add(appointment);
            await _appointments_IOC._appointments.SaveChangesAsync();

            return Result(1, "预约成功");

        }
    }
}
