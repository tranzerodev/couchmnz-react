import {
  SET_COUNTRIES,
  ADD_COUNTRY,
  CLEAR_COUNTRIES,
  FETCH_COUNTRIES,
  FULFILLED,
  REJECTED,
  PENDING
} from '../constants/ActionTypes';

const countries = (state = {data: []}, action) => {
  switch (action.type) {
    case SET_COUNTRIES: return Object.assign([], state, action.countries);
    case FETCH_COUNTRIES + FULFILLED: return Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
    case FETCH_COUNTRIES + PENDING : return {data: [], status: PENDING};
    case FETCH_COUNTRIES + REJECTED : return {data: [], status: REJECTED};
    case ADD_COUNTRY: return [...state, action.country];
    case CLEAR_COUNTRIES: return {data: []};
    default: return state;
  }
};

export default countries;
