import { User } from '@prisma/client';
import Avatar from '../Avatar';

interface ListingInfoProps {
  info: string;
  passengerCount: number;
  user: User;
  category: string;
}

const ListingInfo = ({
  info,
  passengerCount,
  user,
  category,
}: ListingInfoProps) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold">Hosted by {user?.name}</p>
          <Avatar src={user?.image} />
        </div>
        <p>Max {passengerCount} people</p>
      </div>
    </div>
  );
};
export default ListingInfo;
