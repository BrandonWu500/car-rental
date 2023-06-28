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

import { prisma } from '@/libs/prismadb';

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

  const { reservations, isLoading } = useReservationsByListingId(
    listingId as string
  );

  if (!reservations || isLoading) {
    return (
      <div className="flex h-screen w-screen -translate-y-20 items-center justify-center">
        <ClipLoader size={250} />
      </div>
    );
  }

  return (
    <Container>
      <Heading title="Reservations" subtitle="Made on your car" />
    </Container>
  );
};
export default CarReservationsPage;
