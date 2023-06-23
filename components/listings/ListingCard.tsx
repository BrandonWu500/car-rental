import { TypeSafeListing } from '@/types';
import Image from 'next/image';

interface ListingCardProps {
  listing: TypeSafeListing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <div className="group col-span-1 cursor-pointer">
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            fill
            className="object-cover transition group-hover:scale-110"
            src={listing.imageSrc}
            alt="Listing"
          />
        </div>
      </div>
    </div>
  );
};
export default ListingCard;
