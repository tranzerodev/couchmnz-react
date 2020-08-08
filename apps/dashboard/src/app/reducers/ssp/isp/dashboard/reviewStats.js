import {FULFILLED, REJECTED, FETCH_REVIEW_STATS, PENDING} from '../../../../constants/ActionTypes';
const initialState = {};
const reviewStats = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEW_STATS + FULFILLED : {
      const reviewStats = {data: action.payload.data.payload, status: FULFILLED};
      return reviewStats;
    }
    case FETCH_REVIEW_STATS + PENDING : {
      const reviewStats = {data: {}, status: PENDING};
      return reviewStats;
    }
    case FETCH_REVIEW_STATS + REJECTED : {
      const reviewStats = {data: {}, status: REJECTED};
      return reviewStats;
    }
    default:
      return state;
  }
};

export default reviewStats;

