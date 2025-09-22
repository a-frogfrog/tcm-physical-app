import { useMemo } from 'react';
import { services } from '../constants';
import { useBookingStore } from '../store';

export const useBooking = () => {
  const booking = useBookingStore((state) => state.booking);
  const setBooking = useBookingStore((state) => state.setBooking);
  const setStep = useBookingStore((state) => state.setStep);
  function formatDateForId(iso?: string) {
    if (!iso) return '';
    const d = new Date(iso);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  // 辅助函数
  function formatDateReadable(iso?: string) {
    if (!iso) return '--';
    const d = new Date(iso);
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${weekdays[d.getDay()]}`;
  }

  function handleSubmit() {
    const rand = Math.floor(1000 + Math.random() * 9000);
    const id = `TCM${formatDateForId(booking.date)}${rand}`;
    setBooking({ ...booking, bookingId: id });
    setStep(4);
  }

  const selectedService = useMemo(
    () => services.find((s) => s.id === booking.serviceId),
    [booking.serviceId],
  );

  return {
    formatDateForId,
    formatDateReadable,
    handleSubmit,
    selectedService,
  };
};
