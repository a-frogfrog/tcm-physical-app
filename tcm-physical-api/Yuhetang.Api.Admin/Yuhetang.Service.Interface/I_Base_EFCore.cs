using System.Linq.Expressions;

namespace Yuhetang.Service.Interface
{
    public interface I_Base_EFCore<T>where T : class,new()
    {
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="t"></param>
        void Add(T t);
        /// <summary>
        /// 批量新增
        /// </summary>
        /// <param name="ie"></param>
        void AddRange(IEnumerable<T> ie);
        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="t"></param>
        void Delete(T t);
        /// <summary>
        /// 批量删除
        /// </summary>
        /// <param name="ie"></param>
        void DeleteRange(IEnumerable<T> ie);
        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="t"></param>
        void Update(T t);
        /// <summary>
        /// 批量修改
        /// </summary>
        /// <param name="ie"></param>
        void UpdateRange(IEnumerable<T> ie);
        /// <summary>
        /// 保存
        /// </summary>
        /// <returns></returns>
        int SaveChanges();

        Task<int> SaveChangesAsync();
        /// <summary>
        /// 查询
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        IQueryable<T> QueryAll(Expression<Func<T, bool>>? where = null);
        /// <summary>
        /// 查询并排序
        /// </summary>
        /// <typeparam name="t"></typeparam>
        /// <param name="isAsc"></param>
        /// <param name="order"></param>
        /// <param name="where"></param>
        /// <returns></returns>
        IQueryable<T> QueryAll<t>(bool isAsc = true, Expression<Func<T, t>>? order = null, Expression<Func<T, bool>>? where = null);
        /// <summary>
        /// 查询排序并分页
        /// </summary>
        /// <typeparam name="t"></typeparam>
        /// <param name="total"></param>
        /// <param name="skip"></param>
        /// <param name="take"></param>
        /// <param name="order"></param>
        /// <param name="where"></param>
        /// <returns></returns>
        IQueryable<T> QueryAll<t>(out int total, int skip = 1, int take = 10, bool isAsc = true, Expression<Func<T, t>>? order = null, Expression<Func<T, bool>>? where = null);
    }
}
