using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Yuhetang.Service.Instance;
using Yuhetang.Service.Interface;

namespace Yuhetang.Admin.Controllers
{
    /// <summary>
    /// 订单管理
    /// </summary>
    public class OrderController : BaseController
    {
        private readonly I_Order_Service _order_Service;

        public OrderController(I_Logins_Service login_Service,I_Order_Service order_Service) : base(login_Service)
        {
            _order_Service = order_Service;
        }

    }
}
