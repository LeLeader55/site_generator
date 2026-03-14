import { serrurierCities } from './citiesSerrurier';

export const cities = [
  ...serrurierCities,
  
];

export function getCity(serviceSlug, departmentCode, citySlug) {
  return cities.find(
    (city) =>
      city.serviceSlug === serviceSlug &&
      city.departmentCode === departmentCode &&
      city.slug === citySlug
  );
}