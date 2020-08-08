import {CLEAR_DEGREES_LIST, FETCH_DEGREES_LIST, FULFILLED, PENDING, REJECTED} from '../constants/ActionTypes';

const initialState = {data: [], status: null};

export default function degreesList(state = initialState, action) {
  switch (action.type) {
    case FETCH_DEGREES_LIST + FULFILLED : {
      const filter = action.payload.data.payload;
      const newStatus = Object.assign({}, state, {data: filter, status: FULFILLED});
      return newStatus;
    }
    case FETCH_DEGREES_LIST + PENDING : {
      const profile = {data: [], status: PENDING};
      return profile;
    }
    case FETCH_DEGREES_LIST + REJECTED : {
      const profile = {data: [], status: REJECTED};
      return profile;
    }
    case CLEAR_DEGREES_LIST:
      return initialState;
    default:
      return state;
  }
}
