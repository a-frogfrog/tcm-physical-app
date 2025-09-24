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
        private readonly Product_Package_IOC _product_Package_IOC;

        public Pc_Appointments_Service(
            Appointments_IOC appointmentsIOC,
            Custom_IOC customIOC,
            Product_IOC productIOC,
            Employees_IOC employeesIOC,
            Room_IOC roomIOC,
            Product_Package_IOC product_Package_IOC)
        {
            _appointmentsIOC = appointmentsIOC;
            _customIOC = customIOC;
            _productIOC = productIOC;
            _employeesIOC = employeesIOC;
            _roomIOC = roomIOC;
            _product_Package_IOC = product_Package_IOC;
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
            var Productpackage = ValidateAndGetProductpackage(dto.ProductpackageId);
            var Product = ValidateAndGetProduct(dto.ProductId);
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
                ApId = dto.ProductId,
                AppId = dto.ProductpackageId,
                BookingStartTime = startTime,
                BookingEndTime = endTime,
                BookingStatus = 0, // 默认为待确认状态
                Remark = dto.Remark,
                CreateTime = DateTime.Now
            };

            // 6. 保存到数据库（通过Appointments_IOC）
            _appointmentsIOC._appointments.Add(appointment);
            await _appointmentsIOC._appointments.SaveChangesAsync();

            // 7. 构建响应
            return MapToResponse(appointment, customer, room, employee, Product, Productpackage);
        }



        /// <summary>
        /// 将预约实体和关联数据映射为响应对象
        /// </summary>
        private Pc_Appointments_Response MapToResponse(
            Appointment appointment,
            Custom customer,
            Room room,
            SysEmployee employee,
            Product product,
            ProductPackage productPackage)
        {
            return new Pc_Appointments_Response
            {
                id = appointment.AId,
                CustomsName = customer?.CName,
                CustomsPhone = customer?.CPhone,
                CustomerId = appointment.AcId,
                RoomNumber = room?.RoomNumber,
                RoomName = room?.RoomName,
                RoomId = appointment.ArId,
                EmployeeName = employee?.EName,
                EmployeeId = appointment.AeId,
                ProductName = product?.PName,
                ProductId = appointment.ApId,
                ProductpackageName = productPackage?.PpName,
                ProductpackageId = appointment.AppId,
                BookingStartTime = appointment.BookingStartTime?.ToString("yyyy-MM-dd HH:mm:ss"),
                BookingEndTime = appointment.BookingEndTime?.ToString("yyyy-MM-dd HH:mm:ss"),
                BookingStatus = appointment.BookingStatus,
                Remark = appointment.Remark,
                CreateTime = appointment.CreateTime?.ToString("yyyy-MM-dd HH:mm:ss"),
            };
        }

        /// <summary>
        /// 将预约状态数字转换为对应的状态名称
        /// </summary>
        private string GetBookingStatusName(int status)
        {
            return status switch
            {
                0 => "待确认",
                1 => "已确认",
                2 => "已取消",
                3 => "已完成",
                _ => "未知状态"
            };
        }

        /// <summary>
        /// 获取预约详情（包含所有关联信息）
        /// </summary>
        private async Task<Pc_Appointments_Response> GetAppointmentDetailsAsync(Appointment appointment)
        {
            // 并行获取关联数据，提高性能
            var customerTask = Task.Run(() =>
                string.IsNullOrEmpty(appointment.AcId)
                    ? null
                    : _customIOC._custom_EFCore.QueryAll(c => c.CId == appointment.AcId).FirstOrDefault()
            );

            var roomTask = Task.Run(() =>
                appointment.ArId.HasValue
                    ? _roomIOC._rooms_EFCore.QueryAll(r => r.RoomId == appointment.ArId.Value).FirstOrDefault()
                    : null
            );

            var employeeTask = Task.Run(() =>
                string.IsNullOrEmpty(appointment.AeId)
                    ? null
                    : _employeesIOC._sys_Employees_EFCore.QueryAll(e => e.EId == appointment.AeId).FirstOrDefault()
            );

            var productTask = Task.Run(() =>
                string.IsNullOrEmpty(appointment.ApId)
                    ? null
                    : _productIOC._product_EFCore.QueryAll(p => p.PId == appointment.ApId).FirstOrDefault()
            );

            var productPackageTask = Task.Run(() =>
                string.IsNullOrEmpty(appointment.AppId)
                    ? null
                    : _product_Package_IOC._product_Package_EFCore.QueryAll(pp => pp.PpId == appointment.AppId).FirstOrDefault()
            );

            // 等待所有任务完成
            await Task.WhenAll(customerTask, roomTask, employeeTask, productTask, productPackageTask);

            // 映射为响应对象
            return MapToResponse(
                appointment,
                customerTask.Result,
                roomTask.Result,
                employeeTask.Result,
                productTask.Result,
                productPackageTask.Result
            );
        }

        /// <summary>
        /// 验证并获取产品信息（新增）
        /// </summary>
        private Product ValidateAndGetProduct(string productId)
        {
            if (string.IsNullOrEmpty(productId))
                return null;

            var product = _productIOC._product_EFCore.QueryAll(p => p.PId == productId).FirstOrDefault();
            if (product == null)
                throw new ArgumentException("产品不存在");

            if (product.PStatus != 1)
                throw new ArgumentException("产品已下架");

            return product;
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
            if (!roomId.HasValue)
                return null;

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
            if (string.IsNullOrEmpty(employeeId))
                return null;

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
        private ProductPackage ValidateAndGetProductpackage(string ProductpackageId)
        {
            if (string.IsNullOrEmpty(ProductpackageId))
                return null;

            var Productpackage = _product_Package_IOC._product_Package_EFCore.QueryAll(p => p.PpId == ProductpackageId).FirstOrDefault();
            if (Productpackage == null)
                throw new ArgumentException("套餐不存在");

            if (Productpackage.PpStatus != 1) // 假设1表示上架状态
                throw new ArgumentException("套餐已下架");

            return Productpackage;
        }

        /// <summary>
        /// 检查房间预约冲突（通过Appointments_IOC）
        /// </summary>
        private void CheckRoomConflict(long roomId, DateTime startTime, DateTime endTime)
        {
            // 查询同一房间在时间范围内的有效预约
            var hasConflict = _appointmentsIOC._appointments.QueryAll(a =>
                a.ArId == roomId &&
                a.BookingStatus != 2 && // 排除已取消的预约 
                !(a.BookingEndTime <= startTime || a.BookingStartTime >= endTime)
            ).Any();

            if (hasConflict)
                throw new ArgumentException("该房间在所选时段已被预约");
        }

        /// <summary>
        /// 获取所有预约
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public async Task<List<Pc_Appointments_Response>> Get_Appointments()
        {
            // 查询所有预约，按创建时间倒序排列
            var appointments = await _appointmentsIOC._appointments
                .QueryAll()
                .OrderByDescending(a => a.CreateTime)
                .ToListAsync();

            var results = new List<Pc_Appointments_Response>();

            // 为每条预约补充关联数据
            foreach (var appointment in appointments)
            {
                results.Add(await GetAppointmentDetailsAsync(appointment));
            }

            return results;
        }
    }
}