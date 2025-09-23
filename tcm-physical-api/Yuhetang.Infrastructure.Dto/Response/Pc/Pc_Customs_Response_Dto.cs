using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Response.Pc
{
    public class Pc_Customs_Response_Dto
    {
        /// <summary>
        /// 客户id
        /// </summary>
        public string? id { get; set; }

        /// <summary>
        /// 客户姓名
        /// </summary>
        public string? name { get; set; }

        /// <summary>
        /// 客户电话号码
        /// </summary>
        public string? phone { get; set; }

        /// <summary>
        /// 客户性别
        /// </summary>
        public int? Gender { get; set; } 

        /// <summary>
        /// 客户年龄
        /// </summary>
        public int? Age { get; set; }


        /// <summary>
        /// 客户来源
        /// </summary>
        public string? Resource { get; set; }

        /// <summary>
        /// 是否转化
        /// </summary>
        public int? Is_Convert { get; set; }

        /// <summary>
        /// 推广人id
        /// </summary>
        public string? VIPID { get; set; }

        /// <summary>
        /// 推广链接
        /// </summary>
        public string? code { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
         public string? CreateTime { get; set; }

        /// <summary>
        /// 近期消费时间
        /// </summary>
        public string? ConsumptionTime‌ { get; set; }

        /// <summary>
        /// 累计消费
        /// </summary>
        public int? TotalSpending { get; set; }
    }
}
