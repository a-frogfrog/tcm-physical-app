import ServiceSection from './components/ServiceSection';
import TimeSection from './components/TimeSection';
import ConformSection from './components/ConformSection';
import SuccessSection from './components/SuccessSection';
import HelpModal from './components/HelpModal';
import StepIndicator from './components/StepIndicator';
import { useBookingStore } from './store';

export default function BookingPage() {
  const step = useBookingStore((state) => state.step);
  const helpOpen = useBookingStore((state) => state.helpOpen);

  return (
    <div className='bg-[rgb(245,245,220)] font-sans text-[#3E2723]'>
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

      {/* 帮助弹窗 */}
      {helpOpen && <HelpModal />}
    </div>
  );
}
