import Image from 'next/image';
import { useRouter } from 'next/router';

import { SafeTypeListing, SafeTypeReservation } from '@/types';

import { useDeleteReservation } from '@/hooks/useDeleteReservation';
import { differenceInDays, format } from 'date-fns';
import { useCallback, useMemo } from 'react';
import Button from '../Button';
import FavoriteButton from '../FavoriteButton';

interface ListingCardProps {
  listing: SafeTypeListing;
  reservation?: SafeTypeReservation;
}

const ListingCard = ({ listing, reservation }: ListingCardProps) => {
  const router = useRouter();
  const { isLoading, onDelete } = useDeleteReservation();

  const price = useMemo(() => {
    return reservation ? reservation.totalPrice : listing.price;
  }, [reservation, listing.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    const diffInDays = differenceInDays(end, start);

    return diffInDays >= 1
      ? `${format(start, 'PP')} - ${format(end, 'PP')} `
      : `${format(start, 'PP')}`;
  }, [reservation]);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (isLoading || !reservation) return;

      onDelete(reservation.id);
    },
    [isLoading, reservation, onDelete]
  );

  return (
    <div
      onClick={() => router.push(`/listings/${listing.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative mb-2 aspect-square w-full max-w-[400px] overflow-hidden rounded-xl">
          <Image
            fill
            className="object-cover transition group-hover:scale-110"
            src={listing.imageSrc}
            alt="Listing"
          />
          <div className="absolute right-3 top-3">
            <FavoriteButton listingId={listing.id} />
          </div>
        </div>
        <h3 className="text-xl font-bold">
          {listing.make} {listing.model}
        </h3>
        <p className="text-lg font-semibold">{listing.trim}</p>
        <p className="text-lg font-semibold">
          {listing.city}, {listing.state}
        </p>

        <p className="font-light text-neutral-500">
          {reservationDate ?? listing.category}
        </p>

        <div className="flex gap-1">
          <p className="font-semibold">$ {price} </p>
          {!reservation && <p className="font-light">/ day</p>}
        </div>

        {reservation && (
          <Button
            disabled={isLoading}
            size="small"
            label="Cancel Reservation"
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};
export default ListingCard;
