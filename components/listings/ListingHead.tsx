import { useCountries } from '@/hooks/useCountries';
import Image from 'next/image';
import FavoriteButton from '../FavoriteButton';
import Heading from '../Heading';

interface ListingHeadProps {
  make: string;
  model: string;
  trim: string;
  locationValue: string;
  imageSrc: string;
  id: string;
}

const ListingHead = ({
  make,
  model,
  trim,
  locationValue,
  imageSrc,
  id,
}: ListingHeadProps) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);
  const title = `${make} ${model} - ${trim}`;
  const subtitle = `${location?.region}, ${location?.label}`;

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
