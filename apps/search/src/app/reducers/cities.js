import {
  FULFILLED,
  REJECTED,
  PENDING,
  SET_CITIES,
  FETCH_CITIES,
  ADD_CITIES,
  CLEAR_CITIES
} from '../constants/ActionTypes';

const cities = (state = {data: []}, action) => {
  switch (action.type) {
    case SET_CITIES: return Object.assign([], state, action.states);
    case FETCH_CITIES + FULFILLED: {
      let cities = {};
      if (action.payload.data.responseCode === 0) {
        cities = Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
      } else {
        cities = Object.assign({}, state, {data: null, status: REJECTED});
      }
      return cities;
    }
    case FETCH_CITIES + PENDING : return {data: [], status: PENDING};
    case FETCH_CITIES + REJECTED : return {data: [], status: REJECTED};
    case ADD_CITIES: return [...state, action.state];
    case CLEAR_CITIES: return {data: []};
    default: return state;
  }
};

export default cities;
