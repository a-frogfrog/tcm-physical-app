using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yuhetang.Infrastructure.Dto.Request
{
    public class Login_Request_Dto
    {
        /// <summary>
        /// 账号或邮箱账号
        /// </summary>
        public string account { get; set; }
        /// <summary>
        /// 密码或验证码
        /// </summary>
        public string password { get; set; }
        /// <summary>
        /// 凭据
        /// </summary>
        public string code { get; set; }
        /// <summary>
        /// 推广人id
        /// </summary>
        public string? VIPID { get; set; }
        /// <summary>
        /// 推广码
        /// </summary>
        public string? VIPCode { get; set; }
    }
}
