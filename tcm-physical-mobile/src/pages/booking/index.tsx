import ServiceSection from './modules/ServiceSection';
import TimeSection from './modules/TimeSection';
import ConformSection from './modules/ConformSection';
import SuccessSection from './modules/SuccessSection';
import HelpModal from './modules/HelpModal';
import StepIndicator from './modules/StepIndicator';
import { useBookingStore } from './store';

export default function BookingPage() {
  const step = useBookingStore((state) => state.step);
  const helpOpen = useBookingStore((state) => state.helpOpen);

  return (
    <div className='min-h-screen bg-[rgb(245,245,220)] font-sans text-[#3E2723]'>
      <div className='container mx-auto px-4 py-6'>
        {/* 进度指示 */}
        <StepIndicator step={step} />

        {/* 步骤 1: 服务选择 */}
        {step === 1 && <ServiceSection />}

        {/* 步骤 2: 时间选择 */}
        {step === 2 && <TimeSection />}

        {/* 步骤 3: 确认 */}
        {step === 3 && <ConformSection />}

        {/* 成功页 */}
        {step === 4 && <SuccessSection />}
      </div>

      <BookingFooter />

      {/* 帮助弹窗 */}

      {helpOpen && <HelpModal />}
    </div>
  );
}

const BookingFooter = () => {
  return (
    <div className='mt-8 bg-[#8B4513]/10 py-4'>
      <div className='container mx-auto px-4 text-center text-sm text-gray-600'>
        <p>© {new Date().getFullYear()} 中医馆. 保留所有权利</p>
        <p className='mt-1'>客服电话：400-123-4567</p>
      </div>
    </div>
  );
};
