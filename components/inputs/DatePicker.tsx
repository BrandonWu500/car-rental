import { useReservationsByListingId } from '@/hooks/useReservationsByListingId';
import { useEffect, useState } from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ClipLoader } from 'react-spinners';

interface DatePickerProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
  listingId: string;
}

const DatePicker = ({
  value,
  onChange,
  disabledDates,
  listingId,
}: DatePickerProps) => {
  const { isValidating } = useReservationsByListingId(listingId);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isValidating) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [isValidating]);

  return (
    <div className="relative">
      <div className="my-2 flex w-full justify-around">
        <p>Start</p>
        <p>End</p>
      </div>
      {loading && (
        <div
          className="absolute inset-0 z-10 m-auto
        flex flex-col items-center justify-center gap-5 bg-white"
        >
          <ClipLoader size={100} />
          {/* <p className="text-xl">Revalidating...</p> */}
        </div>
      )}
      <DateRange
        rangeColors={['#262626']}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        direction="vertical"
        minDate={new Date()}
        disabledDates={disabledDates}
      />
    </div>
  );
};
export default DatePicker;
