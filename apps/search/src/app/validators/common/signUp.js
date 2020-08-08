import {notNull, isValidEmail, isValidPassword} from './util';
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

function isValid({fname, lname, email, password, confirmPassword, mobile, phone}) {
  return fname &&
  lname &&
  email.required &&
  email.valid &&
  password.required &&
  password.valid &&
  confirmPassword.required &&
  confirmPassword.match &&
  mobile.required &&
  mobile.valid &&
  phone;
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

export default function validateSignUp(data) {
  const validation = {fname: false,
    lname: false,
    email: {required: false, valid: false},
    password: {required: false, valid: false},
    confirmPassword: {required: false, match: false},
    mobile: {required: false, valid: false},
    phone: true
  };

  validation.fname = notNull(data.fname);
  validation.lname = notNull(data.lname);
  validation.email.required = notNull(data.email);
  validation.email.valid = isValidEmail(data.email);
  validation.password.required = notNull(data.password);
  validation.password.valid = isValidPassword(data.password);
  validation.confirmPassword.required = notNull(data.confirmPassword);
  validation.confirmPassword.match = data.password === data.confirmPassword;
  validation.mobile = isContainsMobile(data.mobile);
  validation.phone = validateLandline(data.phone);
  validation.valid = isValid(validation);
  return validation;
}
