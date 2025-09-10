using Yuhetang.Infrastructure.Attr;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Yuhetang.Infrastructure.IOC
{
    public static class Inject_Help
    {
        /// <summary>
        /// 这是我写的一个批量注入的扩展方法
        /// </summary>
        /// <param name="services"></param>
        /// <param name="providers"></param>
        /// <param name="injects"></param>
        public static void AddScoped(this IServiceCollection services, Assembly providers, Assembly injects)
        {
            var prs = providers.GetTypes()
                .Where(d => d.GetCustomAttribute(typeof(Provider_Attribute)) != null).ToList();

            var ins = injects.GetTypes().Where(d => d.GetCustomAttribute(typeof(Inject_Attribute)) != null).ToList();

            prs.ForEach(d =>
            {
                //IsAssignableFrom 判断一个类是否是另一个类的子类(符合里氏替换原则的子类)
                var list = ins.Where(e => d.IsAssignableFrom(e)).ToList();
                list.ForEach(e =>
                {
                    services.AddScoped(d, e);//使用原方法注入
                });
            });

            //在C#种扩展方法就是在不更改类的源码的情况下为类追加新的方法
            //非常符合开闭原则

        }

        /// <summary>
        /// 这是我写的一个批量注入的扩展方法
        /// </summary>
        /// <param name="services"></param>
        /// <param name="providers"></param>
        /// <param name="injects"></param>
        public static void AddTransient(this IServiceCollection services, Assembly providers, Assembly injects)
        {
            var prs = providers.GetTypes()
                .Where(d => d.GetCustomAttribute(typeof(Provider_Attribute)) != null).ToList();

            var ins = injects.GetTypes().Where(d => d.GetCustomAttribute(typeof(Inject_Attribute)) != null).ToList();

            prs.ForEach(d =>
            {
                //IsAssignableFrom 判断一个类是否是另一个类的子类(符合里氏替换原则的子类)
                var list = ins.Where(e => d.IsAssignableFrom(e)).ToList();
                list.ForEach(e =>
                {
                    services.AddTransient(d, e);//使用原方法注入
                });
            });

            //在C#种扩展方法就是在不更改类的源码的情况下为类追加新的方法
            //非常符合开闭原则

        }

        /// <summary>
        /// 这是我写的一个批量注入的扩展方法
        /// </summary>
        /// <param name="services"></param>
        /// <param name="providers"></param>
        /// <param name="injects"></param>
        public static void AddSingleton(this IServiceCollection services, Assembly providers, Assembly injects)
        {
            var prs = providers.GetTypes()
                .Where(d => d.GetCustomAttribute(typeof(Provider_Attribute)) != null).ToList();

            var ins = injects.GetTypes().Where(d => d.GetCustomAttribute(typeof(Inject_Attribute)) != null).ToList();

            prs.ForEach(d =>
            {
                //IsAssignableFrom 判断一个类是否是另一个类的子类(符合里氏替换原则的子类)
                var list = ins.Where(e => d.IsAssignableFrom(e)).ToList();
                list.ForEach(e =>
                {
                    services.AddSingleton(d, e);//使用原方法注入
                });
            });

            //在C#种扩展方法就是在不更改类的源码的情况下为类追加新的方法
            //非常符合开闭原则

        }

    }
}
