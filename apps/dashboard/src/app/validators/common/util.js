import config from '../../config';
import moment from 'moment';
import {FULFILLED, PENDING, REJECTED} from '../../constants/ActionTypes';

export function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}

export function notEmpty(object) {
  if (object === undefined || object === null || object === '') {
    return null;
  } else if (object && object.toString().trim() !== '') {
    return object;
  }
  return null;
}

export const isDefined = value => !(value === undefined || value === null);

export const isNumber = value => isDefined(value) && !isNaN(value);

export const isPercent = value => isNumber(value) && value >= 1 && value < 100;

export const filterClone = value => value;

export const isNonEmptyArray = array => isDefined(array) && typeof array === 'object' && array.length > 0;

export const isValidEmail = email => Boolean(isDefined(email) && config.RegExp.Email.test(email.toLowerCase()));

export const isValidDate = date => (notNull(date) && moment(date).isValid());

export const notFetched = status => status !== FULFILLED && status !== PENDING && status !== REJECTED;
