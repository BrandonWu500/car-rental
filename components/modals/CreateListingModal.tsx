import axios from 'axios';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { useCreateListingModal } from '@/hooks/useCreateListingModal';

import { CATEGORIES } from '@/constants';
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import Counter from '../inputs/Counter';
import CountrySelect from '../inputs/CountrySelect';
import ImageUpload from '../inputs/ImageUpload';
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
  const router = useRouter();
  const createListingModal = useCreateListingModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      passengerCount: 1,
      imageSrc: '',
    },
  });

  const category = watch('category');
  const location = watch('location');
  const passengerCount = watch('passengerCount');
  const imageSrc = watch('imageSrc');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);
    try {
      await axios.post('/api/listings', data);
      toast.success('Listing created!');
      router.reload();
      reset();
      setStep(STEPS.CATEGORY);
      createListingModal.onClose();
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Which of these best describes your car?"
        subtitle="Pick a category"
      />
      <div
        className="grid max-h-[50vh] grid-cols-1 gap-3
      overflow-y-auto md:grid-cols-2"
      >
        {CATEGORIES.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Where is your car located?"
          subtitle="Help renters find you"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
      </div>
    );
  }

  if (step === STEPS.PASSENGERS) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="How many people can fit in your car comfortably?"
          subtitle="Include the driver in your count!"
        />
        <Counter
          value={passengerCount}
          onChange={(value) => setCustomValue('passengerCount', value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGE) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Add a photo of your car"
          subtitle="Show renters what your car looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    );
  }

  const footerContent = <div className="mt-3 flex flex-col gap-4"></div>;

  return (
    <Modal
      disabled={isLoading}
      isOpen={createListingModal.isOpen}
      title="Rent out your car!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={createListingModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};
export default CreateListingModal;
