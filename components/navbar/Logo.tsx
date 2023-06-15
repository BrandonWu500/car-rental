import Link from "next/link";
import { AiFillCar } from "react-icons/ai";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <AiFillCar size={24} />
      <span>Car Rental</span>
    </Link>
  );
};
export default Logo;
