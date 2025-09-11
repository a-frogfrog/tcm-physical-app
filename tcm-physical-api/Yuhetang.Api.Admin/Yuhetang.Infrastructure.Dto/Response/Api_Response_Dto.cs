namespace Yuhetang.Infrastructure.Dto.Response
{
    public class Api_Response_Dto
    {
        public Api_Code code { get; set; }
        public string? message {  get; set; }
        public object? data { get; set; }
    }
}
