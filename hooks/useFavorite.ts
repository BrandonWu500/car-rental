import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useLoginModal } from './useLoginModal';

interface IUseFavorite {
  listingId: string;
  currentUser: User | null;
}

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let req;

        if (hasFavorited) {
          req = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          req = () => axios.post(`/api/favorites/${listingId}`);
        }

        const res = await req();
        router.reload();
        toast.success(res.data.message);
      } catch (error) {
        toast.error('Something wewnt wrong.');
      }
    },
    [currentUser, hasFavorited, loginModal, router, listingId]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};
