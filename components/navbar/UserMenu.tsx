import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";

const UserMenu = () => {
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
    </div>
  );
};
export default UserMenu;
