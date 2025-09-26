using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Xceed.Document.NET;
using Yuhetang.Service.Instance;
using Yuhetang.Service.Interface;

namespace Yuhetang.Admin.Controllers
{
    /// <summary>
    /// 产品、套餐
    /// </summary>
    public class ProductPackageController : BaseController
    {
        private readonly I_Product_Package_Service _product_Package_Service;

        public ProductPackageController(I_Logins_Service login_Service,I_Product_Package_Service product_Package_Service) : base(login_Service)
        {
            _product_Package_Service = product_Package_Service;
        }
        /// <summary>
        /// 获取产品套餐
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Product_Package(int page= 1,int limit = 10)
        {
            var result = await _product_Package_Service.Get_Product_Package(page,limit);

            return Ok(result);
        }

        /// <summary>
        /// 获取服务
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Service(int page=1,int limit = 10)
        {
            var result = await _product_Package_Service.Get_Service(page, limit);

            return Ok(result);
        }

        

    }
}
