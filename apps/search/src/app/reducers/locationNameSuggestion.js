import {FULFILLED, PENDING, FETCH_LOCATION_SUGGESTION_ES} from '../constants/ActionTypes';

const initialState = {data: null, status: null};
export default function locationNameSuggestion(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOCATION_SUGGESTION_ES + PENDING: {
      return Object.assign({}, state, {status: FULFILLED});
    }
    case FETCH_LOCATION_SUGGESTION_ES + FULFILLED: {
      const {data} = action.payload;
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    default:
      return state;
  }
}
