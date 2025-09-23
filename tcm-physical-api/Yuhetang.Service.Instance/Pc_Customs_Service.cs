using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yuhetang.Infrastructure.Attr;
using Yuhetang.Infrastructure.Dto.Request.Pc;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.Dto.Response.Pc;
using Yuhetang.Infrastructure.IOC;
using Yuhetang.Service.EFCore;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.Instance
{
    [Inject_]
    public class Pc_Customs_Service : Base_Service, I_Pc_Customs_Service
    {
        private readonly Custom_IOC _custom_IOC;

        public Pc_Customs_Service(Custom_IOC custom_IOC)
        {
            _custom_IOC = custom_IOC;
        }

        /// <summary>
        ///PC端  获取所有客户
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public async Task<Api_Response_Dto> Get_Customs(Pc_Customs_Request_Dto dto)
        {
            var date = await _custom_IOC._custom_EFCore.QueryAll(out int total, Convert.ToInt32(dto.page), Convert.ToInt32(dto.limit), false, o => o.CCreateTime)
            .Select(d => new Pc_Customs_Response_Dto
            {
                id = d.CId,
                name = d.CName,
                phone = d.CPhone,
                CreateTime = d.CCreateTime!.Value.ToString("yyyy-MM-dd HH:mm:ss"),
                ConsumptionTime = d.CConsumptionTime!.Value.ToString("yyyy-MM-dd HH:mm:ss"),
                Gender = d.CGender,
                TotalSpending = d.CTotalSpending,
            }).ToListAsync();
            return Result(1, "ok", new
            {
                total,
                date
            });
        }
    }
}
