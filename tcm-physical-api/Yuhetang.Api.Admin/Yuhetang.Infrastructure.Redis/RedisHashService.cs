using Goods.Infrastructure.Redis;
using Yuhetang.Infrastructure.Attr;

namespace Yuhetang.Infrastructure.Redis
{

    [Provider_, Inject_]
    public class RedisHashService:RedisBase
    {
        public RedisHashService(RedisManager redisManager) : base(redisManager)
        {

        }
        #region 添加
        /// <summary>
        /// 向hashid集合中添加key/value
        /// </summary>      
        public bool SetEntryInHash(string hashid, string key, string value)
        {
            return base.IClient.SetEntryInHash(hashid, key, value);
        }


        public void SetRangeInHash(string hashid, IEnumerable<KeyValuePair<string, string>> value)
        {
            base.IClient.SetRangeInHash(hashid, value);
        }

        /// <summary>
        /// 如果hashid集合中存在key/value则不添加返回false，
        /// 如果不存在在添加key/value,返回true
        /// </summary>
        public bool SetEntryInHashIfNotExists(string hashid, string key, string value)
        {
            return base.IClient.SetEntryInHashIfNotExists(hashid, key, value);
        }
        /// <summary>
        /// 存储对象T t到hash集合中
        /// 需要包含Id，然后用Id获取
        /// </summary>
        public void StoreAsHash<T>(T t)
        {
            base.IClient.StoreAsHash<T>(t);
        }
        #endregion

        #region 获取
        /// <summary>
        /// 获取对象T中ID为id的数据。
        /// </summary>
        public T GetFromHash<T>(object id)
        {
            return base.IClient.GetFromHash<T>(id);
        }
        /// <summary>
        /// 获取所有hashid数据集的key/value数据集合
        /// </summary>
        public Dictionary<string, string> GetAllEntriesFromHash(string hashid)
        {
            return base.IClient.GetAllEntriesFromHash(hashid);
        }
        /// <summary>
        /// 获取hashid数据集中的数据总数
        /// </summary>
        public long GetHashCount(string hashid)
        {
            return base.IClient.GetHashCount(hashid);
        }
        /// <summary>
        /// 获取hashid数据集中所有key的集合
        /// </summary>
        public List<string> GetHashKeys(string hashid)
        {
            return base.IClient.GetHashKeys(hashid);
        }
        /// <summary>
        /// 获取hashid数据集中的所有value集合
        /// </summary>
        public List<string> GetHashValues(string hashid)
        {
            return base.IClient.GetHashValues(hashid);
        }
        /// <summary>
        /// 获取hashid数据集中，key的value数据
        /// </summary>
        public string GetValueFromHash(string hashid, string key)
        {
            return base.IClient.GetValueFromHash(hashid, key);
        }
        /// <summary>
        /// 获取hashid数据集中，多个keys的value集合
        /// </summary>
        public List<string> GetValuesFromHash(string hashid, string[] keys)
        {
            return base.IClient.GetValuesFromHash(hashid, keys);
        }
        #endregion

        #region 删除
        /// <summary>
        /// 删除hashid数据集中的key数据
        /// </summary>
        public bool RemoveEntryFromHash(string hashid, string key)
        {
            return base.IClient.RemoveEntryFromHash(hashid, key);
        }

        public bool RemoveEntry(string hashid)
        {
            return IClient.Remove(hashid);
        }
        #endregion

        #region 其它
        /// <summary>
        /// 判断hashid数据集中是否存在key的数据
        /// </summary>
        public bool HashContainsEntry(string hashid, string key)
        {
            return base.IClient.HashContainsEntry(hashid, key);
        }
        /// <summary>
        /// 给hashid数据集key的value加countby，返回相加后的数据
        /// </summary>
        public double IncrementValueInHash(string hashid, string key, double countBy)
        {
            return base.IClient.IncrementValueInHash(hashid, key, countBy);
        }

        #endregion
    }
}
