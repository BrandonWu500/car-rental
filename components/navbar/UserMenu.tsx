import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { User } from "@prisma/client";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { useLoginModal } from "@/hooks/useLoginModal";
import { useRegisterModal } from "@/hooks/useRegisterModal";

interface UserMenuProps {
  currentUser: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold
        py-3 px-4 rounded-full hover:bg-neutral-100
        transition cursor-pointer"
        >
          Rent out your car
        </div>
        <button
          onClick={toggleOpen}
          aria-label="user menu"
          className="p-4 md:py-1 md:px-2 border-[1px]
        border-neutral-200 flex items-center gap-3
        rounded-full hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute rounded-xl shadow-md
        w-[40vw] md:w-3/4 bg-white overflow-hidden right-0
        top-12 text-sm"
        >
          <div className="flex flex-col">
            <MenuItem label="Login" onClick={loginModal.onOpen} />
            <MenuItem label="Sign up" onClick={registerModal.onOpen} />
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
