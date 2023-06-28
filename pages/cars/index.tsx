import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import Heading from '@/components/Heading';
import ListingCard from '@/components/listings/ListingCard';
import { useCars } from '@/hooks/useCars';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { SafeTypeCar } from '@/types';
import { ClipLoader } from 'react-spinners';

const CarsPage = () => {
  const { data: currentUser, isLoading: loadingUser } = useCurrentUser();
  const { cars, isLoading: loadingCars } = useCars(currentUser?.id);

  if (loadingCars || loadingUser) {
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

  if (cars?.length === 0) {
    return (
      <EmptyState
        title="No cars found"
        subtitle={`Looks like you haven't listed any cars yet.`}
      />
    );
  }
  return (
    <Container>
      <Heading title="Cars" subtitle="You have listed" />

      <div
        className="mt-10 grid grid-cols-1 gap-8
    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
    2xl:grid-cols-6"
      >
        {cars.map((car: SafeTypeCar) => (
          <ListingCard
            key={car.id}
            reservation={car.reservation}
            listing={car}
          />
        ))}
      </div>
    </Container>
  );
};
export default CarsPage;
