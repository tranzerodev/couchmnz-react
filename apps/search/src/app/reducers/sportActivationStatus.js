import {FULFILLED, REJECTED, PENDING, ACTIVATE_SPORT} from '../constants/ActionTypes';

const initialState = {data: {}, status: null};

export default function profileUpdateStatus(state = initialState, action) {
  switch (action.type) {
    case ACTIVATE_SPORT + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {status: FULFILLED});
    }
    case ACTIVATE_SPORT + PENDING : return {status: PENDING};
    case ACTIVATE_SPORT + REJECTED : return {status: REJECTED};
    default:
      return state;
  }
}
