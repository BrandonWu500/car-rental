import CreateListingModal from '@/components/modals/CreateListingModal';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';

const ModalsProvider = () => {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <CreateListingModal />
    </>
  );
};
export default ModalsProvider;
