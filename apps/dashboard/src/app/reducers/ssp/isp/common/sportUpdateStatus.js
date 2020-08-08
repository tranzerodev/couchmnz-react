import {FULFILLED, REJECTED, PENDING, POST_CURRENT_SPORT, CHANGE_SPORT_UPDATE_STATUS, FETCH_CURRENT_SPORT} from '../../../../constants/ActionTypes';

const initialState = {status: null};

export default function sportUpdateStatus(state = initialState, action) {
  switch (action.type) {
    case POST_CURRENT_SPORT + FULFILLED : {
      if (action.payload.data.responseCode >= 100) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {status: FULFILLED});
    }
    case POST_CURRENT_SPORT + PENDING : return {status: PENDING};
    case POST_CURRENT_SPORT + REJECTED : return {status: REJECTED};
    // Case FETCH_PROFILE + PENDING : return {status: PENDING};
    // case FETCH_PROFILE + FULFILLED : return {status: FULFILLED};
    case CHANGE_SPORT_UPDATE_STATUS: return {status: action.status};
    default:
      return state;
  }
}
