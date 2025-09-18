using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request;
using Yuhetang.Infrastructure.Dto.Response;

namespace Yuhetang.Service.Interface
{
    [Provider_]
    public interface I_Sys_Service
    {
        /// <summary>
        /// 获取部门
        /// </summary>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Department();
        /// <summary>
        /// 新增部门
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Add_Department(Department_Request_Dto dto);
        /// <summary>
        /// 获取系统员工
        /// </summary>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Employees(int page = 1,int limit = 10);
        /// <summary>
        /// 新增系统员工
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Add_Employees(Employees_Request_Dto dto);
        /// <summary>
        /// 获取岗位
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Duty(int page = 1, int limit = 10);
        /// <summary>
        /// 新增岗位
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Add_Duty(Duty_Request_Dto dto);
        /// <summary>
        /// 新增班次
        /// </summary>
        /// <returns></returns>
        Task<Api_Response_Dto> Add_Shift(Shift_Request_Dto dto);
        /// <summary>
        /// 获取班次
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Shift(int page = 1, int limit = 10);
        /// <summary>
        /// 修改班次
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Upd_Shift(Shift_Request_Dto dto);
        /// <summary>
        /// 获取周期规则
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Schedule_Cycle(int page = 1, int limit = 10);
        /// <summary>
        /// 新增周期规则
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Add_Schedule_Cycle(Schedule_Cycle_Request_Dto dto);
        /// <summary>
        /// 新增周期
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Add_Period_Schedule(Period_Schedule_Request_Dto dto);
        /// <summary>
        /// 获取周期排班
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Period_Schedule(int page = 1, int limit = 10);
        /// <summary>
        /// 新增排班
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Add_Employee_Schedule(Employee_Schedult_Request_Dto dto);
        /// <summary>
        /// 获取排班
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Employee_Schedule(int page = 1, int limit = 10);
        /// <summary>
        /// 修改排班
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Upd_Employee_Schedule(Employee_Schedult_Request_Dto dto);
        /// <summary>
        /// 周期排班
        /// </summary>
        /// <param name="sp_id">周期id</param>
        /// <param name="sc_id">规则id</param>
        /// <param name="user_id">用户id</param>
        /// <returns></returns>
        Task<Api_Response_Dto> Set_Cycle_Schedule(string? sp_id, string? sc_id, string? user_id, string? id, string? remark);
        /// <summary>
        /// 导出排班word
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<byte[]> ExportToWordAsync(List<ScheduleItem_Response_Dto> dto);
        /// <summary>
        /// *新增排班
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Add_Schedule(Schedule_Request_Dto dto);
        /// <summary>
        /// 获取排班
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Get_Schedule();
        /// <summary>
        /// *修改排班
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Upd_Schedule(Schedule_Request_Dto dto);
        /// <summary>
        /// *删除排班
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task<Api_Response_Dto> Del_Schedule(string id);
    }
}
