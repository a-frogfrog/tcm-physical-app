using Yuhetang.Service.Instance;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.EFCore
{
    [Inject_]
    public class Computer_Service:Base_Service,I_Computer_Service
    {
    }
}
