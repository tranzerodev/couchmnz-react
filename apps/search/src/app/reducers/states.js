import {
  SET_STATES,
  ADD_STATE,
  CLEAR_STATES,
  FETCH_STATES,
  FULFILLED,
  REJECTED,
  PENDING
} from '../constants/ActionTypes';

const states = (state = {data: []}, action) => {
  switch (action.type) {
    case SET_STATES: return Object.assign([], state, action.states);
    case FETCH_STATES + FULFILLED: return Object.assign({}, state, {data: action.payload.data.payload.states, status: FULFILLED});
    case FETCH_STATES + PENDING : return {data: [], status: PENDING};
    case FETCH_STATES + REJECTED : return {data: [], status: REJECTED};
    case ADD_STATE: return [...state, action.state];
    case CLEAR_STATES: return {data: []};
    default: return state;
  }
};

export default states;
