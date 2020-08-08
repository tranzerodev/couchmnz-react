import config from '../../../../config';
import appConstants from '../../../../constants/appConstants';
import {isValidEmail} from '../../../common/util';

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

function validateGender(gender) {
  const validGender = {required: false, valid: true};
  if (gender) {
    const genders = config.genders;
    validGender.required = true;
    for (let i = 0; i < genders.length; i++) {
      if (gender === genders[i].value) {
        validGender.valid = true;
        return validGender;
      }
    }
    validGender.valid = false;
  }
  return validGender;
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

function validateBusinessUrl(businessUrl) {
  if (notNull(businessUrl)) {
    if (config.RegExp.url.test(businessUrl)) {
      return true;
    }
    return false;
  }
  return true;
}

function validateNickname(nickname) {
  const validNickname = {required: false, valid: true};
  if (notNull(nickname)) {
    validNickname.required = true;
    if (config.RegExp.nickName.test(nickname) === false) {
      validNickname.valid = false;
    }
  }
  return validNickname;
}

function validateAll(validation) {
  if (
    validation.businessUrl === true &&
    validation.zip.valid === true &&
    validation.zip.maxLength === true &&
    validation.gender.valid === true &&
    validation.mobile.valid === true &&
    (validation.landline.required ? validation.landline.valid : true) &&
    validation.nickname.valid === true &&
    validation.email === true
  ) {
    return true;
  }
  return false;
}

function checkRequired(validation) {
  if (
    validation.zip.required === true &&
    validation.gender.required === true &&
    validation.mobile.required === true &&
    validation.countryID.required === true &&
    // Validation.businessName.required === true &&
    validation.street.required === true &&
    validation.cityName.required === true &&
    validation.timezone.required === true &&
    validation.firstName.required === true &&
    validation.lastName.required === true &&
    validation.nickname.required === true
  ) {
    return true;
  }
  return false;
}

function setRequired(value) {
  return {required: value};
}

export function validateAccountDetails(data) {
  const validation = {};

  validation.zip = validateZipcode(data);

  validation.mobile = isContainsMobile(notNull(data.formattedMobile) ? data.formattedMobile : data.mobile, data.countryCode);

  validation.businessUrl = validateBusinessUrl(data.businessUrl);
  validation.landline = validateLandline(notNull(data.formattedLandline) ? data.formattedLandline : data.landline, data.countryCode);

  validation.gender = validateGender(data.gender);

  validation.countryID = setRequired(notNull(data.countryID));
  validation.businessName = true;
  // SetRequired(Boolean(data.businessName && notNull(data.businessName.trim())));
  validation.street = setRequired(Boolean(data.street && notNull(data.street.trim())));

  validation.cityName = setRequired(Boolean(data.cityName && notNull(data.cityName)));

  validation.timezone = setRequired(Boolean(data.timezone && notNull(data.timezone.id)));
  validation.email = isValidEmail((data && notNull(data.email)) ? data.email : '');

  validation.nickname = validateNickname(data.nickname);
  validation.firstName = setRequired(Boolean(data.firstName && notNull(data.firstName.trim())));
  validation.lastName = setRequired(Boolean(data.lastName && notNull(data.lastName.trim())));

  validation.valid = validateAll(validation);
  validation.required = checkRequired(validation);
  return validation;
}

