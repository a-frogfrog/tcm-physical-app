using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request.Pc;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.Dto.Response.Pc;
using Yuhetang.Infrastructure.EFCore.MySql;
using Yuhetang.Infrastructure.IOC;
using Yuhetang.Service.EFCore;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.Instance
{
    [Inject_]
    public class Pc_Rooms_Service : Base_Service, I_Pc_Rooms_Service
    {
        private readonly Room_IOC _roomIOC;
        private readonly Order_IOC _orderIOC;
        private readonly Appointments_IOC _appointmentsIOC;

        public Pc_Rooms_Service(Room_IOC roomIOC, Order_IOC orderIOC, Appointments_IOC appointmentsIOC)
        {
            _roomIOC = roomIOC;
            _orderIOC = orderIOC;
            _appointmentsIOC = appointmentsIOC;
        }

        public Task<Api_Response_Dto> GetRoomCurrentUsage(long roomId)
        {
            throw new NotImplementedException();
        }

        public Task<Api_Response_Dto> GetRoomCurrentUsageAsync(long roomId)
        {
            throw new NotImplementedException();
        }
    }
}
