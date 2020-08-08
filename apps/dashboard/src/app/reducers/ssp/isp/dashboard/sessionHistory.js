
import {FETCH_SESSION_HISTORY, FULFILLED, PENDING, REJECTED, CLEAR_SESSION_HISTORY} from '../../../../constants/ActionTypes';

const initialState = {
  data: [],
  total: 0
};

export default function sessionHistory(state = initialState, action) {
  switch (action.type) {
    case FETCH_SESSION_HISTORY + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        const payload = action.payload.data.payload;
        return Object.assign({}, state, {data: payload.sessions, total: payload.total, status: FULFILLED});
      }

      return Object.assign({}, state, {data: [], total: 0, status: REJECTED});
    }
    case FETCH_SESSION_HISTORY + PENDING : return {data: [], total: 0, status: PENDING};
    case FETCH_SESSION_HISTORY + REJECTED : return {data: [], total: 0, status: REJECTED};
    case CLEAR_SESSION_HISTORY:
      return initialState;
    default:
      return state;
  }
}
