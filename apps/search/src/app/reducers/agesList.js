import {
  CLEAR_AGES_LIST,
  FETCH_AGES_LIST,
  FULFILLED,
  REJECTED,
  PENDING
} from '../constants/ActionTypes';

const agesList = (state = {data: []}, action) => {
  switch (action.type) {
    case FETCH_AGES_LIST + FULFILLED: return Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
    case FETCH_AGES_LIST + PENDING : return {data: [], status: PENDING};
    case FETCH_AGES_LIST + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_AGES_LIST: return {data: []};
    default: return state;
  }
};

export default agesList;
