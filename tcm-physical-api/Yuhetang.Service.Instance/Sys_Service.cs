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
        /// 新增排班
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Add_Employee_Schedule(Employee_Schedult_Request_Dto dto)
        {
            SysEmployeeSchedule sysEmployeeSchedule = new SysEmployeeSchedule()
            {
                SesId = Config.GUID2(),

                SesEmployeeId = dto.employeeID,
                SesDepartmentId = dto.departmentID,
                ScId = dto.rulesID,
                SesScheduleDate = DateOnly.Parse(dto.scheduleDate),
                SesShiftId = dto.shiftID,
                SesRemark = dto.remark,
                SesCreatorId = dto.CreatorID,

                SesCreateTime = DateTime.Now
            };

            _sys_IOC._sys_Employee_Schedule_EFCore.Add(sysEmployeeSchedule);
            await _sys_IOC._sys_Employee_Schedule_EFCore.SaveChangesAsync();

            return Result(1,"ok");
        }

        /// <summary>
        /// 新增周期
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Add_Period_Schedule(Period_Schedule_Request_Dto dto)
        {
            var id = Config.GUID2();
            SysPeriodSchedule sysPeriodSchedule = new SysPeriodSchedule()
            {
                SpId = id,
                SpDay = dto.day,
                SpDeptId = dto.deptID,
                ScCreateTime = DateTime.Now
            };
            dto.period_day.ForEach(d =>
            {
                SysPeriodDay sysPeriodDay = new SysPeriodDay()
                {
                    SpdId = Config.GUID2(),
                    SpId = id,
                    SpDayNo = d.day_no,
                    SpsId = d.sps_id,
                    SpCreateTime = DateTime.Now
                };
                _sys_IOC._sys_Period_Day_EFCore.Add(sysPeriodDay);
            });

            _sys_IOC._sys_Period_Schedule_EFCore.Add(sysPeriodSchedule);
            await _sys_IOC._sys_Period_Schedule_EFCore.SaveChangesAsync();
            await _sys_IOC._sys_Period_Day_EFCore.SaveChangesAsync();

            return Result(1, "新增成功");
        }

        /// <summary>
        /// 新增周期规则
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Add_Schedule_Cycle(Schedule_Cycle_Request_Dto dto)
        {
            SysScheduleCycle sysScheduleCycle = new SysScheduleCycle()
            {
                ScId = Config.GUID2(),
                ScName = dto.name,
                ScDeptId = dto.deptID,
                ScStartTime = DateOnly.Parse(dto.startTime),
                ScEndTime = DateOnly.Parse(dto.endTime),
                ScIsBan = dto.isBan,
                ScCreatorId = dto.creatorID,
                ScCreateTime = DateTime.Now
            };

            _sys_IOC._sys_Schedule_Cycle_EFCore.Add(sysScheduleCycle);
            await _sys_IOC._sys_Schedule_Cycle_EFCore.SaveChangesAsync();

            return Result(1,"新增成功");

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
                    gender = d.EGender,
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
        /// 获取排班
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Get_Employee_Schedule(int page = 1, int limit = 10)
        {
            var iq = _sys_IOC._sys_Employee_Schedule_EFCore.QueryAll(out int total, page, limit, false, o => o.SesCreateTime);
            if(!await iq.AnyAsync())
            {
                return Result(0, "没有排班记录");
            }

            var list = await iq.ToListAsync();
            List<Employee_Schedule_Response_Dto> data = new List<Employee_Schedule_Response_Dto>();

            list.ForEach(d =>
            {
                data.Add(new Employee_Schedule_Response_Dto
                {
                    id = d.SesId,
                    employeeID = d.SesEmployeeId,
                    employeeName = _sys_IOC._sys_Employees_EFCore.QueryAll(e=>e.EId == d.SesEmployeeId).Select(e=>e.EName).SingleOrDefault(),
                    departmentID = d.SesDepartmentId,
                    departmentName = _sys_IOC._sys_Department_EFCore.QueryAll(e => e.DId == d.SesDepartmentId).Select(e => e.DName).SingleOrDefault(),
                    rulesID = d.ScId,
                    rulesName = _sys_IOC._sys_Schedule_Cycle_EFCore.QueryAll(e => e.ScId == d.ScId).Select(e => e.ScName).SingleOrDefault(),
                    scheduleDate = d.SesScheduleDate.ToString(),
                    shiftID = d.SesShiftId,

                    shiftName = _sys_IOC._sys_Shift_EFCore.QueryAll(e => e.SId == d.SesShiftId).Select(e => e.SName).SingleOrDefault(),
                    startTime = _sys_IOC._sys_Shift_EFCore.QueryAll(e => e.SId == d.SesShiftId).Select(e => e.SStartTime).SingleOrDefault().ToString(),
                    endTime = _sys_IOC._sys_Shift_EFCore.QueryAll(e => e.SId == d.SesShiftId).Select(e => e.SEndTime).SingleOrDefault().ToString(),
                    breakStart = _sys_IOC._sys_Shift_EFCore.QueryAll(e => e.SId == d.SesShiftId).Select(e => e.SBreakStart).SingleOrDefault().ToString(),
                    breakEnd = _sys_IOC._sys_Shift_EFCore.QueryAll(e => e.SId == d.SesShiftId).Select(e => e.SBreakEnd).SingleOrDefault().ToString(),

                    remark = d.SesRemark,
                    createID = d.SesCreatorId,
                    creater = _sys_IOC._sys_Employees_EFCore.QueryAll(e => e.EId == d.SesEmployeeId).Select(e => e.EName).SingleOrDefault(),
                    time = d.SesCreateTime!.Value.ToString("yyyy-MM-dd HH:mm:ss")
                });
            });

            return Result(1, "ok", new
            {
                data,
                total
            });
        }

        /// <summary>
        /// 获取周期排班
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Get_Period_Schedule(int page = 1, int limit = 10)
        {
            try
            {
                // 1. 获取分期的排班列表
                var periodSchedules = await _sys_IOC._sys_Period_Schedule_EFCore
                    .QueryAll(out int total, page, limit, false, o => o.ScCreateTime)
                    .Select(d => new
                    {
                        sp_id = d.SpId,
                        name = d.SpName,
                        deptID = d.SpDeptId,
                        day = d.SpDay,
                        time = d.ScCreateTime
                    })
                    .ToListAsync(); // 先执行查询，获取到内存中

                if (!periodSchedules.Any())
                {
                    return Result(1, "没有数据");
                }

                // 2. 批量获取相关数据（在内存中处理）
                var spIds = periodSchedules.Select(d => d.sp_id).ToList();

                // 获取所有相关的Period_Day数据
                var allPeriodDays = await _sys_IOC._sys_Period_Day_EFCore
                    .QueryAll() // 先获取所有数据
                    .Where(d => spIds.Contains(d.SpId))
                    .ToListAsync();

                // 获取所有相关的班次ID
                var shiftIds = allPeriodDays.Select(d => d.SpsId).Distinct().ToList();

                // 批量获取班次信息
                var allShifts = await _sys_IOC._sys_Shift_EFCore
                    .QueryAll() // 先获取所有数据
                    .Where(s => shiftIds.Contains(s.SId))
                    .ToListAsync();

                // 转换为字典，方便快速查找
                var shiftsDict = allShifts.ToDictionary(s => s.SId, s => new
                {
                    s.SName,
                    s.SStartTime,
                    s.SEndTime
                });

                // 3. 构建响应数据（在内存中处理）
                var data = periodSchedules.Select(ps =>
                {
                    // 获取当前排班对应的Period_Day
                    var periodDays = allPeriodDays
                        .Where(pd => pd.SpId == ps.sp_id)
                        .OrderBy(pd => pd.SpDayNo)
                        .ToList();

                    // 构建子项
                    var children = periodDays.Select(pd =>
                    {
                        var shift = shiftsDict.ContainsKey(pd.SpsId) ? shiftsDict[pd.SpsId] : null;
                        return new Period_Day_Reponse_Dto
                        {
                            id = pd.SpdId,
                            sp_id = pd.SpId,
                            day_no = pd.SpDayNo,
                            sps_id = pd.SpsId,
                            name = shift?.SName ?? "",
                            startTime = shift?.SStartTime.ToString() ?? "",
                            endTime = shift?.SEndTime.ToString() ?? "",
                            time = pd.SpCreateTime?.ToString("yyyy-MM-dd HH:mm:ss") ?? ""
                        };
                    }).ToList();

                    return new Period_Schedule_Reponse_Dto
                    {
                        sp_id = ps.sp_id,
                        name = ps.name,
                        deptID = ps.deptID,
                        day = ps.day,
                        time = ps.time?.ToString("yyyy-MM-dd HH:mm:ss") ?? "",
                        chidren = children
                    };
                }).ToList();

                return Result(1, "ok", new { data, total });
            }
            catch (Exception ex)
            {
                // 记录日志
                return Result(0, "获取排班数据失败: " + ex.Message, null);
            }
        }

        /// <summary>
        /// 获取排班规则
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Get_Schedule_Cycle(int page = 1, int limit = 10)
        {
            var iq = await _sys_IOC._sys_Schedule_Cycle_EFCore.QueryAll(out int total, page, limit, false, o => o.ScCreateTime).ToListAsync();

            if(iq == null)
            {
                return Result(1, "还没有规则");
            }

            List<Schedule_Cycle_Response_Dto> data = new List<Schedule_Cycle_Response_Dto>();

            iq.ForEach(d =>
            {
                data.Add(new Schedule_Cycle_Response_Dto
                {
                    id = d.ScId,
                    name = d.ScName,
                    startTime = d.ScStartTime.ToString(),
                    endTime = d.ScEndTime.ToString(),
                    isBan = d.ScIsBan,
                    remark = d.ScRemark,
                    creatorName = _sys_IOC._sys_Employees_EFCore.QueryAll(e=>e.EId == d.ScCreatorId).Select(e=>e.EName).SingleOrDefault(),
                    creatorID = d.ScCreatorId,
                    time = d.ScCreateTime.Value.ToString("yyyy-MM-dd HH:mm:ss")
                });
            });

            return Result(1, "ok", data);
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
        public async Task<Api_Response_Dto> Upd_Shift(Shift_Request_Dto dto)
        {
            var iq = await _sys_IOC._sys_Shift_EFCore.QueryAll(d => d.SId == dto.id).SingleOrDefaultAsync();
            if (iq == null)
            {
                return Result(0, "没有找到");
            }
            iq.SName = dto.name;
            iq.SStartTime = dto.startTime == "" || dto.startTime == null ? null: TimeOnly.Parse(dto.startTime);
            iq.SEndTime = dto.endTime == "" || dto.endTime == null ? null : TimeOnly.Parse(dto.endTime);
            iq.SBreakStart = dto.breakStart == "" || dto.breakStart == null ? null : TimeOnly.Parse(dto.breakStart);
            iq.SBreakEnd = dto.breakEnd == "" || dto.breakEnd == null ? null : TimeOnly.Parse(dto.breakEnd);
            iq.SStatus = dto.status;

            _sys_IOC._sys_Shift_EFCore.Update(iq);
            await _sys_IOC._sys_Shift_EFCore.SaveChangesAsync();

            return Result(1,"修改成功");
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
