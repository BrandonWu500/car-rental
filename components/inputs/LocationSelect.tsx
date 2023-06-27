import { useLocations } from '@/hooks/useLocations';
import { LOCATION_TYPE } from '@/types';
import { Combobox, Transition } from '@headlessui/react';
import { Fragment, useMemo, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { HiChevronUpDown } from 'react-icons/hi2';

interface LocationSelectProps {
  value: string;
  onChange: (value: string) => void;
  type: LOCATION_TYPE;
  stateCode?: string;
}

const LocationSelect = ({
  value,
  onChange,
  type,
  stateCode = 'MA',
}: LocationSelectProps) => {
  const { getStates, getCitiesByState } = useLocations();

  const label = useMemo(
    () => (type === LOCATION_TYPE.STATE ? 'US State or Territory' : 'City'),
    [type]
  );

  const inputPlaceholder = useMemo(
    () => (type === LOCATION_TYPE.STATE ? 'MA' : 'Boston'),
    [type]
  );

  const locations = useMemo(
    () =>
      type === LOCATION_TYPE.STATE ? getStates() : getCitiesByState(stateCode),
    [type, stateCode, getStates, getCitiesByState]
  );

  const [query, setQuery] = useState('');

  const filteredLocations =
    query === ''
      ? locations
      : locations.filter((location) =>
          location
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className="w-72 self-center">
      <Combobox value={value} onChange={(value) => onChange(value)}>
        <Combobox.Label className="mb-8 font-light text-neutral-500">
          {label}
        </Combobox.Label>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg border-2 border-neutral-200 bg-white text-left sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none"
              displayValue={(location: any) => location}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={inputPlaceholder}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm">
              {filteredLocations.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredLocations.map((location) => (
                  <Combobox.Option
                    key={location}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={location}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {location}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <AiOutlineCheck
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
export default LocationSelect;
