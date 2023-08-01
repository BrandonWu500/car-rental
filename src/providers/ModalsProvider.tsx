import CreateListingModal from '@/components/modals/CreateListingModal';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import SearchModal from '@/components/modals/SearchModal';

const ModalsProvider = () => {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <CreateListingModal />
      <SearchModal />
    </>
  );
};
export default ModalsProvider;
