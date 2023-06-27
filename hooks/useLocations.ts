import { City, State } from 'country-state-city';

const COUNTRY_CODE = 'US';

export const useLocations = () => {
  const getStates = () => {
    const states = State.getStatesOfCountry(COUNTRY_CODE);
    const stateCodes = states?.map((state) => state.isoCode) ?? [];
    return stateCodes;
  };

  const getCitiesByState = (stateCode: string) => {
    const cities = City.getCitiesOfState(COUNTRY_CODE, stateCode);
    const cityNames =
      cities?.map((city) => `${city.name}, ${city.stateCode}`) ?? [];
    return cityNames;
  };

  return { getStates, getCitiesByState };
};
