import {FULFILLED, REJECTED, PENDING, PARENT_VERIFY_EMAIL_OTP, PARENT_VERIFY_EMAIL} from '../../../constants/ActionTypes';

const initialState = {data: {email: null}, status: null, verifyEmail: '', otpVerificationStatusCode: null, verificationStatusCode: null, verifyEmailstatus: null};

export default function emailVerification(state = initialState, action) {
  switch (action.type) {
    case PARENT_VERIFY_EMAIL_OTP + FULFILLED: {
      const {responseCode} = action.payload.data;
      const otpVerificationStatusCode = responseCode;
      if (responseCode === 0) {
        const data = JSON.parse(action.payload.config.data);
        const verificationStatus = {data: {email: data.email, otpVerificationStatusCode}, status: FULFILLED};
        return verificationStatus;
      }
      const data = JSON.parse(action.payload.config.data);
      const verificationStatus = {data: {email: data.email, otpVerificationStatusCode}, status: REJECTED};
      return verificationStatus;
    }
    case PARENT_VERIFY_EMAIL_OTP + PENDING: return Object.assign({}, state, {status: PENDING});
    case PARENT_VERIFY_EMAIL_OTP + REJECTED: return Object.assign({}, state, {status: REJECTED});
    case PARENT_VERIFY_EMAIL + FULFILLED: {
      const {responseCode} = action.payload.data;
      const verifyEmail = action.meta.email;
      const verifyEmailstatus = (responseCode === 0) ? FULFILLED : REJECTED;

      return Object.assign({}, state, {verificationStatusCode: responseCode, verifyEmailstatus, verifyEmail});
    }

    case PARENT_VERIFY_EMAIL + PENDING: return Object.assign({}, state, {verifyEmailstatus: PENDING});
    case PARENT_VERIFY_EMAIL + REJECTED: return Object.assign({}, state, {verificationStatusCode: null, verifyEmailstatus: REJECTED});
    default:
      return state;
  }
}
