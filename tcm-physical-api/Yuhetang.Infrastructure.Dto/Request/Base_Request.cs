using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    public class Base_Request
    {
        /// <summary>
        /// 
        /// </summary>
        public int? page { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? limit { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string? key { get; set; }
    }
}
