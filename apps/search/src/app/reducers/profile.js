import {UPDATE_PROFILE, CLEAR_PROFILE, FETCH_PROFILE, FULFILLED, REJECTED, PENDING} from '../constants/ActionTypes';

const initialState = {data: {}, status: null};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE: {
      console.log(action.profile);
      return Object.assign({}, state, action.profile);
    }
    case FETCH_PROFILE + FULFILLED : {
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
    case FETCH_PROFILE + PENDING : {
      const profile = {data: {}, status: PENDING};
      return profile;
    }
    // Case POST_PROFILE + FULFILLED : return Object.assign({}, state, {status: FULFILLED});
    // case POST_PROFILE + PENDING : return {status: PENDING};
    // case POST_PROFILE + REJECTED : return {status: REJECTED};
    case CLEAR_PROFILE:
      return {data: {}};
    default:
      return state;
  }
}
