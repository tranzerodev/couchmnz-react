import {UPDATE_CURRENT_SPORT, CLEAR_CURRENT_SPORT, FETCH_CURRENT_SPORT, FULFILLED, REJECTED, PENDING} from '../constants/ActionTypes';

const initialState = {data: {}, status: null};

export default function currentSport(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENT_SPORT: {
      return Object.assign({}, state, action.sport);
    }
    case FETCH_CURRENT_SPORT + FULFILLED : {
      console.log('action', action);
      const data = action.payload.data.payload;
      let newStatus;
      if (action.payload.data.responseCode > 0) {
        newStatus = Object.assign({}, state, {data: {}, status: REJECTED});
      } else {
        newStatus = Object.assign({}, state, {data, status: FULFILLED});
      }
      return newStatus;
    }
    case FETCH_CURRENT_SPORT + PENDING : {
      const currentSport = {data: {}, status: PENDING};
      return currentSport;
    }
    // Case POST_CURRENT_SPORT + FULFILLED : return Object.assign({}, state, {status: FULFILLED});
    // case POST_CURRENT_SPORT + PENDING : return {status: PENDING};
    // case POST_CURRENT_SPORT + REJECTED : return {status: REJECTED};
    case CLEAR_CURRENT_SPORT:
      return {data: {}};
    default:
      return state;
  }
}
