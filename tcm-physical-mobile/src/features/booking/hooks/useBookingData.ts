import { useQuery } from '@tanstack/react-query';

import { bookingApi } from '../api/booking';

export function useBookingServiceList() {
  return useQuery({
    queryKey: ['booking_service_list'],
    queryFn: bookingApi.fetchServiceList,
  });
}
