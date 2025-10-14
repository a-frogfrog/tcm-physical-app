using Microsoft.Extensions.Configuration;
using Yuhetang.Infrastructure.Attr;

namespace Yuhetang.Infrastructure.Redis
{
    [Provider_, Inject_]
    public class RedisConfigInfo
    {
        /// <summary>
        /// 可写的Redis链接地址
        /// format:ip1,ip2
        /// 默认6379端口
        ///
        /// 如果有密码按下面格式填写
        /// password@ip:port
        /// </summary>
        internal readonly string WriteServerList;
        /// <summary>
        /// 可读的Redis链接地址
        /// format:ip1,ip2
        /// </summary>
        internal readonly string ReadServerList;
        /// <summary>
        /// 最大写链接数
        /// </summary>
        internal readonly int MaxWritePoolSize ;
        /// <summary>
        /// 最大读链接数
        /// </summary>
        internal readonly int MaxReadPoolSize ;
        /// <summary>
        /// 本地缓存到期时间，单位:秒
        /// </summary>
        internal readonly int LocalCacheTime ;
        /// <summary>
        /// 自动重启
        /// </summary>
        internal readonly bool AutoStart ;
        /// <summary>
        /// 是否记录日志,该设置仅用于排查redis运行时出现的问题,
        /// 如redis工作正常,请关闭该项
        /// </summary>
        internal readonly bool RecordeLog ;

        public RedisConfigInfo(IConfiguration configuration)
        {
            WriteServerList = configuration["Redis:Config:WriteServerList"];
            ReadServerList = configuration["Redis:Config:ReadServerList"];
            MaxWritePoolSize = Convert.ToInt32(configuration["Redis:Config:MaxWritePoolSize"]);
            MaxReadPoolSize = Convert.ToInt32(configuration["Redis:Config:MaxReadPoolSize"]);
            LocalCacheTime = Convert.ToInt32(configuration["Redis:Config:LocalCacheTime"]);
            AutoStart = Convert.ToBoolean(configuration["Redis:Config:AutoStart"]);
            RecordeLog = Convert.ToBoolean(configuration["Redis:Config:RecordeLog"]);
        }
    }
}
