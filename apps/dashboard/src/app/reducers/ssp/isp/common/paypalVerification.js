import {FULFILLED, REJECTED, PENDING, SET_PAYPAL_VERIFICATION_STATUS, VERIFY_PAYAPAL_PIN} from '../../../../constants/ActionTypes';

const initialState = {data: null, status: null, displaySuccess: false};

export default function paypalEmailVerification(state = initialState, action) {
  switch (action.type) {
    case VERIFY_PAYAPAL_PIN + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return {data: {email: ''}, status: REJECTED};
      }
      const verificationStatus = {data: action.payload.data.payload, status: FULFILLED, displaySuccess: true};
      return verificationStatus;
    }
    case VERIFY_PAYAPAL_PIN + PENDING: return {data: null, status: PENDING, displaySuccess: false};
    case VERIFY_PAYAPAL_PIN + REJECTED: return {data: {email: ''}, status: REJECTED, displaySuccess: false};
    case SET_PAYPAL_VERIFICATION_STATUS: {
      const {data} = action;
      return data;
    }
    default:
      return state;
  }
}
