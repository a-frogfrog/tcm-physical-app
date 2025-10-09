import { useMutation } from '@tanstack/react-query';
import { bookingApi } from '../api/booking';

export function useNewBooking() {
  return useMutation({
    mutationKey: ['newBooking'],
    mutationFn: bookingApi.newBooking,
  });
}
