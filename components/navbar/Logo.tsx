import Link from "next/link";
import { AiFillCar } from "react-icons/ai";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-rose-400">
      <AiFillCar size={24} />
      <span className="font-bold text-lg">Car Rental</span>
    </Link>
  );
};
export default Logo;
