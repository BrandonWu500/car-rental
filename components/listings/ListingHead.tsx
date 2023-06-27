import Image from 'next/image';
import FavoriteButton from '../FavoriteButton';
import Heading from '../Heading';

interface ListingHeadProps {
  make: string;
  model: string;
  trim: string;
  state: string;
  city: string;
  imageSrc: string;
  id: string;
}

const ListingHead = ({
  make,
  model,
  state,
  city,
  trim,
  imageSrc,
  id,
}: ListingHeadProps) => {
  const title = `${make} ${model} - ${trim}`;
  const subtitle = `${city}, ${state}`;

  return (
    <>
      <Heading title={title} subtitle={subtitle} />
      <div className="relative mt-4 h-[60vh] w-full overflow-hidden rounded-xl">
        <Image src={imageSrc} fill className="object-cover" alt="Car" />
        <div className="absolute right-5 top-5">
          <FavoriteButton listingId={id} />
        </div>
      </div>
    </>
  );
};
export default ListingHead;
