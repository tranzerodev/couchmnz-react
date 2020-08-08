import {FETCH_MASTER_DATA_DAYS_OF_WEEK, FULFILLED, PENDING, REJECTED} from '../constants/ActionTypes';

const initialState = {
  data: [],
  status: null
};
const daysOfWeek = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MASTER_DATA_DAYS_OF_WEEK + PENDING : {
      return Object.assign({}, state, {status: PENDING});
    }
    case FETCH_MASTER_DATA_DAYS_OF_WEEK + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      const data = action.payload.data.payload;
      return Object.assign({}, state, {data, status: FULFILLED});
    }

    case FETCH_MASTER_DATA_DAYS_OF_WEEK + REJECTED : {
      return Object.assign({}, state, {status: REJECTED});
    }
    default: return state;
  }
};

export default daysOfWeek;
