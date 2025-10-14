using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request.Pc;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.Dto.Response.Pc;

namespace Yuhetang.Service.Interface
{
    [Provider_]
    /// <summary>
    /// Pc端预约管理
    /// </summary>
    public interface I_Pc_Appointments_Service
    {
        /// <summary>
        /// 修改预约状态
        /// </summary>
        /// <param name="dto">状态修改请求参数</param>
        /// <returns>状态修改结果</returns>
        Task<Api_Response_Dto> UpdateAppointmentStatusAsync(Pc_UpdateAppointmentStatus_Request_Dto dto);
        /// <summary>
        /// 预约转订单
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> ConvertAppointmentToOrderAsync(Pc_AppointmentToOrder_Request_Dto dto);
        /// <summary>
        /// 新增预约
        /// </summary>
        /// <param name="requestDto">预约请求数据</param>
        /// <returns>新增的预约信息</returns>
        Task<Pc_Appointments_Response> AddAppointmentAsync(Pc_Appointment_Request_Dto dto);

        /// <summary>
        /// 获取所有预约
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Appointments(Pc_Appointment_Request_Dto dto);

        /// <summary>
        /// 获取所有房间
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Rooms(Pc_Rooms_Request_Dto dto);

        /// <summary>
        /// 获取所有员工
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_employees(Pc_Employees_Request_Dto dto);


        /// <summary>
        /// 获取所有套餐
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_productpackage(Pc_Product_package_Request_Dto dto);

        /// <summary>
        /// 获取所有服务
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_services(Pc_Service_Request_Dto dto);

    }
}
