import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useCurrentUser } from './useCurrentUser';
import { useLoginModal } from './useLoginModal';

interface IUseFavorite {
  listingId: string;
}

export const useFavorite = ({ listingId }: IUseFavorite) => {
  const loginModal = useLoginModal();

  const { data: currentUser, mutate } = useCurrentUser();

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
        const updatedFavoriteIds = res.data?.favoriteIds;
        mutate({
          ...currentUser,
          favoriteIds: updatedFavoriteIds,
        });
      } catch (error) {
        toast.error('Something went wrong.');
      }
    },
    [currentUser, hasFavorited, loginModal, listingId, mutate]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};
