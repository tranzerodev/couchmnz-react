import {FULFILLED, REJECTED, PENDING, ACTIVATE_SPORT_AND_PROFILE} from '../constants/ActionTypes';

const initialState = {data: {}, status: null};

export default function profileUpdateStatus(state = initialState, action) {
  switch (action.type) {
    case ACTIVATE_SPORT_AND_PROFILE + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {status: FULFILLED});
    }
    case ACTIVATE_SPORT_AND_PROFILE + PENDING : return {status: PENDING};
    case ACTIVATE_SPORT_AND_PROFILE + REJECTED : return {status: REJECTED};
    default:
      return state;
  }
}
