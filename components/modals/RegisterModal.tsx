import { useRegisterModal } from "@/hooks/useRegisterModal";
import Heading from "../Heading";

const RegisterModal = () => {
  const registerModal = useRegisterModal();

  return (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Car Rental!" subtitle="Create an account" />
    </div>
  );
};
export default RegisterModal;
