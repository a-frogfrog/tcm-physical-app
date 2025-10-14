using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
using ServiceStack;
using System.IO.Packaging;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.EFCore.MySql;
using Yuhetang.Infrastructure.IOC;
using Yuhetang.Insfrastructure.Tools;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.Instance
{
    [Inject_]
    public class Appointments_Service : Base_Service, I_Appointments_Service
    {
        private readonly Appointments_IOC _appointments_IOC;
        private readonly Sys_IOC _sys_IOC;
        private readonly Product_Package_IOC _product_Package_IOC;
        private readonly Orders_IOC _orders_IOC;

        public Appointments_Service(Appointments_IOC appointments_IOC,Sys_IOC sys_IOC,Product_Package_IOC product_Package_IOC,Orders_IOC orders_IOC)
        {
            _appointments_IOC = appointments_IOC;
            _sys_IOC = sys_IOC;
            _product_Package_IOC = product_Package_IOC;
            _orders_IOC = orders_IOC;
        }
        /// <summary>
        /// 新增预约
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Add_Appointment(Appointments_Request_Dto dto)
        {

            // 获取当前时间
            var now = DateTime.Now;

            if (now > DateTime.Parse(dto.BookingStartTime))
            {
                return Result(0, "请选择有效的时间");
            }

            var startTime = DateTime.Parse(dto.BookingStartTime);
            var endTime = DateTime.Parse(dto.BookingEndTime);

            // 检查同一用户的时间冲突
            var userConflict = await _appointments_IOC._appointments
                .QueryAll(d => d.AcId == dto.CustomerId &&
                              d.BookingStatus != 0 || d.BookingStatus != 1 
                              && d.BookingStartTime < endTime
                            && d.BookingEndTime > startTime).CountAsync();

            if (userConflict > 1)
            {
                return Result(0, "您在该时间段已有其他预约");
            }

            // 统计理疗师人数
            var capacity = await _sys_IOC._sys_Employees_EFCore
                .QueryAll(d => d.EDuty == "DUTY005")
                .CountAsync();

            if (userConflict >= capacity)
            {
                return Result(0, "该时间段预约已满，请选择其他时间");
            }

            string bookingTime = dto.BookingStartTime;
            if (DateTime.TryParse(bookingTime, out DateTime date))
            {
                bookingTime = date.ToString("MM-dd"); 
            }
           


            //新增预约
            Appointment appointment = new Appointment
            {
                AId = RandomNumber.GeneraAppointmentNumber(),
                AcId = dto.CustomerId,
                BookingStartTime = DateTime.Parse(dto.BookingStartTime),
                BookingEndTime = DateTime.Parse(dto.BookingEndTime),
                BookingStatus = 0,
                Remark = dto.Remark,
                CreateTime = DateTime.Now,
            };

            if (string.IsNullOrEmpty(dto.ServiceId))
            {
                appointment.AppId = dto.ProductpackageId;
            }
            else
            {
                appointment.AsId = dto.ServiceId;
            }

            _appointments_IOC._appointments.Add(appointment);
            await _appointments_IOC._appointments.SaveChangesAsync();

            return Result(1, "预约成功");
        }



       
        /// <summary>
        /// 获取可预约日期（含星期）
        /// </summary>
        public Api_Response_Dto GetAvailableDates()
        {
            var today = DateTime.Today;

            var dates = Enumerable.Range(0, 7)
                .Select(i => {
                    var date = today.AddDays(i);
                    return new
                    {
                        Date = date.ToString("yyyy-MM-dd"),
                        Mooth = date.ToString("MM"),
                        Day = date.ToString("dd"),
                        DayOfWeek = GetChineseDayOfWeek(date.DayOfWeek) // 星期几
                    };
                })
                .ToList();

            return Result(1, "ok", dates);
        }

        /// <summary>
        /// 将 DayOfWeek 转为中文星期
        /// </summary>
        private string GetChineseDayOfWeek(DayOfWeek dayOfWeek)
        {
            return dayOfWeek switch
            {
                DayOfWeek.Sunday => "周日",
                DayOfWeek.Monday => "周一",
                DayOfWeek.Tuesday => "周二",
                DayOfWeek.Wednesday => "周三",
                DayOfWeek.Thursday => "周四",
                DayOfWeek.Friday => "周五",
                DayOfWeek.Saturday => "周六",
                _ => ""
            };
        }

        /// <summary>
        /// 获取某天可预约时间段
        /// </summary>
        /// <param name="date"></param>
        /// <param name="serviceId"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> GetAvailableSlots(string date, double minutes)
        {
            // 1. 定义营业时间
            var targetDate = DateTime.Parse(date).Date;
            var workStart = targetDate.AddHours(9);   // 09:00
            var workEnd = targetDate.AddHours(22);    // 22:00

            // 2. 获取当前时间
            var now = DateTime.Now;

            if (now > targetDate)
            {
                return Result(0, "请选择有效的时间");
            }

            // 3. 查询当天已有预约（只取必要字段）
            var dayStart = targetDate;
            var dayEnd = targetDate.AddDays(1);

            var existingAppointments = await _appointments_IOC._appointments
                .QueryAll(d => d.BookingStatus == 0 || d.BookingStatus == 1 // 排除已取消、已完成
                            && d.BookingStartTime < dayEnd
                            && d.BookingEndTime > dayStart)
                .Select(a => new { a.BookingStartTime, a.BookingEndTime })
                .ToListAsync();

            // 4. 生成时间段（按项目时长 minutes）
            var slots = new List<object>();
            var slot = workStart;

            while (slot < workEnd)
            {
                var end = slot.AddMinutes(minutes);

                int isBan = 0; // 默认可用

                // 判断时间段是否已过期
                if (targetDate == now.Date && end <= now)
                {
                    isBan = 1; // 1=已过期 
                }
                else
                {
                    // 计算该时间段的重叠预约数
                    var overlapCount = existingAppointments.Count(a =>
                        a.BookingStartTime < end && a.BookingEndTime > slot);
                    var capacityer = _sys_IOC._sys_Employees_EFCore.QueryAll(d => d.EDuty == "DUTY005").Count();
                    if (overlapCount >= capacityer)
                    {
                        isBan = 2; // 2=已约满
                    }
                }

                slots.Add(new
                {
                    Start = slot.ToString("HH:mm"),
                    End = end.ToString("HH:mm"),
                    IsBan = isBan   // 0=可用, 1=已过期, 2=已约满
                });

                slot = end.AddMinutes(15);
            }

            // 5. 返回所有时间段
            return Result(1, "ok", slots);
        }
        /// <summary>
        /// 获取用户预约列表
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Get_My_Appointment(int page, int limit, string? id)
        {
            var iq = await _appointments_IOC._appointments.QueryAll(out int total,page,limit,false,o=>o.CreateTime).ToListAsync();
            var data = iq.Where(d=>d.AcId == id);
            if (data == null)
            {
                return Result(1,"还没有预约服务哦!");
            }

            return Result(1, "ok", new
            {
                data,
                total
            });
        }
        /// <summary>
        /// 更新预约
        /// </summary>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Upd_Appointment(Appointments_Request_Dto dto)
        {
            var iq = await _appointments_IOC._appointments.QueryAll(d => d.AId == dto.id).SingleOrDefaultAsync();
            if(iq == null)
            {
                return Result(0, "预约不存在");
            }
            iq.AppId = dto.id;
            iq.AsId = dto.id;
            iq.BookingStartTime = DateTime.Parse(dto.BookingStartTime);
            iq.BookingEndTime = DateTime.Parse(dto.BookingEndTime);
            iq.BookingStatus = dto.status;
            iq.Remark = dto.Remark;

            _appointments_IOC._appointments.Update(iq);
            await _appointments_IOC._appointments.SaveChangesAsync();

            return Result(1, "修改成功");
        }
        /// <summary>
        /// 取消预约
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Cancel_Appointment(string id)
        {
            var iq = await _appointments_IOC._appointments.QueryAll(d => d.AId == id).SingleOrDefaultAsync();
            if (iq == null)
            {
                return Result(0, "预约不存在");
            }
            iq.BookingStatus = 2;

            _appointments_IOC._appointments.Update(iq);
            await _appointments_IOC._appointments.SaveChangesAsync();

            return Result(1, "取消成功");
        }
        /// <summary>
        /// 获取预约详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Get_Appointment_Details(string id)
        {
            var iq = await _appointments_IOC._appointments.QueryAll(d => d.AId == id).SingleOrDefaultAsync();
            if (iq == null)
            {
                return Result(0, "预约不存在");
            }
            var data = new Appointments_Response_Dto
            {
                id = iq.AId,
                startTime = iq.BookingStartTime!.Value.ToString("yyyy-MM-dd HH:mm:ss"),
                endTime = iq.BookingEndTime!.Value.ToString("yyyy-MM-dd HH:mm:ss"),
                status = iq.BookingStatus,
            };
            //获取服务
            if (!string.IsNullOrEmpty(iq.AsId))
            {
                var service = await _product_Package_IOC._serviceTo_EFCore.QueryAll(d=>d.SId == iq.AsId).SingleOrDefaultAsync();
                if (service != null)
                {
                    data.serviceName = service.SName;
                    data.price = service.SPrice;
                    data.cover = service.SCover;
                    data.duration = service.SDuration;
                }
            }
            //获取套餐
            else if (!string.IsNullOrEmpty(iq.AppId))
            {
                var package = await _product_Package_IOC._product_Package_EFCore.QueryAll(d => d.PpId == iq.AppId).SingleOrDefaultAsync();
                if (package != null)
                {
                    data.serviceName = package.PpName;
                    data.price = package.PpPrice * package.PpCommissionRate;
                }
            }

            return Result(1, "ok",data);
        }
        /// <summary>
        /// 获取全部预约
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Get_Appointment(int page, int limit)
        {
            var iq = await _appointments_IOC._appointments.QueryAll(out int total, page, limit, false, o => o.CreateTime).ToListAsync();
            return Result(1, "ok", iq);
        }
        /// <summary>
        /// 获取预约订单总数量
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Get_My_Appointment_Order_Count(string? id)
        {
            var appointmentCount = await _appointments_IOC._appointments.QueryAll(d=>d.AcId == id).CountAsync();
            var orderCount = await _orders_IOC._order_EFCore.QueryAll(d => d.OcId == id).CountAsync();

            return Result(1, "ok", new
            {
                appointmentCount,
                orderCount
            });
        }
    }
}
