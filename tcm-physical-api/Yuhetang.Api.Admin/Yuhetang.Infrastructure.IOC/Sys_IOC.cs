using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.EFCore.MySql;
using Yuhetang.Service.EFCore;

namespace Yuhetang.Infrastructure.IOC
{
    [Provider_,Inject_]
    public class Sys_IOC
    {
        public readonly Sys_Department_EFCore _sys_Department_EFCore;
        public readonly Sys_Duty_EFCore _sys_Duty_EFCore;
        public readonly Sys_Employees_EFCore _sys_Employees_EFCore;

        public readonly Sys_Period_Day_EFCore _sys_Period_Day_EFCore;
        public readonly Sys_Period_Schedule_EFCore _sys_Period_Schedule_EFCore;
        public readonly Sys_Schedule_Cycle_EFCore _sys_Schedule_Cycle_EFCore;
        public readonly Sys_Shift_EFCore _sys_Shift_EFCore;
        public readonly Sys_Employee_Schedule_EFCore _sys_Employee_Schedule_EFCore;
        public Sys_IOC(
            Sys_Department_EFCore sys_Department_EFCore,
            Sys_Duty_EFCore sys_Duty_EFCore,
            Sys_Employees_EFCore sys_Employees_EFCore,
            Sys_Period_Day_EFCore sys_Period_Day_EFCore,
            Sys_Period_Schedule_EFCore sys_Period_Schedule_EFCore,
            Sys_Schedule_Cycle_EFCore sys_Schedule_Cycle_EFCore,
            Sys_Shift_EFCore sys_Shift_EFCore,
            Sys_Employee_Schedule_EFCore sys_Employee_Schedule_EFCore
            ) 
        {
            _sys_Department_EFCore = sys_Department_EFCore;
            _sys_Duty_EFCore = sys_Duty_EFCore;
            _sys_Employees_EFCore = sys_Employees_EFCore;

            _sys_Period_Day_EFCore = sys_Period_Day_EFCore;
            _sys_Period_Schedule_EFCore = sys_Period_Schedule_EFCore;
            _sys_Schedule_Cycle_EFCore = sys_Schedule_Cycle_EFCore;
            _sys_Shift_EFCore = sys_Shift_EFCore;
            _sys_Employee_Schedule_EFCore = sys_Employee_Schedule_EFCore;
        }
    }
}
