import axios from 'axios';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { CATEGORIES } from '@/constants';
import { useCreateListingModal } from '@/hooks/useCreateListingModal';
import { LOCATION_TYPE } from '@/types';

import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import LocationSelect from '../inputs/LocationSelect';
import Modal from './Modal';

enum STEPS {
  CATEGORY,
  STATE,
  CITY,
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
      state: '',
      city: '',
      passengerCount: 1,
      imageSrc: '',
      make: '',
      model: '',
      trim: '',
      info: '',
      price: 1,
    },
  });

  const category = watch('category');
  const state = watch('state');
  const city = watch('city');
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
    <div className="flex flex-col gap-8">
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

  if (step === STEPS.STATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your car located?"
          subtitle="Help renters find you"
        />
        <LocationSelect
          type={LOCATION_TYPE.STATE}
          value={state}
          onChange={(value) => setCustomValue('state', value)}
        />
      </div>
    );
  }

  if (step === STEPS.CITY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your car located?"
          subtitle="Help renters find you"
        />
        <LocationSelect
          type={LOCATION_TYPE.CITY}
          stateCode={state}
          value={city}
          onChange={(value) => setCustomValue('city', value)}
        />
      </div>
    );
  }

  if (step === STEPS.PASSENGERS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
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
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your car"
          subtitle="Show renters what your car looks like!"
        />
        <p>
          Please Note: There may be a brief delay before the image preview shows
          below once you have uploaded the file.
        </p>
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Tell us more about your car"
          subtitle="What would be important for renters to know?"
        />
        <Input
          id="make"
          label="Make"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="model"
          label="Model"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="trim"
          label="Trim"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="info"
          label="Other Info"
          disabled={isLoading}
          register={register}
          errors={errors}
          textarea
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much will you charge per day?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
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
