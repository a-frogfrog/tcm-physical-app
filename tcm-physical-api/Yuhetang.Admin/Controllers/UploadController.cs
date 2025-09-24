using Microsoft.AspNetCore.Mvc;
using Yuhetang.Infrastructure.Dto.Response;
using Yuhetang.Infrastructure.Tools;
using Yuhetang.Service.Interface;

namespace Yuhetang.Admin.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    public class UploadController : BaseController
    {
        private readonly IConfiguration _configuration;

        public UploadController(I_Logins_Service login_Service, IConfiguration configuration) : base(login_Service)
        {
            _configuration = configuration;

        }


        /// <summary>
        /// 上传商品封面
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Upload_Good_Cover()
        {
            try
            {
                var formFile = Request.Form.Files[0];//获取请求发送过来的文件
                //var filePath = $"/{DateTime.Now.ToString("yyyyMMdd")}/";


                var webRootPath = _configuration["UpLoad:Goods:Cover"];
                ////创建存储文件夹
                //if (!Directory.Exists(webRootPath + filePath))
                //{
                //Directory.CreateDirectory(webRootPath + filePath);
                //}
                if (formFile != null)
                {
                    //文件后缀
                    var fileExtension = Path.GetExtension(formFile.FileName);//获取文件格式，拓展名
                    //判断文件大小
                    var fileSize = formFile.Length;
                    int maxSize = Convert.ToInt32(_configuration["UpLoad:Yuhetang:Size"]);
                    if (fileSize <= 0)
                    {
                        return Ok(new Api_Response_Dto { code = Api_Code.fail, message = $"你选择的是空文件" });
                    }
                    if (fileSize > maxSize) //10M TODO:(1mb=1024X1024b)
                    {
                        return Ok(new Api_Response_Dto { code = Api_Code.fail, message = $"文件太大了！" });
                    }
                    //保存的文件名称(以名称和保存时间命名)
                    var saveName = $"{Config.GUID()}" + fileExtension;

                    //文件保存
                    using (var fs = System.IO.File.Create(webRootPath + saveName))
                    {
                        formFile.CopyTo(fs);
                        fs.Flush();
                    }
                    var webSite = _configuration["UpLoad:Yuhetang:Site"];
                    return Ok(new
                    {
                        code = 0,
                        message = "ok",
                        url = webSite + saveName
                    });
                }
                else
                {
                    return Ok(new Api_Response_Dto { code = Api_Code.fail, message = $"没有找到要上传的文件" });
                }
            }
            catch (Exception ex)
            {
                return Ok(new Api_Response_Dto { code = Api_Code.fail, message = $"出错了！！！" });
            }
        }
    }
}
