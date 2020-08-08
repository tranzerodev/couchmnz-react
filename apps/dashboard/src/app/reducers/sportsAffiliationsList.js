import {FETCH_SPORTS_AFFILIATION_LIST, CLEAR_SPORTS_AFFILIATION_LIST, FULFILLED, PENDING, REJECTED} from '../constants/ActionTypes';

const initialState = {data: [], status: null};

export default function sportsAffiliationsList(state = initialState, action) {
  switch (action.type) {
    case FETCH_SPORTS_AFFILIATION_LIST + FULFILLED : {
      if (action.payload.data.responseCode === 0) {
        const filter = action.payload.data.payload;
        return Object.assign({}, state, {data: filter, status: FULFILLED});
      }
      return Object.assign({}, state, {data: [], status: REJECTED});
    }
    case FETCH_SPORTS_AFFILIATION_LIST + PENDING : {
      const profile = {data: [], status: PENDING};
      return profile;
    }
    case FETCH_SPORTS_AFFILIATION_LIST + REJECTED : {
      const profile = {data: [], status: REJECTED};
      return profile;
    }
    case CLEAR_SPORTS_AFFILIATION_LIST:
      return initialState;
    default:
      return state;
  }
}
