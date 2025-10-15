using Microsoft.AspNetCore.Http;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace Yuhetang.Infrastructure.Tools
{
    public class LatLng
    {
        public LatLng(double x, double y)
        {
            latitude = x;
            longitude = y;
        }
        public double latitude;
        public double longitude;
    }

    /// <summary>
    /// 配置文件操作类
    /// </summary>
    public class Config
    {
        /// <summary>
        /// 获取时间戳
        /// </summary>
        /// <returns></returns>
        public static long GetUnixTimestampSeconds()
        {
            // 计算当前时间与 Unix 起始时间的差值（秒）
            return (long)(DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds;
        }
        private readonly static Random rd = new();

        // 随机名称固定前缀
        private const string NamePrefix = "堂人";

        //地球半径，单位米
        private const double EARTH_RADIUS = 6378137;
        /// <summary>
        /// 计算两点位置的距离，返回两点的距离，单位 米
        /// 该公式为GOOGLE提供，误差小于0.2米
        /// </summary>
        /// <param name="lat1">第一点纬度</param>
        /// <param name="lng1">第一点经度</param>
        /// <param name="lat2">第二点纬度</param>
        /// <param name="lng2">第二点经度</param>
        /// <returns></returns>
        public static double GetDistance(double lat1, double lng1, double lat2, double lng2)
        {
            double radLat1 = Rad(lat1);
            double radLng1 = Rad(lng1);
            double radLat2 = Rad(lat2);
            double radLng2 = Rad(lng2);
            double a = radLat1 - radLat2;
            double b = radLng1 - radLng2;
            double result = 2 * Math.Asin(Math.Sqrt(Math.Pow(Math.Sin(a / 2), 2) + Math.Cos(radLat1) * Math.Cos(radLat2) * Math.Pow(Math.Sin(b / 2), 2))) * EARTH_RADIUS;
            return result;
        }



        /// <summary>
        /// 经纬度转化成弧度
        /// </summary>
        /// <param name="d"></param>
        /// <returns></returns>
        private static double Rad(double d)
        {
            return (double)d * Math.PI / 180d;
        }

        /// <summary>
        /// 判断两个经纬度的距离
        /// </summary>
        /// <param name="j1">第一个经度</param>
        /// <param name="w1">第一个纬度</param>
        /// <param name="j2">第二个经度</param>
        /// <param name="w2">第二个纬度</param>
        /// <returns></returns>
        public static double GetGreatCircleDistance(double j1, double w1, double j2, double w2)
        {
            LatLng start = new(j1, w1);
            LatLng end = new(j2, w2);

            double lat1 = (Math.PI / 180) * start.latitude;
            double lat2 = (Math.PI / 180) * end.latitude;

            double lon1 = (Math.PI / 180) * start.longitude;
            double lon2 = (Math.PI / 180) * end.longitude;

            double r = 6371000; //地球半径(米)

            double dd = Math.Acos(Math.Sin(lat1) * Math.Sin(lat2) + Math.Cos(lat1) * Math.Cos(lat2) * Math.Cos(lon2 - lon1)) * r;
            return dd;
        }

        /// <summary>
        /// 获取随机数
        /// </summary>
        /// <param name="min">最小值 包含</param>
        /// <param name="max">最大值 不包含</param>
        /// <returns></returns>
        public static int GetRandom(int min, int max)
        {
            return rd.Next(min, max);
        }

        /// <summary>
        /// 获取时间戳
        /// </summary>
        /// <returns></returns>
        public static long GetTimeStamp()
        {
            return (DateTime.Now.ToUniversalTime().Ticks - 621355968000000000) / 10000000;
        }

        /// <summary>
        /// 获取请求IP
        /// </summary>
        public static string GetIp()
        {
            //return "127.0.0.1";//正式环境请注释
            IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
            return _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();//测试环境请注释
        }

        /// <summary>
        /// 有序的GUID
        /// </summary>
        /// <returns></returns>
        public static string GUID()
        {
            byte[] bytes = Guid.NewGuid().ToByteArray();
            DateTime now = DateTime.UtcNow;

            bytes[3] = (byte)(now.Year - 2021); // 假设2021年为起点
            bytes[2] = (byte)now.Month;
            bytes[1] = (byte)now.Day;
            bytes[0] = (byte)now.Hour;
            Array.Copy(BitConverter.GetBytes(now.Millisecond), 0, bytes, 4, 2);
            Array.Copy(BitConverter.GetBytes(now.Second), 0, bytes, 6, 2);
            Array.Copy(Guid.NewGuid().ToByteArray(), 0, bytes, 8, 8);

            return new Guid(bytes).ToString().Replace("-", "");
        }

        /// <summary>
        /// 生成GUID
        /// </summary>
        /// <returns></returns>
        public static string GUID2()
        {
            return Guid.NewGuid().ToString().Replace("-", "").ToUpper();
        }

        /// <summary>
        /// 获取登录类型（设备类型）
        /// </summary>
        /// <returns>登录类型描述</returns>
        public static string GetLoginType()
        {
            var deviceType = GetDeviceType();
            return deviceType switch
            {
                DeviceType.PC => "PC端登录",
                DeviceType.Mobile => "移动端登录",
                DeviceType.Tablet => "平板端登录",
                _ => "未知设备登录"
            };
        }

        /// <summary>
        /// 获取浏览器信息
        /// </summary>
        /// <returns>浏览器名称及版本</returns>
        public static string GetBrowserInfo()
        {
            try
            {
                IHttpContextAccessor httpContextAccessor = new HttpContextAccessor();
                var context = httpContextAccessor.HttpContext;

                if (context == null || !context.Request.Headers.ContainsKey("User-Agent"))
                    return "未知浏览器";

                string userAgent = context.Request.Headers["User-Agent"].ToString();

                // 检测常见浏览器
                if (userAgent.Contains("Edg"))
                    return ExtractBrowserVersion(userAgent, "Edg", "Edge");
                if (userAgent.Contains("Chrome"))
                    return ExtractBrowserVersion(userAgent, "Chrome", "Chrome");
                if (userAgent.Contains("Firefox"))
                    return ExtractBrowserVersion(userAgent, "Firefox", "Firefox");
                if (userAgent.Contains("Safari") && !userAgent.Contains("Chrome"))
                    return ExtractBrowserVersion(userAgent, "Safari", "Safari");
                if (userAgent.Contains("Opera") || userAgent.Contains("OPR"))
                    return ExtractBrowserVersion(userAgent, userAgent.Contains("OPR") ? "OPR" : "Opera", "Opera");
                if (userAgent.Contains("MSIE") || userAgent.Contains("Trident"))
                    return "Internet Explorer";

                return "未知浏览器";
            }
            catch
            {
                return "获取浏览器信息失败";
            }
        }

        /// <summary>
        /// 获取登录地点（IP对应的地理位置）
        /// 注意：实际应用中需要调用IP地址解析服务
        /// </summary>
        /// <returns>地理位置描述</returns>
        public static string GetLoginLocation()
        {
            try
            {
                // 获取客户端IP
                string ip = GetIp();

                // 本地IP直接返回本地
                if (ip == "127.0.0.1" || ip.StartsWith("192.168.") || ip.StartsWith("10."))
                    return "本地网络";

                // 实际应用中，这里应该调用IP解析API获取地理位置
                // 例如：百度地图API、高德地图API等
                // 以下为示例返回值
                return "未知位置（需要配置IP解析服务）";
            }
            catch
            {
                return "获取位置信息失败";
            }
        }

        /// <summary>
        /// 设备类型枚举
        /// </summary>
        private enum DeviceType
        {
            Unknown,
            PC,
            Mobile,
            Tablet
        }

        /// <summary>
        /// 获取设备类型
        /// </summary>
        private static DeviceType GetDeviceType()
        {
            try
            {
                IHttpContextAccessor httpContextAccessor = new HttpContextAccessor();
                var context = httpContextAccessor.HttpContext;

                if (context == null || !context.Request.Headers.ContainsKey("User-Agent"))
                    return DeviceType.Unknown;

                string userAgent = context.Request.Headers["User-Agent"].ToString().ToLowerInvariant();

                // 检测平板设备
                if (userAgent.Contains("ipad") || userAgent.Contains("tablet") ||
                    (userAgent.Contains("android") && !userAgent.Contains("mobile")))
                    return DeviceType.Tablet;

                // 检测移动设备
                if (userAgent.Contains("mobile") || userAgent.Contains("android") ||
                    userAgent.Contains("iphone") || userAgent.Contains("ios") ||
                    userAgent.Contains("windows phone"))
                    return DeviceType.Mobile;

                // 检测PC设备
                if (userAgent.Contains("windows") || userAgent.Contains("macintosh") ||
                    userAgent.Contains("linux") || userAgent.Contains("unix"))
                    return DeviceType.PC;

                return DeviceType.Unknown;
            }
            catch
            {
                return DeviceType.Unknown;
            }
        }

        /// <summary>
        /// 从User-Agent中提取浏览器版本
        /// </summary>
        private static string ExtractBrowserVersion(string userAgent, string agentKey, string browserName)
        {
            var match = Regex.Match(userAgent, $@"{agentKey}\/(\d+\.\d+)");
            if (match.Success && match.Groups.Count > 1)
                return $"{browserName} {match.Groups[1].Value}";

            return browserName;
        }

        /// <summary>
        /// 生成随机名称（格式：堂人 + 随机数字和字母混合）
        /// </summary>
        /// <param name="length">随机部分（数字+字母）的总长度，默认8</param>
        /// <returns>生成的随机名称</returns>
        public static string GenerateRandomName(int length = 8)
        {
            // 验证参数，确保长度至少为1
            length = length < 1 ? 8 : length;

            StringBuilder randomPart = new StringBuilder();
            for (int i = 0; i < length; i++)
            {
                // 50% 概率生成数字，50% 概率生成字母（小写）
                if (rd.Next(2) == 0)
                {
                    randomPart.Append(rd.Next(0, 10)); // 0 - 9 的随机数字
                }
                else
                {
                    // 97 - 122 对应 ASCII 表中的 a - z
                    char randomLetter = (char)rd.Next(97, 123);
                    randomPart.Append(randomLetter);
                }
            }

            // 组合前缀和随机部分
            return $"{NamePrefix}{randomPart}";
        }

        /// <summary>
        /// 邀请码
        /// </summary>
       private const string AvailableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

       public static string GenerateCode(int length = 8)
       {
           if (length <= 0)
               throw new ArgumentException("推广码长度必须大于0");

           var result = new StringBuilder(length);
           using var rng = RandomNumberGenerator.Create();

           var buffer = new byte[sizeof(uint)];

           for (int i = 0; i < length; i++)
           {
               rng.GetBytes(buffer);
               uint num = BitConverter.ToUInt32(buffer, 0);
               result.Append(AvailableChars[(int)(num % (uint)AvailableChars.Length)]);
           }

           return result.ToString();
       }


        }
}