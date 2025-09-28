import {
  ServiceSection,
  TimeSection,
  ConformSection,
  SuccessSection,
  HelpModal,
  StepIndicator,
} from '#/features/booking/components';

import { useBookingStore } from '#/features/booking/store';

import { useFetchService } from '#/features/services/hooks/useFetchService';
import { Loader } from '#/components/common';
import { services } from '#/features/booking/constants';

export default function BookingRoute() {
  const step = useBookingStore((state) => state.step);
  const helpOpen = useBookingStore((state) => state.helpOpen);

  const { data: serviceData, isLoading } = useFetchService();

  console.log(services);
  return (
    <div className='bg-[rgb(245,245,220)] font-sans text-[#3E2723]'>
      <div className='container mx-auto px-4 py-6'>
        {/* 进度指示 */}
        <StepIndicator step={step} />

        {/* 步骤 1: 服务选择 */}
        {isLoading && <Loader className='scale-50' />}
        {step === 1 && <ServiceSection services={serviceData || []} />}

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
