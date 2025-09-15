using Goods.Infrastructure.Redis;
using ServiceStack.Redis;

namespace Yuhetang.Infrastructure.Redis
{
   
    public class RedisBase
    {
        public IRedisClient IClient { get; private set; }
        /// <summary>
        /// 构造时完成链接的打开
        /// </summary>
        public RedisBase(RedisManager redisManager)
        {
            IClient = redisManager.GetClient();
        }

        private bool _disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    IClient.Dispose();
                    IClient = null;
                }
            }
            this._disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Transcation()
        {
            using IRedisTransaction irt = IClient.CreateTransaction();
            try
            {
                irt.QueueCommand(r => r.Set("key", 20));
                irt.QueueCommand(r => r.Increment("key", 1));
                irt.Commit(); // 提交事务
            }
            catch (Exception)
            {
                irt.Rollback();
                throw;
            }
        }


        /// <summary>
        /// 清除全部数据 请小心
        /// </summary>
        public virtual void FlushAll()
        {
            IClient.FlushAll();
        }

        /// <summary>
        /// 保存数据DB文件到硬盘
        /// </summary>
        public void Save()
        {
            IClient.Save();//阻塞式save
        }

        /// <summary>
        /// 异步保存数据DB文件到硬盘
        /// </summary>
        public void SaveAsync()
        {
            IClient.SaveAsync();//异步save
        }
    }
}
