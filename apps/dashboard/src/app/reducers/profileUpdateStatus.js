import {FULFILLED, REJECTED, PENDING, POST_PROFILE, FETCH_PROFILE, CHANGE_PROFILE_UPDATE_STATUS} from '../constants/ActionTypes';

const initialState = {data: {}, status: null};

export default function profileUpdateStatus(state = initialState, action) {
  switch (action.type) {
    case POST_PROFILE + FULFILLED : {
      if (action.payload.data.responseCode >= 100) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {status: FULFILLED});
    }
    case POST_PROFILE + PENDING : return {status: PENDING};
    case POST_PROFILE + REJECTED : return {status: REJECTED};
    // Case FETCH_PROFILE + PENDING : return {status: PENDING};
    // case FETCH_PROFILE + FULFILLED : return {status: FULFILLED};
    case CHANGE_PROFILE_UPDATE_STATUS: return {status: action.status};
    default:
      return state;
  }
}
