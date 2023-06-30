import { formatISO } from 'date-fns';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useCallback, useMemo, useState } from 'react';
import { DateRange, Range } from 'react-date-range';

import { INITIAL_DATE_RANGE } from '@/constants';
import { useSearchModal } from '@/hooks/useSearchModal';
import { LOCATION_TYPE } from '@/types';

import Heading from '../Heading';
import Counter from '../inputs/Counter';
import LocationSelect from '../inputs/LocationSelect';
import Modal from './Modal';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

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

    let currentQuery = router.query;

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
        <DateRange
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
