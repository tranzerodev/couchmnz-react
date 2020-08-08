import {CLEAR_PROFILE, FETCH_PROFILE, FULFILLED, REJECTED, PENDING, FETCH_ATHLETE_PROFILE, FETCH_PARENT_PROFILE} from '../constants/ActionTypes';

const initialState = {data: {}, status: null};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case FETCH_PARENT_PROFILE + FULFILLED:
    case FETCH_ATHLETE_PROFILE + FULFILLED: {
      const data = action.payload.data.payload;
      const {responseCode} = action.payload.data;
      const profile = Object.assign({}, state, responseCode > 0 ? {status: REJECTED} : {data, status: FULFILLED});
      return profile;
    }
    case FETCH_PROFILE + FULFILLED : {
      console.log('action', action);
      const data = action.payload.data.payload;
      let newStatus;
      if (action.payload.data.responseCode > 0) {
        newStatus = Object.assign({}, state, {status: REJECTED});
      } else {
        newStatus = Object.assign({}, state, {data, status: FULFILLED});
      }
      return newStatus;
    }
    case FETCH_ATHLETE_PROFILE + PENDING:
    case FETCH_PARENT_PROFILE + PENDING:
    case FETCH_PROFILE + PENDING : {
      const newState = Object.assign({}, state, {status: PENDING});
      return newState;
    }
    case CLEAR_PROFILE:
      return {data: {}};
    default:
      return state;
  }
}
