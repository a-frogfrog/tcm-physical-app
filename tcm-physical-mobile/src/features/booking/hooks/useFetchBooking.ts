import { useMutation, useQuery } from '@tanstack/react-query';
import { bookingApi } from '../api/booking';
import type { ApiResponsePageRequest } from '#/types/api';

export function useNewBooking() {
  return useMutation({
    mutationKey: ['newBooking'],
    mutationFn: bookingApi.newBooking,
  });
}

export function useFetchMyBookings(params: ApiResponsePageRequest) {
  return useQuery({
    queryKey: ['fetchMyBookings', params],
    queryFn: () => bookingApi.fetchMyBookings(params),
    enabled: !!params.page && !!params.limit,
  });
}
