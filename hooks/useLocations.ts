import { LOCATION_TYPE } from '@/types';
import { City, State } from 'country-state-city';

const COUNTRY_CODE = 'US';

export const useLocations = (
  type: LOCATION_TYPE,
  stateCode: string
): string[] => {
  if (type === LOCATION_TYPE.CITY) {
    const cities = City.getCitiesOfState(COUNTRY_CODE, stateCode);
    const cityNames = cities.map((city) => city.name);
    return cityNames;
  }

  if (type === LOCATION_TYPE.STATE) {
    const states = State.getStatesOfCountry(COUNTRY_CODE);
    const stateNames = states.map((state) => state.name);
    return stateNames;
  }

  return [];
};
