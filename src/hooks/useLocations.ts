import { City, State } from 'country-state-city';

const COUNTRY_CODE = 'US';

export const useLocations = () => {
  const getStates = () => {
    const states = State.getStatesOfCountry(COUNTRY_CODE);
    const filteredStates = states?.filter(
      (state) => !state.isoCode.includes('UM')
    );
    const stateCodes = filteredStates?.map((state) => state.isoCode) ?? [];
    return stateCodes;
  };

  const getCitiesByState = (stateCode: string) => {
    const cities = City.getCitiesOfState(COUNTRY_CODE, stateCode);
    const cityNames = cities?.map((city) => `${city.name}`) ?? [];
    return cityNames;
  };

  return { getStates, getCitiesByState };
};
