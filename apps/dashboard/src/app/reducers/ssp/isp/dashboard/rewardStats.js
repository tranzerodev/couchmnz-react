import {FULFILLED, REJECTED, FETCH_REWARDS_STATS, PENDING} from '../../../../constants/ActionTypes';
const initialState = {};
const rewardStats = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REWARDS_STATS + FULFILLED : {
      const rewardStats = {data: action.payload.data.payload, status: FULFILLED};
      return rewardStats;
    }
    case FETCH_REWARDS_STATS + PENDING : {
      const rewardStats = {data: {}, status: PENDING};
      return rewardStats;
    }
    case FETCH_REWARDS_STATS + REJECTED : {
      const rewardStats = {data: {}, status: REJECTED};
      return rewardStats;
    }
    default:
      return state;
  }
};

export default rewardStats;

