import {FETCH_REWARDS_HISTORY, FULFILLED, REJECTED, PENDING, FILTER_CHANGE_REWARDS_HISTORY} from '../../../../constants/ActionTypes';
const initialState = {};
const rewardsHistory = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REWARDS_HISTORY + FULFILLED : {
      let data = state.data;
      if (state.data && state.data.history && state.data.history.length > 0) {
        Array.prototype.push.apply(data.history, action.payload.data.payload.history);
      } else {
        data = action.payload.data.payload;
      }
      const rewardsHistory = {data, status: FULFILLED};
      return rewardsHistory;
    }
    case FETCH_REWARDS_HISTORY + REJECTED : {
      const rewardsHistory = {...state, status: REJECTED};
      return rewardsHistory;
    }
    case FETCH_REWARDS_HISTORY + PENDING : {
      const rewardsHistory = {...state, status: PENDING};
      return rewardsHistory;
    }
    case FILTER_CHANGE_REWARDS_HISTORY + FULFILLED: {
      const rewardsHistory = {data: action.payload.data.payload, status: FULFILLED};
      return rewardsHistory;
    }
    case FILTER_CHANGE_REWARDS_HISTORY + REJECTED : {
      const rewardsHistory = {...state, status: REJECTED};
      return rewardsHistory;
    }
    case FILTER_CHANGE_REWARDS_HISTORY + PENDING : {
      const rewardsHistory = {...state, status: PENDING};
      return rewardsHistory;
    }
    default:
      return state;
  }
};

export default rewardsHistory;

