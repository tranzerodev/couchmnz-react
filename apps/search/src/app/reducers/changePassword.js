import {CHANGE_PASSWORD, PENDING, REJECTED, FULFILLED} from '../constants/ActionTypes';

const initialState = {
  status: ''
};
export default function changePassword(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PASSWORD + PENDING: {
      const newState = Object.assign({}, initialState, {status: PENDING});
      return newState;
    }
    case CHANGE_PASSWORD + REJECTED: {
      const newState = Object.assign({}, initialState, {status: REJECTED});
      return newState;
    }
    case CHANGE_PASSWORD + FULFILLED: {
      let status;
      if (action.payload.data.responseCode > 0) {
        status = REJECTED;
      } else {
        status = FULFILLED;
      }
      const newState = Object.assign({}, initialState, status);
      return newState;
    }
    default:
      return state;
  }
}
