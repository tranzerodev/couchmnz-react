import {notNull} from './util';
import appConstants from '../../constants/appConstants';

export default function validateOtp(otp) {
  const validation = {};
  validation.required = notNull(otp);
  validation.valid = validation.required && otp.length === appConstants.auth.otpCodeLength;
  return validation;
}
