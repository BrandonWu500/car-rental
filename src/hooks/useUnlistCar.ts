import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

export const useUnlistCar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(async (id: string) => {
    setIsLoading(true);

    try {
      await axios.delete(`/api/listings/${id}`);
      toast.success('Car unlisted');
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { onDelete, isLoading };
};
