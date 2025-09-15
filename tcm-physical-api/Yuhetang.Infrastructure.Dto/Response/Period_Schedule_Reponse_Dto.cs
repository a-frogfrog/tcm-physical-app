using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response
{
    public class Period_Schedule_Reponse_Dto
    {
        /// <summary>
        /// 周期id
        /// </summary>
        public string? sp_id { get; set; }
        /// <summary>
        /// 周期名称
        /// </summary>
        public string? name { get; set; }
        public int? day { get; set; }
        /// <summary>
        /// 适用部门id
        /// </summary>
        public string? deptID { get; set; }
        public string time { get; set; }
        public List<Period_Day_Reponse_Dto> chidren { get; set; }
    }
}
