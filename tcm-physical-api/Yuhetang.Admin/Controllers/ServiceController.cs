using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Yuhetang.Infrastructure.Dto.Request;
using Yuhetang.Service.Interface;

namespace Yuhetang.Admin.Controllers
{
    /// <summary>
    /// 服务
    /// </summary>
    public class ServiceController : BaseController
    {
        private readonly I_Service _service;

        public ServiceController(I_Logins_Service login_Service,I_Service service) : base(login_Service)
        {
            _service = service;
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
            var result = await _service.Get_Service(page, limit);
            return Ok(result);
        }
        /// <summary>
        /// 新增服务
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add_Service(Service_Request_Dto dto)
        {
            var result = await _service.Add_Service(dto);
            return Ok(result);
        }
        /// <summary>
        /// 删除服务
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> Del_Service(string id)
        {
            var result = await _service.Del_Service(id);
            return Ok(result);
        }
        /// <summary>
        /// 更新服务
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Upd_Service(Service_Request_Dto dto)
        {
            var result = await _service.Upd_Service(dto);
            return Ok(result);
        }
    }
}
