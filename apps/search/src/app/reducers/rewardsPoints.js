import {FETCH_REWARDS, FULFILLED, REJECTED, PENDING} from '../constants/ActionTypes';
const initialState = {};
const rewardsPoints = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REWARDS + FULFILLED : {
      const rewardsPoints = {data: action.payload.data.payload, status: FULFILLED};
      return rewardsPoints;
    }
    case FETCH_REWARDS + PENDING : {
      const rewardsPoints = {data: {}, status: PENDING};
      return rewardsPoints;
    }
    case FETCH_REWARDS + REJECTED : {
      const rewardsPoints = {data: {}, status: REJECTED};
      return rewardsPoints;
    }
    default:
      return state;
  }
};

export default rewardsPoints;

