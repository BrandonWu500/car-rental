import { SafeTypeReservation } from '@/types';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { KeyedMutator } from 'swr';

export const useDeleteReservation = (
  reservations: SafeTypeReservation[],
  mutate: KeyedMutator<any>
) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(
    async (id: string) => {
      setIsLoading(true);

      try {
        await axios.delete(`/api/reservations/${id}`);
        toast.success('Reservation cancelled');
        const newReservations = reservations.filter(
          (reservation) => reservation.id !== id
        );
        mutate(newReservations);
      } catch (error) {
        toast.error('Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    },
    [reservations, mutate]
  );

  return { onDelete, isLoading };
};
