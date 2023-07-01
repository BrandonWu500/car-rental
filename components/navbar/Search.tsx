import { useRouter } from 'next/router';
import { BiSearch } from 'react-icons/bi';

import { useSearchModal } from '@/hooks/useSearchModal';
import { differenceInDays } from 'date-fns';
import { useMemo } from 'react';

const Search = () => {
  const searchModal = useSearchModal();
  const router = useRouter();

  const { state, city, startDate, endDate, passengerCount } = router.query;

  const locationLabel = useMemo(() => {
    if (state && city) {
      return `${city}, ${state}`;
    }

    return 'Anywhere in US';
  }, [state, city]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      const diff = differenceInDays(end, start) + 1;

      return diff === 1 ? `${diff} day` : `${diff} days`;
    }

    return 'Any Week';
  }, [startDate, endDate]);

  const passengerLabel = useMemo(() => {
    if (passengerCount) {
      return Number(passengerCount) === 1
        ? `${passengerCount} passenger`
        : `${passengerCount} passengers`;
    }

    return 'Add Passengers';
  }, [passengerCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="w-full cursor-pointer rounded-full border-[1px] py-2
  shadow-sm transition hover:shadow-md md:w-auto"
    >
      <div className="flex items-center justify-between">
        <div className="px-6 text-sm font-semibold">{locationLabel}</div>
        <div
          className="hidden flex-1 border-x-[1px] px-6
        text-center text-sm font-semibold capitalize sm:block"
        >
          {durationLabel}
        </div>
        <div
          className="flex items-center gap-3 pl-6
        pr-2 text-sm text-gray-600"
        >
          <div className="hidden capitalize sm:block">{passengerLabel}</div>
          <button
            aria-label="search"
            className="rounded-full bg-rose-500 p-2 text-white"
          >
            <BiSearch size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Search;
