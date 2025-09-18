using Microsoft.EntityFrameworkCore;
using MySqlX.XDevAPI.Common;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.EFCore.MySql;
using Yuhetang.Infrastructure.Tools;
using Yuhetang.Service.EFCore;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.Instance
{
    [Inject_]
    public class Articles_Service :Base_Service, I_Articles_Service
    {
        private readonly Articles_EFCore _articles_EFCore;

        public Articles_Service(Articles_EFCore articles_EFCore)
        {
            _articles_EFCore = articles_EFCore;
        }

        /// <summary>
        /// 新增文章
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Add_Articles(Articles_Request_Dto dto)
        {
            Article article = new Article()
            {
                Id = Config.GUID2(),
                Title = dto.title,
                Content = dto.content,
                Visitors = 0,
                CreatedTime = DateTime.Now
            };

            _articles_EFCore.Add(article);
            await _articles_EFCore.SaveChangesAsync();

            return Result(1, "新增成功");
        }
        /// <summary>
        /// 删除文章
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Del_Articles(string id)
        {
            var iq = await _articles_EFCore.QueryAll(d => d.Id == id).SingleOrDefaultAsync();
            if (iq == null)
            {
                return Result(1, "没有该文章");
            }
            _articles_EFCore.Delete(iq);
            await _articles_EFCore.SaveChangesAsync();

            return Result(1, "删除成功");
        }
        /// <summary>
        /// 获取文章
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Get_Articles(int page = 1, int limit = 10)
        {
            var iq = await _articles_EFCore.QueryAll(out int total, page, limit, false, o => o.CreatedTime)
                .Select(d => new Articles_Response_Dto
                {
                    id = d.Id,
                    title = d.Title,
                    content = d.Content,
                    visitors = d.Visitors,
                    time = d.CreatedTime.ToString("yyyy-MM-dd HH:mm:ss")
                })
                .ToListAsync();

            return Result(1, "ok", iq);
        }
        /// <summary>
        /// 修改文章
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Upd_Articles(Articles_Request_Dto dto)
        {
            return Result(0,"没写别看了");
        }
        /// <summary>
        /// 浏览人数
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Visitors(Articles_Request_Dto dto)
        {
            var iq = await _articles_EFCore.QueryAll(d => d.Id == dto.id).SingleOrDefaultAsync();
            if (iq == null)
            {
                return Result(0, "error");
            }
            iq.Visitors += 1;

            _articles_EFCore.Update(iq);
            await _articles_EFCore.SaveChangesAsync();

            return Result(1,"ok");
        }
    }
}
