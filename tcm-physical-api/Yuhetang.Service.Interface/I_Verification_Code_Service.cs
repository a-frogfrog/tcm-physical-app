using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;

namespace Yuhetang.Service.Interface
{
    [Provider_]
    public interface I_Verification_Code_Service
    {
        string GenerateVerificationCode(int length = 6);
        Task<(bool success, string message)> SendVerificationCodeAsync(string email);
        bool ValidateVerificationCode(string email, string code);
    }
}
