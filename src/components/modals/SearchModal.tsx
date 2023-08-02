import { formatISO } from 'date-fns';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useCallback, useMemo, useState } from 'react';
import { DateRange, Range } from 'react-date-range';

import { INITIAL_DATE_RANGE } from '@/constants';
import { useSearchModal } from '@/hooks/useSearchModal';

import Heading from '../Heading';
import Counter from '../inputs/Counter';
import Modal from './Modal';

import Input from '@/components/inputs/Input';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { FieldValues, useForm } from 'react-hook-form';

enum STEPS {
  STATE,
  CITY,
  DATE,
  INFO,
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEPS.STATE);

  const [passengerCount, setPassengerCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>(INITIAL_DATE_RANGE);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      state: '',
      city: '',
    },
  });

  const state = watch('state');
  const city = watch('city');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    const currentQuery = router.query;

    const updatedQuery: any = {
      ...currentQuery,
      state,
      city,
      passengerCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.STATE);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    onNext,
    router,
    searchModal,
    dateRange,
    city,
    state,
    passengerCount,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.STATE) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where are you currently located?"
        subtitle="Find the perfect car near you!"
      />
      <Input
        id="state"
        label="State"
        type="text"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  if (step === STEPS.CITY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where are you currently located?"
          subtitle="Find the perfect car near you!"
        />
        <Input
          id="city"
          label="City"
          type="text"
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you need your car?"
          subtitle="Make sure everyone is free!"
        />
        <DateRange
          ariaLabels={{
            nextButton: 'next month',
            prevButton: 'previous month',
          }}
          rangeColors={['#262626']}
          ranges={[dateRange]}
          date={new Date()}
          onChange={(value) => setDateRange(value.selection)}
          direction="vertical"
          minDate={new Date()}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How many passengers will you have?"
          subtitle="Include the driver in your count!"
        />
        <Counter
          onChange={(value) => setPassengerCount(value)}
          value={passengerCount}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.STATE ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};
export default SearchModal;
