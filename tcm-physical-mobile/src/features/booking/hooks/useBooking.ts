import { useMemo } from 'react';
import { services } from '../constants';

import { useBookingStore } from '../store';

import { useFormatDate } from '#/hooks';
import { useAuthStore } from '#/store';
import { useNewBooking } from './useFetchBooking';

export const useBooking = () => {
  const booking = useBookingStore((state) => state.booking);
  const setBooking = useBookingStore((state) => state.setBooking);
  const setStep = useBookingStore((state) => state.setStep);

  const { formatDateForId } = useFormatDate();
  const user = useAuthStore((state) => state.user);

  const { mutate: newBooking } = useNewBooking();

  function handleSubmit() {
    const rand = Math.floor(1000 + Math.random() * 9000);
    const id = `TCM${formatDateForId(booking.date)}${rand}`;
    setBooking({ ...booking, bookingId: id });
    setStep(4);

    const [startTime, endTime] = booking.time?.split(' - ') || [];

    const newBookingRequest = {
      customerId: user?.id || '',
      serviceId: booking.serviceId || '',
      productPackageId: '',
      bookingStartTime: `${booking.date} ${startTime}`,
      bookingEndTime: `${booking.date} ${endTime}`,
    };

    console.log(newBookingRequest);
    newBooking(newBookingRequest);
  }

  const selectedService = useMemo(
    () => services.find((s) => s.id === booking.serviceId),
    [booking.serviceId],
  );

  return {
    handleSubmit,
    selectedService,
  };
};
