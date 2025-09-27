import { serviceApi } from '../api/service';

import { useQuery } from '@tanstack/react-query';

export function useFetchService() {
  return useQuery({
    queryKey: ['serviceList'],
    queryFn: serviceApi.fetchServiceList,
  });
}
