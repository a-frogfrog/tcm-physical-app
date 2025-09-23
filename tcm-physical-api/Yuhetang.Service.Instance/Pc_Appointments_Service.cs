using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request.Pc;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.Dto.Response.Pc;
using Yuhetang.Infrastructure.EFCore.MySql;
using Yuhetang.Infrastructure.IOC;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.Instance
{
    [Inject_]
    public class Pc_Appointments_Service : Base_Service, I_Pc_Appointments_Service
    {
        private readonly Appointments_IOC _appointmentsIOC;
        private readonly Custom_IOC _customIOC;
        private readonly Product_IOC _productIOC;
        private readonly Employees_IOC _employeesIOC;
        private readonly Room_IOC _roomIOC;

        public Pc_Appointments_Service(
            Appointments_IOC appointmentsIOC,
            Custom_IOC customIOC,
            Product_IOC productIOC,
            Employees_IOC employeesIOC,
            Room_IOC roomIOC)
        {
            _appointmentsIOC = appointmentsIOC;
            _customIOC = customIOC;
            _productIOC = productIOC;
            _employeesIOC = employeesIOC;
            _roomIOC = roomIOC;
        }

        /// <summary>
        /// 新增预约
        /// </summary>
        public async Task<Pc_Appointments_Response> AddAppointmentAsync(Pc_Appointment_Request_Dto dto)
        {
            // 1. 验证输入参数
            ValidateDto(dto);

            // 2. 解析时间
            var startTime = DateTime.Parse(dto.BookingStartTime);
            var endTime = DateTime.Parse(dto.BookingEndTime);

            // 3. 验证关联数据
            var customer = ValidateAndGetCustomer(dto.CustomerId);
            var room = ValidateAndGetRoom(dto.RoomId);
            var employee = ValidateAndGetEmployee(dto.EmployeeId);
            var package = ValidateAndGetPackage(dto.PackageId);

            // 4. 检查房间预约冲突
            if (room != null)
            {
                CheckRoomConflict(room.RoomId, startTime, endTime);
            }

            // 5. 创建预约实体
            var appointment = new Appointment
            {
                AId = Guid.NewGuid().ToString("N"),
                AcId = dto.CustomerId,
                ArId = dto.RoomId,
                AeId = dto.EmployeeId,
                ApId = dto.PackageId,
                BookingStartTime = startTime,
                BookingEndTime = endTime,
                BookingStatus = 0, // 默认为待确认状态
                Remark = dto.Remark,
                CreateTime = DateTime.Now
            };

            // 6. 保存到数据库（通过Appointments_IOC）
            _appointmentsIOC._appointments_EFCore.Add(appointment);
            await _appointmentsIOC._appointments_EFCore.SaveChangesAsync();

            // 7. 构建响应
            return new Pc_Appointments_Response
            {
                id = appointment.AId,
                name = customer?.CName,
                RoomNumber = room?.RoomNumber,
                EmployeeName = employee?.EName,
                PackageName = package?.PName,
                BookingStartTime = appointment.BookingStartTime.ToString("yyyy-MM-dd HH:mm:ss"),
                BookingEndTime = appointment.BookingEndTime.ToString("yyyy-MM-dd HH:mm:ss"),
                BookingStatus = appointment.BookingStatus,
                CreateTime = appointment.CreateTime.Value.ToString("yyyy-MM-dd HH:mm:ss")
            };
        }

        /// <summary>
        /// 验证请求参数
        /// </summary>
        private void ValidateDto(Pc_Appointment_Request_Dto dto)
        {
            if (string.IsNullOrEmpty(dto.CustomerId))
                throw new ArgumentException("客户ID不能为空");

            if (string.IsNullOrEmpty(dto.BookingStartTime) || !DateTime.TryParse(dto.BookingStartTime, out _))
                throw new ArgumentException("预约开始时间格式不正确");

            if (string.IsNullOrEmpty(dto.BookingEndTime) || !DateTime.TryParse(dto.BookingEndTime, out _))
                throw new ArgumentException("预约结束时间格式不正确");

            var startTime = DateTime.Parse(dto.BookingStartTime);
            var endTime = DateTime.Parse(dto.BookingEndTime);

            if (startTime >= endTime)
                throw new ArgumentException("开始时间不能晚于或等于结束时间");

            if (startTime < DateTime.Now)
                throw new ArgumentException("开始时间不能早于当前时间");
        }

        /// <summary>
        /// 验证并获取客户信息（通过Custom_IOC）
        /// </summary>
        private Custom ValidateAndGetCustomer(string customerId)
        {
            // 第一个泛型参数是排序字段类型，第二个是排序表达式
            var customer = _customIOC._custom_EFCore.QueryAll(
                order: c => c.CId,
                where: c => c.CId == customerId
            ).FirstOrDefault();

            if (customer == null)
                throw new ArgumentException("客户不存在");
            return customer;
        }

        /// <summary>
        /// 验证并获取房间信息（通过Room_IOC）
        /// </summary>
        private Room ValidateAndGetRoom(long? roomId)
        {
            if (!roomId.HasValue) return null;

            var room = _roomIOC._rooms_EFCore.QueryAll(
                order: r => r.RoomId,
                where: r => r.RoomId == roomId.Value
            ).FirstOrDefault();

            if (room == null)
                throw new ArgumentException("房间不存在");
            if (room.RoomStatus != 0)
                throw new ArgumentException("房间不可用");
            return room;
        }

        /// <summary>
        /// 验证并获取员工信息（通过Employees_IOC）
        /// </summary>
        private SysEmployee ValidateAndGetEmployee(string employeeId)
        {
            if (string.IsNullOrEmpty(employeeId)) return null;

            var employee = _employeesIOC._sys_Employees_EFCore.QueryAll(e => e.EId == employeeId).FirstOrDefault();
            if (employee == null)
                throw new ArgumentException("员工不存在");

            if (employee.EStatus != 1) // 假设1表示在职状态
                throw new ArgumentException("员工非在职状态");

            return employee;
        }

        /// <summary>
        /// 验证并获取套餐信息（通过Product_IOC）
        /// </summary>
        private Product ValidateAndGetPackage(string packageId)
        {
            if (string.IsNullOrEmpty(packageId)) return null;

            var package = _productIOC._product_EFCore.QueryAll(p => p.PId == packageId).FirstOrDefault();
            if (package == null)
                throw new ArgumentException("套餐不存在");

            if (package.PStatus != 1) // 假设1表示上架状态
                throw new ArgumentException("套餐已下架");

            return package;
        }

        /// <summary>
        /// 检查房间预约冲突（通过Appointments_IOC）
        /// </summary>
        private void CheckRoomConflict(long roomId, DateTime startTime, DateTime endTime)
        {
            // 查询同一房间在时间范围内的有效预约
            var hasConflict = _appointmentsIOC._appointments_EFCore.QueryAll(a =>
                a.ArId == roomId &&
                a.BookingStatus != 2 && // 排除已取消的预约
                !(a.BookingEndTime <= startTime || a.BookingStartTime >= endTime)
            ).Any();

            if (hasConflict)
                throw new ArgumentException("该房间在所选时段已被预约");
        }
    }
}