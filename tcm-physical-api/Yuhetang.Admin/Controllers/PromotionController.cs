using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Yuhetang.Admin.Controllers;
using Yuhetang.Service.EFCore;

using Yuhetang.Service.Interface;

/// <summary>
/// 推广
/// </summary>
public class PromotionController : BaseController
{
    private readonly I_Promotion_Service _promotion_Service;
    private readonly CustomerVipCps_EFCore _customerVipCps_EFCore;

    public PromotionController(I_Logins_Service login_Service, I_Promotion_Service promotion_Service, CustomerVipCps_EFCore customerVipCps_EFCore) : base(login_Service)
    {
        _promotion_Service = promotion_Service;
        _customerVipCps_EFCore = customerVipCps_EFCore;
    }

    /// <summary>
    /// 生成链接
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Generate_Link()
    {
        var user = this.Get_Current_Customer();
        var result = await _promotion_Service.Generate_Link(user.id);
        return Ok(result);
    }
    /// <summary>
    /// 跳转链接
    /// </summary>
    /// <param name="shortKey"></param>
    /// <returns></returns>

    [HttpGet]
    public async Task<IActionResult> RedirectToLongUrl(string shortKey)
    {

        var entity = await _customerVipCps_EFCore
            .QueryAll(x => x.CvcShortUrl == shortKey && x.CvcStatus == 1)
            .SingleOrDefaultAsync();

        if (entity == null)
            return NotFound("短链接不存在或已停用");

        return Ok(new
        {
            code = 1,
            message = "ok",
            data=entity.CvcLongUrl
        });
    }

    /// <summary>
    /// 生成二维码
    /// </summary>
    /// <param name="longUrl">长链接地址</param>

    [HttpGet]
    public async Task<IActionResult> Get_QRCode(string longUrl)
    {
        var result = await _promotion_Service.Generate_QRCode(longUrl);
        return Ok(result);
    }
    /// <summary>
    /// 获取链接列表
    /// </summary>
    /// <param name="page"></param>
    /// <param name="limit"></param>
    /// <returns></returns>
    [HttpGet]
    public async Task<IActionResult> Get_CustomsVipCps(int page = 1,int limit = 10)
    {
        var result = await _promotion_Service.Get_CustomsVipCps(page, limit);
        return Ok(result);
    }

    /// <summary>
    /// 获取推广数据统计
    /// </summary>
    /// <param name="page"></param>
    /// <param name="limit"></param>
    /// <returns></returns>
    [HttpGet]
    public async Task<IActionResult> Promotion_Data_Statistics(string id)
    {
        var result = await _promotion_Service.Promotion_Data_Statistics(id);
        return Ok(result);
    }
}