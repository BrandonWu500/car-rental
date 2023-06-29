import Container from '@/components/Container';
import Heading from '@/components/Heading';
import { useReservationsByListingId } from '@/hooks/useReservationsByListingId';
import { serverAuth } from '@/libs/serverAuth';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

import EmptyState from '@/components/EmptyState';
import ListingCard from '@/components/listings/ListingCard';
import { useDeleteReservation } from '@/hooks/useDeleteReservation';
import { prisma } from '@/libs/prismadb';
import { SafeTypeReservation } from '@/types';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query, req, res } = ctx;
  const { listingId } = query;

  const currentUser = await serverAuth(
    req as NextApiRequest,
    res as NextApiResponse
  );

  if (!currentUser || !listingId || typeof listingId !== 'string')
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  });

  if (!listing || listing.userId !== currentUser.id)
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };

  return {
    props: {},
  };
};

const CarReservationsPage = () => {
  const router = useRouter();
  const { listingId } = router.query;

  const {
    reservations,
    isLoading: loadingReservations,
    mutate,
  } = useReservationsByListingId(listingId as string);

  const { isLoading, onDelete } = useDeleteReservation(reservations, mutate);

  if (!reservations || loadingReservations) {
    return (
      <div className="flex h-screen w-screen -translate-y-20 items-center justify-center">
        <ClipLoader size={250} />
      </div>
    );
  }

  if (reservations?.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle={`Looks like you have no reservations on your car yet.`}
      />
    );
  }

  return (
    <Container>
      <Heading title="Reservations" subtitle="Made on your car" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          gap-8 
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {reservations.map((reservation: SafeTypeReservation) => (
          <ListingCard
            key={reservation.id}
            listing={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onDelete}
            disabled={isLoading}
            actionLabel={`Cancel ${
              reservation.user?.name ?? 'user'
            }'s reservation`}
          />
        ))}
      </div>
    </Container>
  );
};
export default CarReservationsPage;
