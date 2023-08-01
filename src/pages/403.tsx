import EmptyState from '@/components/EmptyState';

const ForbiddenPage = () => {
  return (
    <EmptyState
      title="Forbidden"
      subtitle="You do not have the right permissions to access this page."
    />
  );
};
export default ForbiddenPage;
