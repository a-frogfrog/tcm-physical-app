using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using Yuhetang.Infrastructure.Dto.Request;
using Yuhetang.Service.Interface;

namespace Yuhetang.Admin.Controllers
{
    /// <summary>
    /// 文章管理
    /// </summary>
    public class ArticlesController : BaseController
    {
        private readonly I_Articles_Service _articles_Service;

        public ArticlesController(I_Logins_Service login_Service,I_Articles_Service articles_Service) : base(login_Service)
        {
            _articles_Service = articles_Service;
        }
        /// <summary>
        /// 获取文章
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Articles(int page =1,int limit = 10)
        {
            var result = await _articles_Service.Get_Articles(page, limit);

            return Ok(result);
        }
        /// <summary>
        /// 新增文章
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add_Articles(Articles_Request_Dto dto)
        {
            var result = await _articles_Service.Add_Articles(dto);

            return Ok(result);
        }
        /// <summary>
        /// 删除文章
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> Del_Articles(string id)
        {
            var result = await _articles_Service.Del_Articles(id);

            return Ok(result);
        }
        /// <summary>
        /// 修改文章
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Upd_Articles(Articles_Request_Dto dto)
        {
            var result = await _articles_Service.Upd_Articles(dto);

            return Ok(result);
        }

        /// <summary>
        /// 更新浏览人数
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Visitors(Articles_Request_Dto dto)
        {
            var result = await _articles_Service.Visitors(dto);

            return Ok(result);
        }
    }
}
