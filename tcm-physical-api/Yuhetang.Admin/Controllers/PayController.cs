using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Net;
using System.Text;
using System.Web;
using Yuhetang.Infrastructure.Tools;
using Yuhetang.Infrastructure.Dto.Response.Pc;
using Yuhetang.Infrastructure.Dto.Response;
using XSystem.Security.Cryptography;

namespace Yuhetang.Admin.Controllers
{
    [Route("api/[controller]/[action]")]
    public class PayController : ControllerBase
    {
        /// <summary>
        /// 在线支付
        /// </summary>
        /// <param name="paymentType"></param>
        /// <param name="money"></param>
        /// <param name="title"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult PayMent(string paymentType, string money, string title)
        {
            var json = new JObject();

            try
            {
                var dic = new Dictionary<string, string>
                    {
                        {"version", "1.1"},
                        {"lang", "zh-cn"},
                        {"plugins", "Mrjiang"},
                        {"appid", "201906136505"},//appid
	                    {"appsecret", "4d073f520cc2e723ee13a5227bf1bd27"},//appsecret
	                    {"trade_order_id", Config.GUID()},//订单号
	                    {"payment", "wechat"},//支付类型
	                    {"total_fee", "0.01"},//金额
	                    {"title", HttpUtility.UrlEncode("mrjiang_money")},//标题，中文需要编码“HttpUtility.UrlEncode()”
	                    {"time", Config.GetUnixTimestampSeconds().ToString()},//时间戳
	                    {"notify_url", "https://www.baidu.com/"},//通知链接
	                    {"return_url", "https://www.baidu.com/"},//跳转链接
	                    {"nonce_str",Config.GUID()},//随机字符串
	                };

                dic.Add("hash", Sign(dic));

                var sr = JsonConvert.DeserializeObject<SamplesResult>(PostHttp(dic));

                json.Add(new JProperty("openid", sr.Openid));
                json.Add(new JProperty("url", sr.Url));
                json.Add(new JProperty("errcode", sr.Errcode));
                json.Add(new JProperty("errmsg", sr.Errmsg));
                json.Add(new JProperty("hash", sr.Hash));
            }
            catch (Exception e)
            {
                throw e;
            }

            var result = JsonConvert.DeserializeObject<Pc_Pay_Response_Dto>(json.ToString());
            if (result.errcode == "0")
            {
                return Ok(new Api_Response_Dto()
                {
                    code = 0,
                    message = "ok",
                    data = result.url
                });
            }
            else
            {
                return Ok(new Api_Response_Dto()
                {
                    code = Api_Code.fail,
                    message = result.errmsg,

                });
            }



        }



        public class SamplesResult
        {
            public string Openid { get; set; }

            public string Url { get; set; }

            public string Errcode { get; set; }

            public string Errmsg { get; set; }

            public string Hash { get; set; }
        }

        [HttpPost]
        public ActionResult NotifyUrl()
        {

            var tradeOrderId = Request.Query["trade_order_id"];
            var totalFee = Request.Query["total_fee"];
            var transactionId = Request.Query["transaction_id"];
            var plugins = Request.Query["plugins"];
            var status = Request.Query["status"];
            var hash = Request.Query["hash"];

            return Content(!string.IsNullOrEmpty(tradeOrderId) ? "success" : "");
        }

        public static string PostHttp(Dictionary<string, string> dicArray)
        {
            string result;

            try
            {
                var req = (HttpWebRequest)WebRequest.Create("https://api.xunhupay.com/payment/do.html");
                req.KeepAlive = false;
                req.Method = "POST";
                req.ContentType = "application/x-www-form-urlencoded";
                req.Accept = "application/json";

                var paramData = ParamData(dicArray);
                var data = Encoding.Default.GetBytes(paramData);

                req.ContentLength = data.Length;

                var swrite = req.GetRequestStream();
                swrite.Write(data, 0, data.Length);
                swrite.Close();

                var resp = (HttpWebResponse)req.GetResponse();
                var stream = resp.GetResponseStream();

                //获取响应内容
                var reader = new StreamReader(stream ?? throw new InvalidOperationException(), Encoding.UTF8);
                result = reader.ReadToEnd();
            }
            catch (WebException ex)
            {
                result = ex.Message;
            }

            return result;
        }

        public static string Sign(Dictionary<string, string> dicArray)
        {
            var prestr = new StringBuilder();
            foreach (var temp in dicArray.OrderBy(o => o.Key))
            {
                prestr.Append(temp.Key + "=" + temp.Value + "&");
            }
            var nLen = prestr.Length;
            prestr.Remove(nLen - 1, 1);
            var signValue = Md5Encoder(prestr + "4d073f520cc2e723ee13a5227bf1bd27", 32);
            return signValue;
        }

        public static string ParamData(Dictionary<string, string> dicArray)
        {
            var prestr = new StringBuilder();
            foreach (var temp in dicArray)
            {
                prestr.Append(temp.Key + "=" + temp.Value + "&");
            }

            var nLen = prestr.Length;
            prestr.Remove(nLen - 1, 1);

            return prestr.ToString();
        }

        public static string Md5Encoder(string str, int bit)
        {
            var md5Hasher = new MD5CryptoServiceProvider();
            var hashedDataBytes = md5Hasher.ComputeHash(Encoding.GetEncoding("gb2312").GetBytes(str));
            var tmp = new StringBuilder();
            foreach (var i in hashedDataBytes)
            {
                tmp.Append(i.ToString("x2"));
            }

            switch (bit)
            {
                case 16:
                    return tmp.ToString().Substring(8, 16);
                case 32:
                    return tmp.ToString();//默认情况
            }

            return string.Empty;
        }
    }
}
