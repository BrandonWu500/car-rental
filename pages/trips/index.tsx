import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import Heading from '@/components/Heading';
import ListingCard from '@/components/listings/ListingCard';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useDeleteReservation } from '@/hooks/useDeleteReservation';
import { useTrips } from '@/hooks/useTrips';
import { SafeTypeReservation } from '@/types';
import { ClipLoader } from 'react-spinners';

const TripsPage = () => {
  const { data: currentUser, isLoading: loadingUser } = useCurrentUser();
  const { trips, isLoading: loadingTrips } = useTrips(currentUser?.id);
  const { isLoading, onDelete } = useDeleteReservation();

  if (loadingTrips || loadingUser) {
    return (
      <div className="flex h-screen w-screen -translate-y-20 items-center justify-center">
        <ClipLoader size={250} />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login to view this page."
      />
    );
  }

  if (trips?.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle={`Looks like you haven't reserved any cars yet.`}
      />
    );
  }
  return (
    <Container>
      <Heading title="Trips" subtitle="Upcoming and past trips" />

      <div
        className="mt-10 grid grid-cols-1 gap-8
    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
    2xl:grid-cols-6"
      >
        {trips.map((trip: SafeTypeReservation) => (
          <ListingCard
            key={trip.id}
            listing={trip.listing}
            reservation={trip}
            actionId={trip.id}
            actionLabel="Cancel Reservation"
            onAction={onDelete}
            disabled={isLoading}
          />
        ))}
      </div>
    </Container>
  );
};
export default TripsPage;
