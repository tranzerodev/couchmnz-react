import {FULFILLED, REJECTED, PENDING, ACTIVATE_NEW_PROFILE, CHANGE_PROFILE_ACTIVATION_STATUS} from '../constants/ActionTypes';

const initialState = {data: {}, status: null};

export default function profileUpdateStatus(state = initialState, action) {
  switch (action.type) {
    case ACTIVATE_NEW_PROFILE + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {status: FULFILLED});
    }
    case ACTIVATE_NEW_PROFILE + PENDING : return {status: PENDING};
    case ACTIVATE_NEW_PROFILE + REJECTED : return {status: REJECTED};
    // Case FETCH_PROFILE + PENDING : return {status: PENDING};
    // case FETCH_PROFILE + FULFILLED : return {status: FULFILLED};
    case CHANGE_PROFILE_ACTIVATION_STATUS: return {status: action.status};
    default:
      return state;
  }
}
