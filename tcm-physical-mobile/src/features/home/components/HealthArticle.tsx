export default function HealthArticle() {
  return (
    <article className='mx-auto max-w-3xl space-y-8 rounded-2xl bg-white p-6 shadow-md'>
      {/* 标题区 */}
      <header className='space-y-2 text-center'>
        <h1 className='text-2xl font-bold text-green-700 sm:text-3xl'>
          秋季养生：润燥安神的饮食与习惯
        </h1>
        <p className='text-sm text-gray-500'>掌握这些小技巧，让身体更轻松</p>
        <img
          src='https://images.unsplash.com/photo-1505577058444-a3dab90d4253?auto=format&fit=crop&w=1200&q=80'
          alt='养生茶'
          className='h-60 w-full rounded-lg object-cover'
        />
      </header>

      {/* 导语 */}
      <section className='leading-relaxed text-gray-700'>
        养生并不是老年人的专属，而是每一个关注健康的人都需要的日常。
        今天，我们分享一些简单易行的秋季养生小方法，让你身心舒畅。
      </section>

      {/* 正文模块 */}
      <section className='space-y-6'>
        <div>
          <h2 className='flex items-center text-xl font-semibold text-green-600'>
            🍵 饮食调养
          </h2>
          <p className='mt-2 leading-relaxed text-gray-700'>
            多吃滋阴润燥的食物：梨、百合、银耳、蜂蜜；
            少吃辛辣刺激的食物，避免伤阴上火。
          </p>
        </div>

        <div>
          <h2 className='flex items-center text-xl font-semibold text-green-600'>
            🌙 作息规律
          </h2>
          <p className='mt-2 leading-relaxed text-gray-700'>
            早睡早起，保证充足睡眠； 午后小憩 15–30 分钟，帮助缓解疲劳。
          </p>
        </div>

        <div>
          <h2 className='flex items-center text-xl font-semibold text-green-600'>
            🏃‍♂️ 运动养生
          </h2>
          <p className='mt-2 leading-relaxed text-gray-700'>
            散步、慢跑、太极、瑜伽都是不错的选择； 每天坚持 20–30
            分钟，避免过度剧烈运动。
          </p>
        </div>

        <div>
          <h2 className='flex items-center text-xl font-semibold text-green-600'>
            🧘 情志调养
          </h2>
          <p className='mt-2 leading-relaxed text-gray-700'>
            保持心情平和，听音乐、读书、冥想都有助于舒缓压力。
          </p>
        </div>
      </section>

      {/* 总结 */}
      <footer className='border-t pt-4 text-center'>
        <p className='font-medium text-gray-700'>
          健康养生，不在于复杂的补品，而在于日常的坚持与细心呵护。
        </p>
        <button className='mt-4 rounded-full bg-green-600 px-6 py-2 text-white transition hover:bg-green-700'>
          立即预约养生体验
        </button>
      </footer>
    </article>
  );
}
