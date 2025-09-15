using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Yuhetang.Infrastructure.Dto.Request;
using Yuhetang.Service.EFCore;
using Yuhetang.Service.Interface;

namespace Yuhetang.Admin.Controllers
{
    /// <summary>
    /// 系统管理
    /// </summary>
    public class SysController : BaseController
    {
        private readonly I_Sys_Service _sys_Service;
        private readonly I_Logins_Service _logins_Service;

        public SysController(I_Sys_Service sys_Service,I_Logins_Service logins_Service) : base(logins_Service)
        {
            _sys_Service = sys_Service;
            _logins_Service = logins_Service;
        }
        /// <summary>
        /// 获取部门
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Department()
        {
            var result = await _sys_Service.Get_Department();

            return Ok(result);
        }
        /// <summary>
        /// 新增部门
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add_Department(Department_Request_Dto dto)
        {
            var result = await _sys_Service.Add_Department(dto);

            return Ok(result);
        }
        /// <summary>
        /// 获取系统员工列表
        /// </summary>
        /// <returns></returns>p.
        /// 
        [HttpGet]
        public async Task<IActionResult> Get_Employees(int page = 1,int limit = 10)
        {
            var result = await _sys_Service.Get_Employees(page, limit);

            return Ok(result);
        }
        /// <summary>
        /// 新增系统员工
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add_Employees(Employees_Request_Dto dto)
        {
            var result = await _sys_Service.Add_Employees(dto);

            return Ok(result);
        }
        /// <summary>
        /// 获取岗位
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Duty(int page=1,int limit = 10)
        {
            var reslt = await _sys_Service.Get_Duty(page,limit);

            return Ok(reslt);
        }
        /// <summary>
        /// 新增岗位
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add_Duty(Duty_Request_Dto dto)
        {
            var result = await _sys_Service.Add_Duty(dto);

            return Ok(result);
        }
        /// <summary>
        /// 获取班次
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Shift(int page = 1, int limit = 10)
        {
            var reslt = await _sys_Service.Get_Shift(page, limit);

            return Ok(reslt);
        }
        /// <summary>
        /// 新增班次
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add_Shift(Shift_Request_Dto dto)
        {
            var result = await _sys_Service.Add_Shift(dto);

            return Ok(result);
        }
        /// <summary>
        /// 修改班次
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Upd_Shift(Shift_Request_Dto dto)
        {
            var result = await _sys_Service.Upd_Shift(dto);

            return Ok(result);
        }
        /// <summary>
        /// 获取周期规则
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Schedule_Cycle(int page = 1, int limit = 10)
        {
            var reslt = await _sys_Service.Get_Schedule_Cycle(page, limit);

            return Ok(reslt);
        }
        /// <summary>
        /// 新增周期规则
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add_Schedule_Cycle(Schedule_Cycle_Request_Dto dto)
        {
            var result = await _sys_Service.Add_Schedule_Cycle(dto);

            return Ok(result);
        }

        /// <summary>
        /// 新增周期
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add_Period_Schedule(Period_Schedule_Request_Dto dto)
        {
            var result = await _sys_Service.Add_Period_Schedule(dto);

            return Ok(result);
        }

        /// <summary>
        /// 获取周期排班
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Period_Schedule(int page = 1, int limit = 10)
        {
            var reslt = await _sys_Service.Get_Period_Schedule(page, limit);

            return Ok(reslt);
        }

        /// <summary>
        /// 新增排班
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add_Employee_Schedule(Employee_Schedult_Request_Dto dto)
        {
            var user = this.Get_Current_User();
            dto.CreatorID = user.id;
            var result = await _sys_Service.Add_Employee_Schedule(dto);

            return Ok(result);
        }

        /// <summary>
        /// 获取排班
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Employee_Schedule(int page = 1, int limit = 10)
        {
            var reslt = await _sys_Service.Get_Employee_Schedule(page, limit);

            return Ok(reslt);
        }
    }
}
