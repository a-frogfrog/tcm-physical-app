using Microsoft.EntityFrameworkCore;
using ServiceStack;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.IOC;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.Instance
{
    [Inject_]
    public class Appointments_Service : Base_Service, I_Appointments_Service
    {
        private readonly Appointments_IOC _appointments_IOC;

        public Appointments_Service(Appointments_IOC appointments_IOC)
        {
            _appointments_IOC = appointments_IOC;
        }

        public Task<Api_Response_Dto> Add_Appointments()
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 获取预约列表(没写完)
        /// </summary>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Get_Appointments(int page, int limit, string? key)
        {
            throw new NotImplementedException();
        }
    }
}
 