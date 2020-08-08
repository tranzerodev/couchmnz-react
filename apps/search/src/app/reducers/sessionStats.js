import {FULFILLED, REJECTED, FETCH_SESSION_STATS, PENDING} from '../constants/ActionTypes';
const initialState = {};
const sessionStats = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SESSION_STATS + FULFILLED : {
      const sessionStats = {data: action.payload.data.payload, status: FULFILLED};
      return sessionStats;
    }
    case FETCH_SESSION_STATS + PENDING : {
      const sessionStats = {data: {}, status: PENDING};
      return sessionStats;
    }
    case FETCH_SESSION_STATS + REJECTED : {
      const sessionStats = {data: {}, status: REJECTED};
      return sessionStats;
    }
    default:
      return state;
  }
};

export default sessionStats;

