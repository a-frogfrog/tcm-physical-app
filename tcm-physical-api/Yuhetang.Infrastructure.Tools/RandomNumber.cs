namespace Yuhetang.Insfrastructure.Tools
{
    public static class RandomNumber
    {
        //线程锁
        public static object _lock = new object();
        public static int count = 1;

        /// <summary>
        /// 生成订单号
        /// </summary>
        /// <returns></returns>
        public static string GeneraOrderNumber()
        {
            lock (_lock)
            {
                if (count >= 10000)
                {
                    count = 1;
                }
                var number = "P" + DateTime.Now.ToString("yyMMddHHmmss") + count.ToString("0000");
                count++;
                return number;
            }
        }

        /// <summary>
        /// 生成预约号
        /// </summary>
        /// <returns></returns>
        public static string GeneraAppointmentNumber()
        {
            lock (_lock)
            {
                if (count >= 10000)
                {
                    count = 1;
                }
                var number = "R" + DateTime.Now.ToString("yyMMddHHmmss") + count.ToString("0000");
                count++;
                return number;
            }
        }

        public static string GeneraOrderNumber2()
        {
            lock (_lock)
            {
                return "T" + DateTime.Now.Ticks;

            }
        }

        public static string GeneraOrderNumber3()
        {
            lock (_lock)
            {
                Random ran = new Random();
                return "U" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + ran.Next(1000, 9999).ToString();
            }
        }

    }
}
