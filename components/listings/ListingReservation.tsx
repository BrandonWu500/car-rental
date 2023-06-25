import { Range } from 'react-date-range';
import Button from '../Button';
import DatePicker from '../inputs/DatePicker';

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}: ListingReservationProps) => {
  return (
    <div
      className="overflow-hidden rounded-xl
    border-[1px] border-neutral-200 bg-white"
    >
      <div className="flex items-center gap-1 p-4">
        <p className="text-2xl font-semibold">$ {price}</p>
        <p className="font-light text-neutral-600">/ day</p>
      </div>
      <hr />
      <DatePicker
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div
        className="flex items-center justify-between p-4 text-lg
      font-semibold"
      >
        <h4>Total</h4>
        <p>$ {totalPrice}</p>
      </div>
    </div>
  );
};
export default ListingReservation;
