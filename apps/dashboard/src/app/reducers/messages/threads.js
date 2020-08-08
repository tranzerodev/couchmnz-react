import {FULFILLED, PENDING, REJECTED, FETCH_MESSAGE_THREADS} from '../../constants/ActionTypes';
import config from '../../config';
const {defaultThreadPageLimit, defaultThreadPage} = config.messagingSystem;
const initialState = {
  data: [],
  status: null,
  limit: defaultThreadPageLimit,
  page: defaultThreadPage,
  total: 20
};
const threads = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGE_THREADS + PENDING: {
      const newState = Object.assign({}, state, {status: PENDING});
      return newState;
    }
    case FETCH_MESSAGE_THREADS + FULFILLED: {
      const {threads, page, total} = action.payload.data.payload;
      const newState = Object.assign({}, initialState, {data: threads, total, page, status: FULFILLED});
      return newState;
    }
    case FETCH_MESSAGE_THREADS + REJECTED: {
      const newState = Object.assign({}, initialState, {status: REJECTED});
      return newState;
    }
    default:
      return state;
  }
};

export default threads;

