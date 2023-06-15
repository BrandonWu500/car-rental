import { useRegisterModal } from "@/hooks/useRegisterModal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";
import { useState } from "react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();

  const [isLoading, setIsLoading] = useState(false);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Car Rental!" subtitle="Create an account" />
      <Input label="Email" id="email" type="email" required />
      <Input label="Name" id="name" required />
      <Input label="Password" id="password" type="password" required />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={() => {}}
      body={bodyContent}
    />
  );
};
export default RegisterModal;
