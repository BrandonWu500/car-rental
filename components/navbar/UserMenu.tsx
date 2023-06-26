import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineMenu } from 'react-icons/ai';

import { useCreateListingModal } from '@/hooks/useCreateListingModal';
import { useLoginModal } from '@/hooks/useLoginModal';
import { useRegisterModal } from '@/hooks/useRegisterModal';

import Avatar from '../Avatar';
import MenuItem from './MenuItem';

interface UserMenuProps {
  currentUser: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const createListingModal = useCreateListingModal();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onLogout = useCallback(() => {
    signOut();
    toast.success('Logged out!');
  }, []);

  const onCreateListing = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    createListingModal.onOpen();
  }, [loginModal, createListingModal, currentUser]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={onCreateListing}
          className="hidden cursor-pointer rounded-full px-4
        py-3 text-sm font-semibold transition
        hover:bg-neutral-100 md:block"
        >
          Rent out your car
        </div>
        <button
          onClick={toggleOpen}
          aria-label="user menu"
          className="flex items-center gap-3 rounded-full
        border-[1px] border-neutral-200 p-4 transition
        hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 top-12
        w-[40vw] overflow-hidden rounded-xl bg-white text-sm
        shadow-md md:w-3/4"
        >
          <div className="flex flex-col">
            {currentUser ? (
              <>
                <MenuItem label="Rent out your car" onClick={onCreateListing} />
                <MenuItem
                  label="My trips"
                  onClick={() => router.push('/trips')}
                />
                <MenuItem label="Logout" onClick={onLogout} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
