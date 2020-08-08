import {CLEAR_INSTITUTIONS_LIST, FETCH_INSTITUTIONS_LIST, FULFILLED, PENDING, REJECTED} from '../constants/ActionTypes';

const initialState = {};

export default function institutionsList(state = initialState, action) {
  switch (action.type) {
    case FETCH_INSTITUTIONS_LIST + FULFILLED : {
      const data = action.payload.data.payload;
      const newStatus = Object.assign({}, state, {data, status: FULFILLED});
      return newStatus;
    }
    case FETCH_INSTITUTIONS_LIST + PENDING : {
      const profile = {data: [], status: PENDING};
      return profile;
    }
    case FETCH_INSTITUTIONS_LIST + REJECTED : {
      const profile = {data: [], status: REJECTED};
      return profile;
    }
    case CLEAR_INSTITUTIONS_LIST:
      return initialState;
    default:
      return state;
  }
}
