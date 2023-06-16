import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useForm, FieldValues } from "react-hook-form";

import { useRegisterModal } from "@/hooks/useRegisterModal";

import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";
import Button from "../Button";

const RegisterModal = () => {
  const registerModal = useRegisterModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Car Rental!" subtitle="Create an account" />
      <Input label="Email" id="email" type="email" required />
      <Input label="Name" id="name" required />
      <Input label="Password" id="password" type="password" required />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <div
        className="text-neutral-500 text-center
      mt-4 font-light"
      >
        <p>Already have an account?</p>
        <span className="text-neutral-800 cursor-pointer hover:underline">
          Log in
        </span>
      </div>
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
      footer={footerContent}
    />
  );
};
export default RegisterModal;
