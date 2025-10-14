using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request;
using Yuhetang.Infrastructure.Dto.Request.Pc;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.Dto.Response.Pc;

namespace Yuhetang.Service.Interface
{
    /// <summary>
    /// 预约管理
    /// </summary>
    [Provider_]
    public interface I_Appointments_Service
    {
        /// <summary>
        /// 新增预约
        /// </summary>
        /// <returns>新增的预约信息</returns>
        Task<Api_Response_Dto> Add_Appointment(Appointments_Request_Dto dto);
        /// <summary>
        /// 更新预约
        /// </summary>
        /// <returns>新增的预约信息</returns>
        Task<Api_Response_Dto> Upd_Appointment(Appointments_Request_Dto dto);
        /// <summary>
        /// 取消预约
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Cancel_Appointment(string id);
        /// <summary>
        /// 获取预约详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Appointment_Details(string id);
        /// <summary>
        /// 获取可预约日期
        /// </summary>
        /// <returns></returns>
        Api_Response_Dto GetAvailableDates();
        /// <summary>
        /// 获取某天可预约时间段
        /// </summary>
        /// <param name="date"></param>
        /// <param name="minutes"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> GetAvailableSlots(string date, double minutes);
        /// <summary>
        /// 获取用户预约
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_My_Appointment(int page, int limit, string? id);
        /// <summary>
        /// 获取预约
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Appointment(int page, int limit);
        /// <summary>
        /// 获取预约、订单总数量
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_My_Appointment_Order_Count(string? id);
    }
}
