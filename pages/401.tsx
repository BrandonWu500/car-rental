import EmptyState from '@/components/EmptyState';

const UnauthorizedPage = () => {
  return (
    <EmptyState
      title="Unauthorized"
      subtitle="Please login to view this page."
    />
  );
};
export default UnauthorizedPage;
