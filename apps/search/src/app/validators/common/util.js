import config from '../../config';

export const isDefined = value => !(value === undefined || value === null);

export const isValidEmail = email => Boolean(isDefined(email) && config.RegExp.Email.test(email.toLowerCase()));

export const isValidPassword = password => Boolean(isDefined(password) && config.RegExp.password.test(password));
export const isValidPhone = phone => Boolean(isDefined(phone) && config.RegExp.phone.test(phone));

export function notNull(str) {
  if (isDefined(str)) {
    if (str.trim() !== '') {
      return true;
    }
  }
  return false;
}

