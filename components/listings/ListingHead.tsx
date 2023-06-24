import { useCountries } from '@/hooks/useCountries';
import Image from 'next/image';
import Heading from '../Heading';

interface ListingHeadProps {
  make: string;
  model: string;
  trim: string;
  locationValue: string;
  imageSrc: string;
}

const ListingHead = ({
  make,
  model,
  trim,
  locationValue,
  imageSrc,
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
      </div>
    </>
  );
};
export default ListingHead;
