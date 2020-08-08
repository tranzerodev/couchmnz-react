import {notNull} from '../../../common/util';
export default function validation(location) {
  const validation = {
    title: false,
    country: false,
    city: false,
    street: false,
    valid: false
  };
  validation.title = notNull(location.title);
  validation.country = notNull(location.countryID) && notNull(location.countryName);
  validation.city = notNull(location.cityID) && notNull(location.cityName);
  validation.street = notNull(location.street);
  validation.valid = validation.title && validation.country && validation.city && validation.street;
  return validation;
}
