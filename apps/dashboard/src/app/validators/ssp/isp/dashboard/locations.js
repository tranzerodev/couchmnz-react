import config from '../../../../config';
import appConstants from '../../../../constants/appConstants';
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
function setRequired(value) {
  return {required: value};
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

function validateAll(validation) {
  if (
    (validation.landline.required ? validation.landline.valid : true) &&
    validation.zip.valid === true &&
    validation.zip.maxLength === true &&
    validation.mobile.valid === true
  ) {
    return true;
  }
  return false;
}
function checkRequired(validation) {
  if (
    validation.zip.required === true &&
    validation.mobile.required === true &&
    validation.countryID.required === true &&
    validation.street.required === true &&
    validation.cityID.required === true
  ) {
    return true;
  }
  return false;
}
function isContainsMobile(mobile, countryCode) {
  if (notNull(mobile)) {
    if (mobile.length > 1) {
      const number = phoneUtil.parseAndKeepRawInput(mobile, notNull(countryCode) ? countryCode : 'US');
      return {required: true, valid: phoneUtil.isValidNumber(number)};
    }
    return {required: true, valid: false};
  }
  return {required: false, valid: false};
}

function validateLandline(landline, countryCode) {
  if (notNull(landline)) {
    if (landline.length > 1) {
      const number = phoneUtil.parseAndKeepRawInput(landline, notNull(countryCode) ? countryCode : 'US');
      return {required: true, valid: phoneUtil.isValidNumber(number)};
    }
    return {required: true, valid: false};
  }
  return {required: false, valid: false};
}

export function validateLocations(data) {
  const validation = {};
  console.log(data);
  validation.zip = validateZipcode(data);

  validation.mobile = isContainsMobile(data.mobile, data.countryCode);
  validation.landline = validateLandline(data.landline, data.countryCode);

  validation.street = setRequired(Boolean(data.street && notNull(data.street.trim())));

  validation.cityID = setRequired(Boolean(data.cityID && notNull(data.cityID)));

  validation.countryID = setRequired(notNull(data.countryID));

  validation.valid = validateAll(validation);
  validation.required = checkRequired(validation);
  return validation;
}
