namespace Yuhetang.Infrastructure.Attr
{
    /// <summary>
    /// 权限属性
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
    public class Right_Attribute : Attribute
    {
        /// <summary>
        /// 该权限依附于哪一些页面存在
        /// </summary>
        public string urls { get; set; }

    }
}
