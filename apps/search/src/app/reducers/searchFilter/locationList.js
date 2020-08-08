import {UPDATE_SEARCH_LOCATION_LIST, CLEAR_SEARCH_LOCATION_LIST, FULFILLED, PENDING, REJECTED} from '../../constants/ActionTypes';

const initialState = {};

export default function searchLocationList(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SEARCH_LOCATION_LIST + FULFILLED: {
      const data = action.payload.data;
      const newStatus = Object.assign({}, state, {data, status: FULFILLED});
      return newStatus;
    }
    case UPDATE_SEARCH_LOCATION_LIST + PENDING: {
      const data = {};
      const newStatus = Object.assign({}, state, {data, status: PENDING});
      return newStatus;
    }
    case UPDATE_SEARCH_LOCATION_LIST + REJECTED: {
      const data = {};
      const newStatus = Object.assign({}, state, {data, status: REJECTED});
      return newStatus;
    }
    case CLEAR_SEARCH_LOCATION_LIST:
      return initialState;
    default:
      return state;
  }
}
