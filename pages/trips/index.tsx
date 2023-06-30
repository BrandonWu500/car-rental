import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import Heading from '@/components/Heading';
import Grid from '@/components/layout/Grid';
import ListingCard from '@/components/listings/ListingCard';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useDeleteReservation } from '@/hooks/useDeleteReservation';
import { useTrips } from '@/hooks/useTrips';
import { SafeTypeReservation } from '@/types';
import { ClipLoader } from 'react-spinners';

const TripsPage = () => {
  const { data: currentUser, isLoading: loadingUser } = useCurrentUser();
  const { trips, isLoading: loadingTrips, mutate } = useTrips(currentUser?.id);
  const { isLoading, onDelete } = useDeleteReservation(trips, mutate);

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

      <Grid>
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
      </Grid>
    </Container>
  );
};
export default TripsPage;
