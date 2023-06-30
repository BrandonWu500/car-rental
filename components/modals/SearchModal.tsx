import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';

import { INITIAL_DATE_RANGE } from '@/constants';
import { useSearchModal } from '@/hooks/useSearchModal';
import { LOCATION_TYPE } from '@/types';
import { Range } from 'react-date-range';
import Heading from '../Heading';
import LocationSelect from '../inputs/LocationSelect';
import Modal from './Modal';

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

  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>(INITIAL_DATE_RANGE);

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
  }, [step, onNext]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
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
      <LocationSelect
        value={state}
        onChange={(value) => setState(value)}
        type={LOCATION_TYPE.STATE}
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
        <LocationSelect
          value={city}
          onChange={(value) => setCity(value)}
          type={LOCATION_TYPE.CITY}
          stateCode={state}
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
