using Microsoft.EntityFrameworkCore;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
    public class Sys_Service : Base_Service, I_Sys_Service
    {
        private readonly Sys_IOC _sys_IOC;

        public Sys_Service(Sys_IOC sys_IOC)
        {
            _sys_IOC = sys_IOC;
        }
        /// <summary>
        /// 新增部门
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Add_Department(Department_Request_Dto dto)
        {
            SysDepartment sysDepartment = new SysDepartment()
            {
                DId = Config.GUID2(),

                DName = dto.name!,
                DManager = dto.manager,
                DParentId = dto.parentID,
                DStatus = dto.status,

                DCreateTime = DateTime.Now
            };

            _sys_IOC._sys_Department_EFCore.Add(sysDepartment);
            var result = await _sys_IOC._sys_Department_EFCore.SaveChangesAsync();

            return Result(1,"新增成功!");
        }
        /// <summary>
        /// 新增岗位
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Add_Duty(Duty_Request_Dto dto)
        {
            try
            {
                SysDuty sysDuty = new SysDuty()
                {
                    DId = Config.GUID2(),
                    DName = dto.name,
                    DDescription = dto.desc,
                    DCreateTime = DateTime.Now
                };

                _sys_IOC._sys_Duty_EFCore.Add(sysDuty);
                await _sys_IOC._sys_Duty_EFCore.SaveChangesAsync();

                return Result(1, "新增成功");
            }
            catch
            {
                return Result(0, "新增失败");
            }
        }

        /// <summary>
        /// 新增系统员工
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Add_Employees(Employees_Request_Dto dto)
        {
            try
            {
                SysEmployee sysEmployee = new SysEmployee()
                {
                    EId = Config.GUID2(),
                    EAccount = dto.account,
                    EName = dto.name,
                    EGender = dto.gender,
                    EPhone = dto.phone,
                    EDept = dto.dept,
                    EDuty = dto.duty,
                    EStatus = dto.status,
                    ECreateTime = DateTime.Now
                };

                _sys_IOC._sys_Employees_EFCore.Add(sysEmployee);
                await _sys_IOC._sys_Employees_EFCore.SaveChangesAsync();

                return Result(1, "新增成功");
            }
            catch
            {
                return Result(0, "新增失败");
            }


        }
        /// <summary>
        /// 新增班次
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Add_Shift(Shift_Request_Dto dto)
        {
            SysShift sysShift = new SysShift()
            {
                SId = Config.GUID2(),
                SName = dto.name,
                SStartTime = dto.startTime == "" ? null : TimeOnly.Parse(dto.startTime),
                SEndTime = dto.endTime == "" ? null : TimeOnly.Parse(dto.endTime),
                SBreakStart = dto.breakEnd == "" ? null : TimeOnly.Parse(dto.breakStart),
                SBreakEnd = dto.breakEnd == ""? null :TimeOnly.Parse(dto.breakEnd),
                SStatus = dto.status,
                SCreateTime = DateTime.Now
            };

            _sys_IOC._sys_Shift_EFCore.Add(sysShift);
            await _sys_IOC._sys_Shift_EFCore.SaveChangesAsync();

            return Result(1,"新增成功");
        }

        /// <summary>
        /// 获取部门
        /// </summary>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Get_Department()
        {
            var list = await _sys_IOC._sys_Department_EFCore.QueryAll()
                .Select(d=>new Department_Response
                {
                    id = d.DId,
                    name = d.DName,
                    manager = d.DManager,
                    parentID = d.DParentId,
                    status = d.DStatus,
                    time = d.DCreateTime!.ToString()
                })
                .OrderBy(o=>o.time)
                .ToListAsync();

            var parent = list.Where(d => d.parentID == null || d.parentID == "").OrderBy(o => o.time).ToList();
            List<Department_Response> data = new List<Department_Response>();
            parent.ForEach(d =>
            {
                data.Add(new Department_Response
                {
                    id = d.id,
                    name = d.name,
                    manager = d.manager,
                    parentID = d.parentID,
                    status = d.status,
                    time = d.time,
                    children = Get_Department_Children(d.id,list)
                });
            });

            return Result(1, "ok", data);
        }
        /// <summary>
        /// 获取岗位
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Get_Duty(int page = 1, int limit = 10)
        {
            var data = await _sys_IOC._sys_Duty_EFCore.QueryAll(out int total,page,limit,false,o=>o.DCreateTime)
                .Select(d => new
                {
                    id = d.DId,
                    name = d.DName,
                    description = d.DDescription,
                    status = d.DStatus == 0 ? "停用":"启用",
                    time = d.DCreateTime.Value.ToString("yyyy-MM-dd HH:mm:ss")
                })
                .ToListAsync();

            return Result(1, "ok", new
            {
                data,
                total
            });
        }

        /// <summary>
        /// 获取员工
        /// </summary>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Get_Employees(int page, int limit)
        {
            try
            {
                var iq = _sys_IOC._sys_Employees_EFCore
                    .QueryAll(out int total, page, limit, false, o => o.ECreateTime);

                // 获取去重后的部门ID和岗位ID
                var deptIds = await iq.Select(d => d.EDept).Distinct().ToListAsync();
                var dutyIds = await iq.Select(d => d.EDuty).Distinct().ToListAsync();

                // 一次性获取所有相关的部门和岗位
                var depts = await _sys_IOC._sys_Department_EFCore
                    .QueryAll(d => deptIds.Contains(d.DId))
                    .ToDictionaryAsync(d => d.DId, d => d.DName);

                var duties = await _sys_IOC._sys_Duty_EFCore
                    .QueryAll(d => dutyIds.Contains(d.DId))
                    .ToDictionaryAsync(d => d.DId, d => d.DName);

                var data = await iq.Select(d => new
                {
                    id = d.EId,
                    account = d.EAccount,
                    name = d.EName,
                    gender = d.EGender == 0 ? "女":"男",
                    phone = d.EPhone,
                    dept = depts.GetValueOrDefault(d.EDept), // 使用字典获取单个值
                    duty = duties.GetValueOrDefault(d.EDuty), // 使用字典获取单个值
                    status = d.EStatus == 0 ? "离职" : "在职",
                    time = d.ECreateTime!.Value.ToString("yyyy-MM-dd HH:mm:ss")
                })
                .ToListAsync();

                return Result(1, "ok", new
                {
                    data,
                    total
                });
            }
            catch (Exception ex)
            {
                // 添加异常处理
                return Result(0, "获取员工列表失败: " + ex.Message, null);
            }
        }
        /// <summary>
        /// 获取班次
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Get_Shift(int page = 1, int limit = 10)
        {
            var data = await _sys_IOC._sys_Shift_EFCore.QueryAll(out int total, page, limit, false, o => o.SCreateTime)
                .Select(d => new
                {
                    id = d.SId,
                    name = d.SName,
                    startTime = d.SStartTime,
                    endTime = d.SEndTime,
                    breakStart = d.SBreakStart,
                    breakEnd = d.SBreakEnd,
                    status = d.SStatus == 0 ? "停用" : "启用",
                    time = d.SCreateTime.Value.ToString("yyyy-MM-dd HH:mm:ss")
                })
                .ToListAsync();

            return Result(1, "ok", new
            {
                data,
                total
            });
        }
        /// <summary>
        /// 修改班次
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public Task<Api_Response_Dto> Upd_Shift(Shift_Request_Dto dto)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 获取子部门
        /// </summary>
        /// <param name="id"></param>
        /// <param name="list"></param>
        /// <returns></returns>
        private List<Department_Response> Get_Department_Children(string? id, List<Department_Response> list)
        {
            List<Department_Response> children = new List<Department_Response>();

            var data = list.Where(d=>d.parentID == id).OrderBy(o=>o.time).ToList();
            data.ForEach(d =>
            {
                children.Add(new Department_Response
                {
                    id = d.id,
                    name = d.name,
                    manager = d.manager,
                    parentID = d.parentID,
                    status = d.status,
                    time = d.time,
                    children = Get_Department_Children(d.id, list)
                });
            });
            return children;
        }


    }
}
