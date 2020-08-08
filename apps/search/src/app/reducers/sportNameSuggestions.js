import {FULFILLED, FETCH_SPORT_SUGGESTION_ES, PENDING} from '../constants/ActionTypes';

const initialState = {data: null, status: null};
export default function sportNameSuggestions(state = initialState, action) {
  switch (action.type) {
    case FETCH_SPORT_SUGGESTION_ES + PENDING: {
      return Object.assign({}, state, {status: FULFILLED});
    }
    case FETCH_SPORT_SUGGESTION_ES + FULFILLED: {
      const {data} = action.payload;
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    default:
      return state;
  }
}
