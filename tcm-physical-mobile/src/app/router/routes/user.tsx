import { Button, Card, CardContent, Progress } from '#/components/ui';

export default function UserRoute() {
  return (
    <div className='mx-auto'>
      {/* Header */}
      <div className='relative rounded-b-2xl bg-blue-100 p-6 text-center'>
        {/* 左上角齿轮 */}
        <button className='absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow'>
          ⚙️
        </button>

        {/* 右上角关闭 */}
        <button className='absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow'>
          ❌
        </button>

        {/* Title */}
        <h2 className='text-xl font-semibold'>黄</h2>
        <p className='text-sm text-gray-600'>19042429394</p>

        {/* Illustration Placeholder */}
        <div className='mt-4 flex justify-center'>
          <div className='flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-red-400 to-purple-300 text-3xl'>
            😊
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className='p-4'>
        <p className='mb-2 text-sm text-gray-600'>
          You’re managing many moments better. Revise your signs to catch every
          moment.
        </p>
        <div className='mb-2 flex items-center space-x-2'>
          <span className='font-medium text-blue-500'>Lv. 4</span>
          <Progress value={58} className='h-2 flex-1' />
          <span className='text-sm text-gray-700'>58%</span>
        </div>
      </div>

      {/* Hidden Qualities */}
      <Card className='mx-4 mb-4 bg-gray-50'>
        <CardContent className='p-4 text-center'>
          <p className='text-2xl font-bold text-green-600'>18.42￥</p>
          <p className='font-lxgw text-xl font-bold text-gray-700'>你的余额</p>
          <p className='font-smiley mb-3 text-sm text-gray-500'>
            See what qualities and growth areas friends and family see in you…
          </p>
          <Button className='w-full bg-green-500 hover:bg-green-700'>
            提现
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className='space-y-3 px-4 pb-6'>
        <Card>
          <CardContent className='p-3 text-center'>
            <p className='font-semibold text-gray-900'>6/24</p>
            <p className='text-sm font-medium text-gray-500'>已完成推广</p>
          </CardContent>
        </Card>

        <div className='grid grid-cols-2 gap-3'>
          <Card>
            <CardContent className='p-3 text-center'>
              <p className='font-semibold text-red-500'>4</p>
              <p className='text-sm text-gray-500'>我的订单</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-3 text-center'>
              <p className='font-semibold text-yellow-500'>31m</p>
              <p className='text-sm text-gray-500'>我的预约</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
