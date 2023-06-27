import { fetcher } from '@/libs/fetcher';
import useSWR from 'swr';

export const useCars = (userId: string) => {
  const {
    data: cars,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/cars/${userId}`, fetcher, {
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    revalidateOnFocus: true,
    refreshInterval: 15,
  });

  return {
    cars,
    error,
    isLoading,
    mutate,
  };
};
