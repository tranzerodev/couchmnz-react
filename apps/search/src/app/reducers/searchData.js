import {FULFILLED, PENDING, REJECTED, FETCH_ELASTIC_SEARCH_DATA, FETCH_ELASTIC_SEARCH_DATA_SORTED} from '../constants/ActionTypes';

const initialState = {data: null, status: null};
export default function searchData(state = initialState, action) {
  switch (action.type) {
    case FETCH_ELASTIC_SEARCH_DATA + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case FETCH_ELASTIC_SEARCH_DATA + FULFILLED: {
      const {data} = action.payload;
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    case FETCH_ELASTIC_SEARCH_DATA_SORTED: {
      const {data} = action;
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    case FETCH_ELASTIC_SEARCH_DATA + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    default:
      return state;
  }
}

