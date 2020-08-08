import {FULFILLED, REJECTED, ISP_FETCH_AVAILABLE_SESSION_TIME_SLOTS, PENDING} from '../../../../constants/ActionTypes';
const initialState = {
  data: [],
  status: null
};
const sessionTimeSlots = (state = initialState, action) => {
  switch (action.type) {
    case ISP_FETCH_AVAILABLE_SESSION_TIME_SLOTS + FULFILLED : {
      const newState = {data: action.payload.data, status: FULFILLED};
      return newState;
    }
    case ISP_FETCH_AVAILABLE_SESSION_TIME_SLOTS + PENDING : {
      const newState = Object.assign({}, initialState, {status: PENDING});
      return newState;
    }
    case ISP_FETCH_AVAILABLE_SESSION_TIME_SLOTS + REJECTED : {
      const newState = Object.assign({}, initialState, {status: REJECTED});
      return newState;
    }
    default:
      return state;
  }
};

export default sessionTimeSlots;

