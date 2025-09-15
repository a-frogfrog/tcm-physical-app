using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;

namespace Yuhetang.Service.Interface
{
    [Provider_]
    public interface I_Email_Service
    {
        Task<bool> SendVerificationCodeAsync(string toEmail, string verificationCode);
        Task<bool> SendEmailAsync(string toEmail, string subject, string body);
    }
}
