import { useCountries } from '@/hooks/useCountries';
import { TypeSafeListing } from '@/types';
import Image from 'next/image';

interface ListingCardProps {
  listing: TypeSafeListing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const { getByValue } = useCountries();

  const location = getByValue(listing.locationValue);

  return (
    <div className="group col-span-1 cursor-pointer">
      <div className="flex w-full flex-col gap-2">
        <div className="relative mb-2 aspect-square w-full max-w-[400px] overflow-hidden rounded-xl">
          <Image
            fill
            className="object-cover transition group-hover:scale-110"
            src={listing.imageSrc}
            alt="Listing"
          />
        </div>
        <h3 className="text-xl font-bold">
          {listing.make} {listing.model}
        </h3>
        <p className="text-lg font-semibold">{listing.trim}</p>
        <p className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </p>

        <p className="font-semibold">$ {listing.price} / hr</p>
      </div>
    </div>
  );
};
export default ListingCard;
