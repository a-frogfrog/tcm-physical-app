using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Yuhetang.Repository.Interface;

namespace Yuhetang.Repository.Instance
{
    public class MySql_Repository<T> : I_MySql_Repository<T> where T : class, new()
    {
        private readonly DbContext _dbContext;

        public MySql_Repository(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Add(T t)
        {
            _dbContext.Set<T>().Add(t);
        }

        public void AddRange(IEnumerable<T> ie)
        {
            _dbContext.Set<T>().AddRange(ie);
        }

        public void Delete(T t)
        {
            _dbContext.Set<T>().Remove(t);
        }

        public void DeleteRange(IEnumerable<T> ie)
        {
            _dbContext.Set<T>().RemoveRange(ie);
        }

        public IQueryable<T> QueryAll(Expression<Func<T, bool>>? where = null)
        {
            var iq = _dbContext.Set<T>();

            return where == null ? iq : iq.Where(where);
        }

        public IQueryable<T> QueryAll<t>(bool isAsc = true, Expression<Func<T, t>>? order = null, Expression<Func<T, bool>>? where = null)
        {
            var iq = QueryAll(where);
            return isAsc ? iq.OrderBy(order!) : iq.OrderByDescending(order!);
        }

        public IQueryable<T> QueryAll<t>(out int total, int skip = 1, int take = 10, bool isAsc = true, Expression<Func<T, t>>? order = null, Expression<Func<T, bool>>? where = null)
        {
            var iq = QueryAll(isAsc, order, where);
            total = iq.Count();
            return iq.Skip(skip).Take(take);

        }

        public int SaveChanges()
        {
            return _dbContext.SaveChanges();
        }

        public Task<int> SaveChangesAsync()
        {
            return _dbContext.SaveChangesAsync();
        }

        public void Update(T t)
        {
            _dbContext.Update(t);
        }

        public void UpdateRange(IEnumerable<T> ie)
        {
            _dbContext.UpdateRange(ie);
        }
    }
}
