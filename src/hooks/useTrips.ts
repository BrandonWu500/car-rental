import { fetcher } from '@/libs/fetcher';
import useSWR from 'swr';

export const useTrips = (userId: string) => {
  const {
    data: trips,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/trips/${userId}`, fetcher, {
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    revalidateOnFocus: true,
    refreshInterval: 15,
  });

  return {
    trips,
    error,
    isLoading,
    mutate,
  };
};
