namespace Yuhetang.Infrastructure.Attr
{
    /// <summary>
    /// 
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    public class Action_Attribute:Attribute
    {
        public string Group { get; set; }

        public string Action { get; set; }
    }
}
