import {FULFILLED, REJECTED, PENDING, ISP_VERIFY_BUSINESS_EMAIL_OTP} from '../../../../constants/ActionTypes';

const initialState = {data: {email: null}, status: null};

export default function businessEmailVerification(state = initialState, action) {
  switch (action.type) {
    case ISP_VERIFY_BUSINESS_EMAIL_OTP + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      const verificationStatus = {data: action.payload.data.payload, status: FULFILLED};
      return verificationStatus;
    }
    case ISP_VERIFY_BUSINESS_EMAIL_OTP + PENDING: return Object.assign({}, state, {status: PENDING});
    case ISP_VERIFY_BUSINESS_EMAIL_OTP + REJECTED: return Object.assign({}, state, {status: REJECTED});
    default:
      return state;
  }
}
