using System.Linq.Expressions;
using System.Transactions;
using Yuhetang.Repository.Interface;
using Yuhetang.Service.Interface;

namespace Yuhetang.Service.EFCore
{
    public class Base_EFCore<T> : I_Base_EFCore<T> where T : class, new()
    {
        private readonly I_MySql_Repository<T> _repository;

        public Base_EFCore(I_MySql_Repository<T> repository)
        {
            _repository = repository;
        }

        public void Add(T t)
        {
            _repository.Add(t);
        }

        public void AddRange(IEnumerable<T> ie)
        {
            _repository.AddRange(ie);
        }

        public void Delete(T t)
        {
            _repository.Delete(t);
        }

        public void DeleteRange(IEnumerable<T> ie)
        {
            _repository.DeleteRange(ie);
        }

        public IQueryable<T> QueryAll(Expression<Func<T, bool>>? where = null)
        {
            return _repository.QueryAll(where);
        }

        public IQueryable<T> QueryAll<t>(bool isAsc = true, Expression<Func<T, t>>? order = null, Expression<Func<T, bool>>? where = null)
        {
            return _repository.QueryAll(isAsc, order, where);
        }

        public IQueryable<T> QueryAll<t>(out int total, int page = 1, int limit = 10, bool isAsc = true, Expression<Func<T, t>>? order = null, Expression<Func<T, bool>>? where = null)
        {
            return _repository.QueryAll(out total,(page-1)*limit,limit,isAsc,order,where);
        }

        public int SaveChanges()
        {
            return _repository.SaveChanges();
        }

        public Task<int> SaveChangesAsync()
        {
            return _repository.SaveChangesAsync();
        }

        public void Update(T t)
        {
            _repository.Update(t);
        }

        public void UpdateRange(IEnumerable<T> ie)
        {
            _repository.UpdateRange(ie);
        }

        //添加分布式事务的方法 

        /// <summary>
        /// 分布式事务处理 同时处理2张表
        /// </summary>
        /// <typeparam name="T1"></typeparam>
        /// <param name="bs">上下文对象2</param>
        /// <returns></returns>
        public bool Transactions<T1>(I_Base_EFCore<T1> bs)
           where T1 : class, new()
        {
            try
            {
                //分布式事务 
                using (TransactionScope transactionScope = new TransactionScope())
                {
                    this.SaveChanges();
                    bs.SaveChanges();
                    transactionScope.Complete();//提交事务
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        /// <summary>
        /// 分布式事务处理 同时处理3张表
        /// </summary>
        /// <typeparam name="T1"></typeparam>
        /// <typeparam name="T2"></typeparam>
        /// <param name="bs">上下文对象1</param>
        /// <param name="bs2">上下文对象2</param>
        /// <returns></returns>
        public bool Transactions<T1, T2>(I_Base_EFCore<T1> bs, I_Base_EFCore<T2> bs2)
           where T1 : class, new()
           where T2 : class, new()
        {
            try
            {
                using (TransactionScope transactionScope = new TransactionScope())
                {
                    this.SaveChanges();
                    bs.SaveChanges();
                    bs2.SaveChanges();
                    transactionScope.Complete();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        /// <summary>
        /// 事务处理 同时处理4张表
        /// </summary>
        /// <typeparam name="T1"></typeparam>
        /// <typeparam name="T2"></typeparam>
        /// <param name="bs">上下文对象1</param>
        /// <param name="bs2">上下文对象2</param>
        /// <param name="bs2">上下文对象3</param>
        /// <returns></returns>
        public bool Transactions<T1, T2, T3>(I_Base_EFCore<T1> bs, I_Base_EFCore<T2> bs2, I_Base_EFCore<T3> bs3)
           where T1 : class, new()
           where T2 : class, new()
            where T3 : class, new()
        {
            try
            {
                using (TransactionScope transactionScope = new TransactionScope())
                {
                    this.SaveChanges();
                    bs.SaveChanges();
                    bs2.SaveChanges();
                    bs3.SaveChanges();
                    transactionScope.Complete();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        /// <summary>
        /// 事务处理 同时处理4张表
        /// </summary>
        /// <typeparam name="T1"></typeparam>
        /// <typeparam name="T2"></typeparam>
        /// <param name="bs">上下文对象1</param>
        /// <param name="bs2">上下文对象2</param>
        /// <param name="bs2">上下文对象3</param>
        /// <returns></returns>
        public bool Transactions<T1, T2, T3, T4>(I_Base_EFCore<T1> bs, I_Base_EFCore<T2> bs2, I_Base_EFCore<T3> bs3, I_Base_EFCore<T4> bs4)
           where T1 : class, new()
           where T2 : class, new()
            where T3 : class, new()
              where T4 : class, new()
        {
            try
            {
                using (TransactionScope transactionScope = new TransactionScope())
                {
                    this.SaveChanges();
                    bs.SaveChanges();
                    bs2.SaveChanges();
                    bs3.SaveChanges();
                    bs4.SaveChanges();
                    transactionScope.Complete();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        /// <summary>
        /// 事务处理 同时处理5张表
        /// </summary>
        /// <typeparam name="T1"></typeparam>
        /// <typeparam name="T2"></typeparam>
        /// <param name="bs">上下文对象1</param>
        /// <param name="bs2">上下文对象2</param>
        /// <param name="bs2">上下文对象3</param>
        /// <returns></returns>
        public bool Transactions<T1, T2, T3, T4, T5>(I_Base_EFCore<T1> bs, I_Base_EFCore<T2> bs2, I_Base_EFCore<T3> bs3, I_Base_EFCore<T4> bs4, I_Base_EFCore<T5> bs5)
           where T1 : class, new()
           where T2 : class, new()
            where T3 : class, new()
            where T4 : class, new()
            where T5 : class, new()
        {
            try
            {
                using (TransactionScope transactionScope = new TransactionScope())
                {
                    this.SaveChanges();
                    bs.SaveChanges();
                    bs2.SaveChanges();
                    bs3.SaveChanges();
                    bs4.SaveChanges();
                    bs5.SaveChanges();
                    transactionScope.Complete();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        /// <summary>
        /// 事务处理 同时处理6张表
        /// </summary>
        /// <typeparam name="T1"></typeparam>
        /// <typeparam name="T2"></typeparam>
        /// <param name="bs">上下文对象1</param>
        /// <param name="bs2">上下文对象2</param>
        /// <param name="bs2">上下文对象3</param>
        /// <returns></returns>
        public bool Transactions<T1, T2, T3, T4, T5, T6>(I_Base_EFCore<T1> bs,
            I_Base_EFCore<T2> bs2,
            I_Base_EFCore<T3> bs3,
            I_Base_EFCore<T4> bs4,
            I_Base_EFCore<T5> bs5,
            I_Base_EFCore<T6> bs6
            )
           where T1 : class, new()
           where T2 : class, new()
            where T3 : class, new()
            where T4 : class, new()
            where T5 : class, new()
            where T6 : class, new()
        {
            try
            {
                using (TransactionScope transactionScope = new TransactionScope())
                {
                    this.SaveChanges();
                    bs.SaveChanges();
                    bs2.SaveChanges();
                    bs3.SaveChanges();
                    bs4.SaveChanges();
                    bs5.SaveChanges();
                    bs6.SaveChanges();
                    transactionScope.Complete();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }
}
