using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Xceed.Document.NET;
using Yuhetang.Infrastructure.Dto.Request;
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
        /// 获取套餐
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Package(int page= 1,int limit = 10)
        {
            var result = await _product_Package_Service.Get_Package(page,limit);

            return Ok(result);
        }

        /// <summary>
        /// 新增套餐
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add_Package(Package_Resquest_Dto dto)
        {
            var result = await _product_Package_Service.Add_Package(dto);

            return Ok(result);
        }
        /// <summary>
        /// 更新套餐
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Upd_Package(Package_Resquest_Dto dto)
        {
            var result = await _product_Package_Service.Upd_Package(dto);

            return Ok(result);
        }


        /// <summary>
        /// 删除套餐
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> Del_Package(string id)
        {
            var result = await _product_Package_Service.Del_Package(id);

            return Ok(result);
        }



        /// <summary>
        /// 获取产品列表
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Products(int page = 1, int limit = 10)
        {
            var result = await _product_Package_Service.Get_Products(page, limit);

            return Ok(result);
        }

        /// <summary>
        /// 新增产品
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add_Products(Product_Request_Dto dto)
        {
            var result = await _product_Package_Service.Add_Products(dto);

            return Ok(result);
        }
        /// <summary>
        /// 更新产品
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Upd_Products(Product_Request_Dto dto)
        {
            var result = await _product_Package_Service.Upd_Products(dto);

            return Ok(result);
        }


        /// <summary>
        /// 删除产品
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> Del_Products(string id)
        {
            var result = await _product_Package_Service.Del_Products(id);

            return Ok(result);
        }

    }
}
