import EmptyState from '@/components/EmptyState';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useTrips } from '@/hooks/useTrips';
import { ClipLoader } from 'react-spinners';

const TripsPage = () => {
  const { data: currentUser, isLoading: loadingUser } = useCurrentUser();
  const { trips, isLoading: loadingTrips } = useTrips(currentUser?.id);

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
  return <div>TripsPage</div>;
};
export default TripsPage;
