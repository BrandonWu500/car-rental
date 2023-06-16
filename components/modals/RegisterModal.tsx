import { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";

import { useRegisterModal } from "@/hooks/useRegisterModal";

import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";
import Button from "../Button";
import { toast } from "react-hot-toast";

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      await axios.post("/api/register", data);
      toast.success("Registered!");
      registerModal.onClose();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
  }, [registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Car Rental!" subtitle="Create an account" />
      <Input
        label="Email"
        id="email"
        type="email"
        required
        register={register}
        errors={errors}
      />
      <Input
        label="Name"
        id="name"
        required
        register={register}
        errors={errors}
      />
      <Input
        label="Password"
        id="password"
        type="password"
        required
        register={register}
        errors={errors}
      />
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
        <span
          onClick={onToggle}
          className="text-neutral-800 cursor-pointer hover:underline"
        >
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
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default RegisterModal;
