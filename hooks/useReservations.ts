import { fetcher } from '@/libs/fetcher';
import { eachDayOfInterval } from 'date-fns';
import useSWR from 'swr';

export const useReservations = () => {
  const {
    data: reservations,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/reservations', fetcher, {
    revalidateOnMount: true,
    revalidateOnReconnect: true,
  });

  let disabledDates: Date[] = [];

  if (reservations) {
    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      disabledDates = [...disabledDates, ...range];
    });
  }

  return {
    reservations,
    error,
    isLoading,
    mutate,
    disabledDates,
  };
};
