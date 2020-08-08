import moment from 'moment';
export function isFutureDates(current) {
  const today = moment().startOf('day');
  return current.isBefore(today);
}
