import {FULFILLED, REJECTED, PENDING, ISP_SEARCH_ATHLETE} from '../../../../constants/ActionTypes';

const initialState = {
  data: [],
  status: null
};

export default function athleteSearchResults(state = initialState, action) {
  switch (action.type) {
    case ISP_SEARCH_ATHLETE + FULFILLED: {
      if (action.payload.data.responseCode >= 100) {
        return Object.assign({}, initialState, {status: REJECTED});
      }

      const data = action.payload.data.payload;
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    case ISP_SEARCH_ATHLETE + PENDING: return Object.assign({}, state, {status: PENDING});
    case ISP_SEARCH_ATHLETE + REJECTED: return Object.assign({}, initialState, {status: REJECTED});
    default:
      return state;
  }
}
