import {FULFILLED, SET_SPORTS_DEGREE, CLEAR_SPORTS_DEGREES_LIST, SET_SPORTS_DEGREE_LIST, FETCH_DEGREES_LIST} from '../constants/ActionTypes';

const initialState = {data: [], status: null};

export default function certificationsList(state = initialState, action) {
  switch (action.type) {
    case FETCH_DEGREES_LIST + FULFILLED : {
      const filter = action.payload.data.payload.filter(degree => degree.sportID !== null);
      const newStatus = Object.assign({}, state, {data: filter, status: FULFILLED});
      return newStatus;
    }
    case CLEAR_SPORTS_DEGREES_LIST:
      return initialState;
    default:
      return state;
  }
}
