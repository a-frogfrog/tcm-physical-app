using Microsoft.EntityFrameworkCore;
using MySqlX.XDevAPI.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.EFCore.MySql;
using Yuhetang.Infrastructure.IOC;
using Yuhetang.Infrastructure.Tools;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.Instance
{
    [Inject_]
    public class Service : Base_Service, I_Service
    {
        private readonly Product_Package_IOC _product_Package_IOC;

        public Service(Product_Package_IOC product_Package_IOC)
        {
            _product_Package_IOC = product_Package_IOC;
        }
        /// <summary>
        /// 获取服务
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Get_Service(int page = 1, int limit = 10)
        {
            var iq = _product_Package_IOC._serviceTo_EFCore.QueryAll(out int total, page, limit, false, o => o.CreateTime);
            if(!await iq.AnyAsync())
            {
                return Result(0,"没有服务");
            }
            var data = await iq.Select(d => new Service_Response_Dto
            {
                id = d.SId,
                cover = d.SCover,
                name = d.SName,
                duration = d.SDuration,
                price = d.SPrice,
                desc = d.SDescription,
                rate = d.SCommissionRate,
                time = d.CreateTime.Value.ToString("yyyy-MM-dd HH:mm:dd")
            }).ToListAsync();

            return Result(1, "ok", data);
        }

        /// <summary>
        /// 新增服务(admin)
        /// </summary>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Add_Service(Service_Request_Dto dto)
        {
            ServiceTo serviceTo = new ServiceTo()
            {
                SId = Config.GUID2(),
                SName = dto.name,
                SCover = dto.cover,
                SDescription = dto.desc,
                SDuration = dto.duration,
                SPrice = (decimal)dto.price,
                SCommissionRate = dto.rate,
                CreateTime = DateTime.Now
            };

            _product_Package_IOC._serviceTo_EFCore.Add(serviceTo);
            await _product_Package_IOC._serviceTo_EFCore.SaveChangesAsync();

            return Result(1, "新增成功");
        }
        /// <summary>
        /// 删除服务
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Del_Service(string id)
        {
            var iq = await _product_Package_IOC._serviceTo_EFCore.QueryAll(d => d.SId == id).SingleOrDefaultAsync();
            if (iq == null)
            {
                return Result(0, "删除失败");
            }

            _product_Package_IOC._serviceTo_EFCore.Delete(iq);
            await _product_Package_IOC._product_Package_EFCore.SaveChangesAsync();

            return Result(1, "删除成功");
        }
        /// <summary>
        /// 更新服务
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Upd_Service(Service_Request_Dto dto)
        {
            var iq = await _product_Package_IOC._serviceTo_EFCore.QueryAll(d => d.SId == dto.id).SingleOrDefaultAsync();
            if (iq == null)
            {
                return Result(0, "更新失败");
            }
            iq.SDuration = dto.duration;
            iq.SDescription = dto.desc;
            iq.SPrice = (decimal)dto.price;
            iq.SCommissionRate = dto.rate;

            _product_Package_IOC._serviceTo_EFCore.Update(iq);
            await _product_Package_IOC._serviceTo_EFCore.SaveChangesAsync();

            return Result(1, "更新成功");

        }
        /// <summary>
        /// 获取服务详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Get_Service_Detail(string id)
        {
            var iq = await _product_Package_IOC._serviceTo_EFCore.QueryAll(d => d.SId == id).SingleOrDefaultAsync();

            if(iq == null)
            {
                return Result(0, "服务不存在");
            }

            return Result(1, "ok", iq);
        }
    }
}
