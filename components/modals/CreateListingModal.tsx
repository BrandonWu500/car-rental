import { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useCreateListingModal } from '@/hooks/useCreateListingModal';

import Modal from './Modal';

enum STEPS {
  CATEGORY,
  LOCATION,
  PASSENGERS,
  IMAGE,
  INFO,
  PRICE,
}

const CreateListingModal = () => {
  const createListingModal = useCreateListingModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {},
  });

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // setIsLoading(true);
    // try {
    // } catch (error: any) {
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const bodyContent = <div className="flex flex-col gap-4"></div>;

  const footerContent = <div className="mt-3 flex flex-col gap-4"></div>;

  return (
    <Modal
      disabled={isLoading}
      isOpen={createListingModal.isOpen}
      title="Rent out your car!"
      actionLabel={actionLabel}
      onClose={createListingModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};
export default CreateListingModal;
