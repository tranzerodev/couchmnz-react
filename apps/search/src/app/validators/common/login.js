import {notNull, isValidEmail} from './util';

export default function validateLogin(data) {
  const validation = {
    email: {required: false, valid: false},
    password: false
  };
  validation.email.required = notNull(data.email);
  validation.email.valid = isValidEmail(data.email);
  validation.password = notNull(data.password);
  validation.valid = validation.email.required && validation.email.valid && validation.password;
  return validation;
}
