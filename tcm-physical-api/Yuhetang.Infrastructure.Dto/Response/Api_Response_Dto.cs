namespace Yuhetang.Infrastructure.Dto.Response
{
    /// <summary>
    /// 通用API响应对象
    /// </summary>
    public class Api_Response_Dto
    {
        /// <summary>
        /// 状态码
        /// </summary>
        public Api_Code code { get; set; }
        /// <summary>
        /// 返回消息
        /// </summary>
        public string? message {  get; set; }
        /// <summary>
        /// 返回数据
        /// </summary>
        public object? data { get; set; }
    }
}
