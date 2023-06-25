import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Range } from 'react-date-range';
import { toast } from 'react-hot-toast';

import { INITIAL_DATE_RANGE } from '@/constants';
import { SafeTypeListing } from '@/types';
import { differenceInDays } from 'date-fns';
import { useCurrentUser } from './useCurrentUser';
import { useLoginModal } from './useLoginModal';

interface IUseReservation {
  listing: SafeTypeListing;
}

export const useReservation = ({ listing }: IUseReservation) => {
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(INITIAL_DATE_RANGE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const createReservation = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);

    try {
      await axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      });

      toast.success('Listing reserved!');
      setDateRange(INITIAL_DATE_RANGE);
      router.push('/trips');
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [totalPrice, currentUser, router, loginModal, listing, dateRange]);

  return { createReservation, totalPrice, isLoading, dateRange, setDateRange };
};
