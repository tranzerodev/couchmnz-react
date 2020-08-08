import {notNull} from '../../../common/util';
export default function validation({bookingPreference, cancellationPolicy, bookingCutOffTime}) {
  const validation = {
    bookingPreference: false,
    cancellationPolicy: false,
    bookingCutOffTime: false,
    valid: false
  };
  validation.bookingPreference = notNull(bookingPreference);
  validation.cancellationPolicy = notNull(cancellationPolicy);
  validation.bookingCutOffTime = notNull(bookingCutOffTime);
  validation.valid = validation.bookingPreference && validation.cancellationPolicy && validation.bookingCutOffTime;
  return validation;
}
