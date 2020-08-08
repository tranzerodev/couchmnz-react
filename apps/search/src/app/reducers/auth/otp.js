import {PENDING, VERIFY_OTP, FULFILLED, REJECTED} from '../../constants/ActionTypes';

const initialState = {
  data: {},
  status: ''
};

const otp = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_OTP + PENDING : {
      return Object.assign({}, state, {status: PENDING});
    }
    case VERIFY_OTP + FULFILLED : {
      const {responseCode, payload} = action.payload.data;
      if (responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {status: FULFILLED, data: payload});
    }
    case VERIFY_OTP + REJECTED : {
      return Object.assign({}, state, {status: REJECTED});
    }
    default:
      return state;
  }
};

export default otp;

