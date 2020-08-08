import {FULFILLED, REJECTED, PENDING, FETCH_SPORTS_TOOLS_LIST, CLEAR_SPORTS_TOOLS_LIST} from '../constants/ActionTypes';

const initialState = {data: [], status: null};

export default function sportsToolsList(state = initialState, action) {
  switch (action.type) {
    case FETCH_SPORTS_TOOLS_LIST + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        const filter = action.payload.data.payload;
        return Object.assign({}, state, {data: filter, status: FULFILLED});
      }
      return Object.assign({}, state, {data: [], status: REJECTED});
    }
    case FETCH_SPORTS_TOOLS_LIST + PENDING: {
      return {data: [], status: PENDING};
    }
    case FETCH_SPORTS_TOOLS_LIST + REJECTED: {
      return {data: [], status: REJECTED};
    }
    case CLEAR_SPORTS_TOOLS_LIST:
      return initialState;
    default:
      return state;
  }
}
