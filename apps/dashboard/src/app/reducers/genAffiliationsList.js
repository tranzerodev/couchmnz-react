import {FETCH_AFFILIATION_LIST, CLEAR_AFFILIATION_LIST, FULFILLED, PENDING, REJECTED} from '../constants/ActionTypes';

const initialState = {data: [], status: null};

export default function genAffiliationsList(state = initialState, action) {
  switch (action.type) {
    case FETCH_AFFILIATION_LIST + FULFILLED : {
      const filter = action.payload.data.payload;
      const newStatus = Object.assign({}, state, {data: filter, status: FULFILLED});
      return newStatus;
    }
    case FETCH_AFFILIATION_LIST + PENDING : {
      const profile = {data: [], status: PENDING};
      return profile;
    }
    case FETCH_AFFILIATION_LIST + REJECTED : {
      const profile = {data: [], status: REJECTED};
      return profile;
    }
    case CLEAR_AFFILIATION_LIST:
      return initialState;
    default:
      return state;
  }
}
