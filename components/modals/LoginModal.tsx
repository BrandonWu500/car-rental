import { useCallback, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';

import { useLoginModal } from '@/hooks/useLoginModal';

import Heading from '../Heading';
import Input from '../inputs/Input';
import Modal from './Modal';
import Button from '../Button';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useRegisterModal } from '@/hooks/useRegisterModal';

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const callback = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (callback?.ok) {
        toast.success('Logged in!');
        router.reload();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back!" subtitle="Login to your account" />
      <Input
        label="Email"
        id="email"
        type="email"
        required
        register={register}
        errors={errors}
        disabled={isLoading}
      />
      <Input
        label="Password"
        id="password"
        type="password"
        required
        register={register}
        errors={errors}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button
        intent="secondary"
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <div
        className="mt-4 text-center
      font-light text-neutral-500"
      >
        <p>First time using Car Rental?</p>
        <span
          onClick={onToggle}
          className="cursor-pointer text-neutral-800 hover:underline"
        >
          Create an account
        </span>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default LoginModal;
