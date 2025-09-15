using Goods.Infrastructure.Redis;
using Microsoft.Extensions.Configuration;
using ServiceStack.Redis;
using Yuhetang.Infrastructure.Attr;

namespace Yuhetang.Infrastructure.Redis
{
    [Provider_, Inject_]
    public class RedisManager
    {
        public  IConfiguration configuration { get; set; }
       

        /// <summary>
        /// Redis客户端池化管理
        /// </summary>
        private  PooledRedisClientManager prcManager;

        /// <summary>
        /// 静态构造方法，初始化链接池管理对象
        /// </summary>
        public RedisManager(RedisConfigInfo redisConfigInfo)
        {
            CreateManager(redisConfigInfo);
        }

        /// <summary>
        /// 创建链接池管理对象
        /// </summary>
        private void CreateManager(RedisConfigInfo redisConfigInfo)
        {
            string[] WriteServerConStr = redisConfigInfo.WriteServerList.Split(',');
            string[] ReadServerConStr = redisConfigInfo.ReadServerList.Split(',');
            prcManager = new PooledRedisClientManager(ReadServerConStr, WriteServerConStr,
                             new RedisClientManagerConfig
                             {
                                 MaxWritePoolSize = redisConfigInfo.MaxWritePoolSize,
                                 MaxReadPoolSize = redisConfigInfo.MaxReadPoolSize,
                                 AutoStart = redisConfigInfo.AutoStart,
                             });
        }

        /// <summary>
        /// 客户端缓存操作对象
        /// </summary>
        public IRedisClient GetClient()
        {
            return prcManager.GetClient();
        }
    }
}
