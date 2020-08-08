import config from '../../../config';
import appConstants from '../../../constants/appConstants';
import {isValidEmail} from '../../common/util';

function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
function isValidMobile(mobile) {
  return notNull(mobile) && config.RegExp.phone.test((mobile));
}
function validateLandline(landline) {
  if (notNull(landline)) {
    if (config.RegExp.phone.test(landline)) {
      return true;
    }
    return false;
  }
  return true;
}

function validateZipcode(zipCode) {
  const validZip = {required: false, valid: true, maxLength: true};
  if (notNull(zipCode)) {
    validZip.required = true;
    validZip.valid = Boolean(config.RegExp.zipcode.test(zipCode.zipCode));
    validZip.maxLength = zipCode.length && zipCode.length < appConstants.zipCodeMaxlength;
  }
  return validZip;
}

const isValid = validation => {
  const {firstName, lastName, country, state, address, city, zipCode, timezone, mobile, landline} = validation;
  return firstName === true && lastName === true && country === true && state === true && address === true && city === true && zipCode.valid === true && timezone === true && mobile === true && landline === true;
};

export function validateAccount(data) {
  console.log('Data :: ', data);
  const validation = {};
  const {firstName, lastName, country, state, address, city, zipCode, timezone, mobile, landLine} = data;
  validation.firstName = notNull(firstName) && notNull(firstName.trim());
  validation.lastName = notNull(lastName) && notNull(lastName.trim());
  validation.country = notNull(country) && notNull(country.name);
  validation.state = notNull(state) && notNull(state.name);
  validation.city = notNull(city) && notNull(city.name);
  validation.address = notNull(address) && notNull(address.trim());
  validation.zipCode = validateZipcode(zipCode);
  validation.timezone = notNull(timezone) && notNull(timezone.id);
  validation.mobile = isValidMobile(mobile);
  validation.landline = validateLandline(landLine);
  validation.valid = isValid(validation);
  validation.email = isValidEmail((data && notNull(data.email)) ? data.email : '');
  return validation;
}
