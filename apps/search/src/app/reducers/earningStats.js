import {FULFILLED, REJECTED, FETCH_EARNING_STATS, PENDING} from '../constants/ActionTypes';
const initialState = {};
const earningStats = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EARNING_STATS + FULFILLED : {
      const earningStats = {data: action.payload.data.payload, status: FULFILLED};
      return earningStats;
    }
    case FETCH_EARNING_STATS + PENDING : {
      const earningStats = {data: {}, status: PENDING};
      return earningStats;
    }
    case FETCH_EARNING_STATS + REJECTED : {
      const earningStats = {data: {}, status: REJECTED};
      return earningStats;
    }
    default:
      return state;
  }
};

export default earningStats;

