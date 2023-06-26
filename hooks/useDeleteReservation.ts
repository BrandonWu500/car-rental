import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

export const useDeleteReservation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(async (id: string) => {
    setIsLoading(true);

    try {
      await axios.delete(`/api/reservations/${id}`);
      toast.success('Reservation cancelled');
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { onDelete, isLoading };
};
