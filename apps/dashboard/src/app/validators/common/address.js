import config from '../../config';
import appConstants from '../../constants/appConstants';

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
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
  return {required: true, valid: true};
}

export function validateZipcode(data) {
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
    validation.zip.valid === true &&
    validation.zip.maxLength === true &&
    validation.mobile.valid === true &&
    (validation.landline.required ? validation.landline.valid : true)) {
    return true;
  }
  return false;
}

function checkRequired(validation) {
  if (
    validation.zip.required === true &&
    validation.mobile.required === true &&
    validation.countryId.required === true &&
    // Validation.businessName.required === true &&
    validation.street.required === true &&
    // validation.area.required === true &&
    validation.city.required === true
  ) {
    return true;
  }
  return false;
}

function setRequired(value) {
  return {required: value};
}

export function validateAddress(data) {
  const validation = {};

  validation.zip = validateZipcode(data);

  validation.mobile = isContainsMobile(notNull(data.formattedMobile) ? data.formattedMobile : data.mobile, data.countryCode);

  validation.landline = validateLandline(notNull(data.formattedLandline) ? data.formattedLandline : data.landline, data.countryCode);

  validation.countryId = setRequired(notNull(data.countryId));
  validation.street = setRequired(Boolean(data.street && notNull(data.street.trim())));
  validation.area = setRequired(Boolean(data.area && notNull(data.area.trim())));

  validation.city = setRequired(Boolean(data.city && notNull(data.city)));

  validation.valid = validateAll(validation);
  validation.required = checkRequired(validation);
  return validation;
}

