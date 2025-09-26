using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.IOC;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.Instance
{
    [Inject_]
    public class Product_Package_Service : Base_Service, I_Product_Package_Service
    {
        private readonly Product_Package_IOC _product_Package_IOC;

        public Product_Package_Service(Product_Package_IOC product_Package_IOC)
        {
            _product_Package_IOC = product_Package_IOC;
        }
        /// <summary>
        /// 获取产品套餐
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Api_Response_Dto> Get_Product_Package(int page = 1, int limit = 10)
        {
            var iq = _product_Package_IOC._product_Package_EFCore.QueryAll(out int total, page, limit, false, o => o.PpCreateTime);

            if (!await iq.AnyAsync())
            {
                return Result(1, "没有数据");
            }
            var data = await iq.Select(d=>new Product_Package_Response_Dto
            {
                id = d.PpId,
                name = d.PpName,
                desc = d.PpDescription,
                price = d.PpPrice,
                discount = d.PpDiscount,
                status = d.PpStatus,
                time = d.PpCreateTime!.Value.ToString("yyyy-MM-dd HH:mm:ss")
            }).ToListAsync();
            return Result(1, "ok", data);
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
            var data = await _product_Package_IOC._product_EFCore
                .QueryAll(out int total, page, limit, false, o => o.PCreateTime, d => d.PType == 2 && d.PStatus == 1)
                .Select(d=>new Product_Response_Dto
                {
                    id = d.PId,
                    desc = d.PDescription,
                    price = d.PPrice,
                    rate = d.PCommissionRate,
                    time = d.PCreateTime.Value.ToString("yyyy-MM-dd HH:mm:ss")
                })
                .ToListAsync();

            return Result(1, "ok", data);
        }

    }
}
