import {FULFILLED, PENDING, REJECTED, FETCH_USER_PROFILES, CLEAR_USER_PROFILES} from '../constants/ActionTypes';

const initialState = {data: [], status: null, selectedProfile: null};
const userProfiles = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILES + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case FETCH_USER_PROFILES + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
    }
    case FETCH_USER_PROFILES + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case CLEAR_USER_PROFILES: {
      return initialState;
    }
    default:
      return state;
  }
};

export default userProfiles;
