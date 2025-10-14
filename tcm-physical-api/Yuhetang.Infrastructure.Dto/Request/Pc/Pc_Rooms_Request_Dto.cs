using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request.Pc
{
    public class Pc_Rooms_Request_Dto : Base_Request
    {
        /// <summary>
        /// 房间名称
        /// </summary>
        public string? room_name { get; set; }


    }
}
