import {CHANGE_PASSWORD, PENDING, REJECTED, FULFILLED} from '../constants/ActionTypes';

const initialState = {
  status: null
};
export default function changePassword(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PASSWORD + PENDING: {
      return {status: PENDING};
    }
    case CHANGE_PASSWORD + REJECTED: {
      return {status: REJECTED};
    }
    case CHANGE_PASSWORD + FULFILLED: {
      return {
          status: action.payload.data.responseCode === 0 ? FULFILLED : REJECTED,
          data: action.payload.data
      };
    }
    default:
      return state;
  }
}
