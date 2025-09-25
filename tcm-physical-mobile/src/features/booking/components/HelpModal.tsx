import { useBookingStore } from '../store';

const HelpModal = () => {
  const setHelpOpen = useBookingStore((state) => state.setHelpOpen);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='mx-4 max-h-[80vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-xl font-bold text-[#8B4513]'>预约帮助</h3>
          <button
            onClick={() => setHelpOpen(false)}
            className='text-gray-500 hover:text-gray-700'></button>
        </div>
        <div className='space-y-4 text-gray-700'>
          <div>
            <h4 className='font-bold text-[#8B4513]'>如何预约中医服务？</h4>
            <p className='mt-1 text-sm'>
              您可以通过选择服务类型、预约日期和时间，填写联系信息完成预约。
            </p>
          </div>
          <div>
            <h4 className='font-bold text-[#8B4513]'>如何取消或修改预约？</h4>
            <p className='mt-1 text-sm'>
              请提前2小时拨打客服电话400-123-4567取消或修改预约。
            </p>
          </div>
          <div>
            <h4 className='font-bold text-[#8B4513]'>预约需要提前多久？</h4>
            <p className='mt-1 text-sm'>
              建议至少提前1天预约，特殊服务可能需要提前3天预约。
            </p>
          </div>
          <div>
            <h4 className='font-bold text-[#8B4513]'>首次就诊需要准备什么？</h4>
            <p className='mt-1 text-sm'>
              请携带有效身份证件，如之前有相关检查报告也可一并带来。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
