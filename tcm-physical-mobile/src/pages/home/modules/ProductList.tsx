import { Button } from '#/components/ui';
interface Product {
  id: number;
  title: string;
  desc: string;
  price: number;
  commission: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    title: '中医问诊套餐',
    desc: '专业中医师辨证问诊、体质分析、健康评估及个性化调理建议',
    price: 199,
    commission: 39,
    image: 'https://picsum.photos/400/200?1',
  },
  {
    id: 2,
    title: '针灸理疗套餐',
    desc: '专业针灸治疗，针对颈肩腰腿痛、失眠、亚健康等问题',
    price: 299,
    commission: 79,
    image: 'https://picsum.photos/400/200?2',
  },
];
const ProductList = () => {
  return (
    <div className='mx-auto w-full max-w-md bg-gray-50 px-4 py-4'>
      {/* 标题区块 */}
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-lg font-bold text-green-800'>热门推广商品</h3>
        <button className='text-sm text-gray-500'>查看更多 &gt;</button>
      </div>

      {/* 商品卡片 */}
      <div className='space-y-4'>
        {products.map((item) => (
          <div
            key={item.id}
            className='overflow-hidden rounded-xl bg-white p-3 shadow'>
            {/* 商品图片 */}
            <div className='relative'>
              <img
                src={item.image}
                alt={item.title}
                className='h-40 w-full rounded-lg object-cover'
              />
              {/* 佣金角标 */}
              <span className='absolute top-2 right-2 rounded-full bg-yellow-500 px-2 py-1 text-xs text-white'>
                佣金 ¥{item.commission}
              </span>
            </div>

            {/* 商品信息 */}
            <div className='mt-3'>
              <h4 className='text-base font-semibold text-gray-800'>
                {item.title}
              </h4>
              <p className='mt-1 text-sm text-gray-600'>{item.desc}</p>

              <div className='mt-3 flex items-center justify-between'>
                <span className='text-lg font-bold text-green-700'>
                  ¥{item.price}
                </span>
                <Button className='rounded-full bg-green-50 text-green-700 hover:bg-green-100'>
                  推广商品
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
