import config from '../../../../config';
import appConstants from '../../../../constants/appConstants';
function notNull(object) {
  if (!object || object == undefined || object == null || object == '') {
    return false;
  }
  return true;
}

function validateAll(validation) {
  if (
    validation.title &&
    validation.country &&
    validation.street &&
    validation.city &&
    validation.zip.required &&
    validation.zip.maxLength &&
    validation.zip.valid // &&
    // validation.cityID
  ) {
    return true;
  }
  return false;
}

function validateZipcode(data) {
  const validZip = {required: false, valid: true, maxLength: true};
  if (notNull(data.zip)) {
    validZip.required = true;
    validZip.valid = Boolean(config.RegExp.zipcode.test(data.zip));
    validZip.maxLength = data.zip.length && data.zip.length < appConstants.zipCodeMaxlength;
  }
  return validZip;
}

export function validateLocation(location) {
  const validation = {};
  const isLocationDefined = notNull(location);
  validation.title = isLocationDefined && notNull(location.title);
  validation.country = isLocationDefined && notNull(location.countryName); // NotNull(location.countryID) && notNull(location.countryName);
  validation.city = isLocationDefined && notNull(location.cityName); // NotNull(location.cityID) && notNull(location.cityName);
  validation.street = isLocationDefined && notNull(location.street);
  validation.zip = isLocationDefined && validateZipcode({zip: location.zip});
  // validation.cityID = isLocationDefined && notNull(location.cityID);
  validation.valid = validateAll(validation);

  return validation;
}
