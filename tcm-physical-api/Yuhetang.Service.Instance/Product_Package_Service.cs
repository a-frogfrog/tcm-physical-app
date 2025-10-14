using Microsoft.EntityFrameworkCore;
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
    public class Product_Package_Service : Base_Service, I_Product_Package_Service
    {
        private readonly Product_Package_IOC _product_Package_IOC;

        public Product_Package_Service(Product_Package_IOC product_Package_IOC)
        {
            _product_Package_IOC = product_Package_IOC;
        }
        /// <summary>
        /// 新增套餐  
        /// </summary>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Add_Package(Package_Resquest_Dto dto)
        {
            var packageId = Config.GUID2();

            // 1. 创建套餐
            var package = new ProductPackage
            {
                PpId = packageId,
                PpName = dto.name,
                PpPrice = (decimal)dto.price,
                PpCommissionRate = dto.rate ?? 0.15m,
                PpDescription = dto.desc,
                PpStatus = 1,
                PpCreateTime = DateTime.Now
            };
            _product_Package_IOC._product_Package_EFCore.Add(package);

            // 2. 创建套餐详情
            foreach (var item in dto.service)
            {
                var detail = new ProductPackageDetail
                {
                    PpdId = Config.GUID2(),
                    PpdPackageId = packageId,
                    PpdServiceId = item.id,
                    PpdQuantity = 1,
                    PpdPrice = item.price,
                    PpdCreateTime = DateTime.Now
                };
                _product_Package_IOC._product_Package_Details_EFCore.Add(detail);
            }

            // 3. 保存
            await _product_Package_IOC._product_Package_EFCore.SaveChangesAsync();
            await _product_Package_IOC._product_Package_Details_EFCore.SaveChangesAsync();

            return Result(1, "套餐创建成功");
        }
        /// <summary>
        /// 新增产品
        /// </summary>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Add_Products(Product_Request_Dto dto)
        {
            Product product = new Product()
            {
                PId = Config.GUID2(),
                PName = dto.name,
                PDescription = dto.desc,
                PPrice = dto.price,
                PCommissionRate = dto.rate,
                PStatus = dto.status,
                PCreateTime = DateTime.Now
            };

            _product_Package_IOC._product_EFCore.Add(product);
            await _product_Package_IOC._product_EFCore.SaveChangesAsync();

            return Result(1, "新增成功");
        }
        /// <summary>
        /// 删除套餐
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Del_Package(string id)
        {
            var iq = await _product_Package_IOC._product_Package_EFCore.QueryAll(d=>d.PpId == id).SingleOrDefaultAsync();
            if (iq == null)
            {
                return Result(0, "套餐不存在");
            }

            _product_Package_IOC._product_Package_EFCore.Delete(iq);
            await _product_Package_IOC._product_Package_EFCore.SaveChangesAsync();

            return Result(1, "删除成功");
        }
        /// <summary>
        /// 删除产品
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Del_Products(string id)
        {
            var iq = await _product_Package_IOC._product_EFCore.QueryAll(d => d.PId == id).SingleOrDefaultAsync();

            if (iq == null)
            {
                return Result(0, "产品不存在");
            }

            _product_Package_IOC._product_EFCore.Delete(iq);
            await _product_Package_IOC._product_EFCore.SaveChangesAsync();

            return Result(1,"删除成功");
        }
        /// <summary>
        /// 获取套餐
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Get_Package(int page = 1, int limit = 10)
        {
            var iq = await _product_Package_IOC._product_Package_EFCore
                .QueryAll(out int total, page, limit, false, o => o.PpCreateTime)
                .Select(d=>new Package_Response_Dto
                {
                    id = d.PpId,
                    name = d.PpName,
                    status = d.PpStatus,
                    desc = d.PpDescription,
                    discount = d.PpDiscount,
                    price = d.PpPrice,
                    rate = d.PpCommissionRate,
                    time = d.PpCreateTime.Value.ToString("yyyy-MM-dd HH:mm:dd")
                })
                .ToListAsync();

            return Result(1, "ok", iq);
        }

        /// <summary>
        /// 获取产品
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Get_Products(int page = 1, int limit = 10)
        {
            var iq = await _product_Package_IOC._product_EFCore
                .QueryAll(out int total, page, limit, false, o => o.PCreateTime)
                .ToListAsync();

            return Result(1, "ok");
        }

        /// <summary>
        /// 更新套餐(没写完)
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Upd_Package(Package_Resquest_Dto dto)
        {
            var iq = await _product_Package_IOC._product_Package_EFCore.QueryAll(d => d.PpId == dto.id).SingleOrDefaultAsync();
            if (iq == null)
            {
                return Result(0, "没有产品");
            }
            iq.PpName = dto.name;
            iq.PpPrice = (decimal)dto.price;
            iq.PpCommissionRate = dto.rate;
            iq.PpDescription = dto.desc;
            
            _product_Package_IOC._product_Package_EFCore.Update(iq);
            await _product_Package_IOC._product_Package_EFCore.SaveChangesAsync();

            return Result(1, "更新成功");
        }
        /// <summary>
        /// 更新产品
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Upd_Products(Product_Request_Dto dto)
        {
            var iq = await _product_Package_IOC._product_EFCore.QueryAll(d => d.PId == dto.id).SingleOrDefaultAsync();
            if (iq == null)
            {
                return Result(0, "没有产品");
            }
            iq.PName = dto.name;
            iq.PPrice = dto.price;
            iq.PCommissionRate = dto.rate;
            iq.PDescription = dto.desc;

            _product_Package_IOC._product_EFCore.Update(iq);
            await _product_Package_IOC._product_EFCore.SaveChangesAsync();

            return Result(1, "更新成功");
        }
    }
}
