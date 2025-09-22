import HealthArticleCard from './components/HealthArticleCard';
import PromotionCard from './components/PromotionCard';
import PromotionTools from './components/PromotionTools';

export default function HomePage() {
  return (
    <div className='container mx-auto'>
      <PromotionCard
        totalUsers={1000}
        usersGrowth={12}
        totalReward={10000}
        rewardGrowth={8}
        withdrawable={5000}
      />
      <PromotionTools />
      <div className='mt-8 px-2'>
        <HealthArticleCard
          title='健康养生'
          subtitle='从饮食到心理，科学养生指南'
          imageUrl='https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
          highlights={[
            { text: '秋季润燥护肺的5个关键要点' },
            { text: '每天10分钟冥想改善焦虑和压力' },
            { text: '告别失眠：健康睡眠习惯养成' },
          ]}
          onCta={() => {
            // 跳转或打开文章列表
            window.location.href = '/articles/health';
          }}
        />
      </div>
    </div>
  );
}
