using Yuhetang.Infrastructure.Dto.Response;

namespace Yuhetang.Service.Instance
{
    public class Base_Service
    {
        public Api_Response_Dto Result(int code,string? message="",object? data=null)
        {
            Api_Response_Dto dto = new Api_Response_Dto()
            {
                data= data
            };
            dto.code = code > 0 ? Api_Code.ok : Api_Code.fail;
            dto.message = string.IsNullOrEmpty(message)
                ? (code > 0 ? "操作成功" : "操作失败") : message;

            return dto;
        }
    }
}
