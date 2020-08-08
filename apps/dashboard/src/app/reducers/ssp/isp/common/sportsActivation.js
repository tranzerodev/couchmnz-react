import {ACTIVATE_SPORT, PENDING, REJECTED, FULFILLED} from '../../../../constants/ActionTypes';

const initialState = {
  status: ''
};
export default function sportsActivation(state = initialState, action) {
  switch (action.type) {
    case ACTIVATE_SPORT + PENDING: {
      return Object.assign({}, initialState, {status: PENDING});
    }
    case ACTIVATE_SPORT + REJECTED: {
      return Object.assign({}, initialState, {status: REJECTED});
    }
    case ACTIVATE_SPORT + FULFILLED: {
      let status;
      if (action.payload.data.responseCode > 0) {
        status = REJECTED;
      } else {
        status = FULFILLED;
      }
      return Object.assign({}, initialState, {status});
    }
    default:
      return state;
  }
}
