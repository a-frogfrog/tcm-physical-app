using Yuhetang.Infrastructure.Attr;
using Yuhetang.Service.EFCore;

namespace Yuhetang.Infrastructure.IOC
{
    [Provider_, Inject_]
    public class Appointments_IOC
    {
        public readonly Appointments_EFCore _appointments_EFCore;

        public Appointments_IOC( Appointments_EFCore appointments_EFCore )
        {
            _appointments_EFCore = appointments_EFCore;
        }
    }
}
