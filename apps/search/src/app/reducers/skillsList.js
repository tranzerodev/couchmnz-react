import {
  CLEAR_SKILLS_LIST,
  FETCH_SKILLS_LIST,
  FULFILLED,
  REJECTED,
  PENDING
} from '../constants/ActionTypes';

const skillsList = (state = {data: []}, action) => {
  switch (action.type) {
    case FETCH_SKILLS_LIST + FULFILLED: return Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
    case FETCH_SKILLS_LIST + PENDING : return {data: [], status: PENDING};
    case FETCH_SKILLS_LIST + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_SKILLS_LIST: return {};
    default: return state;
  }
};

export default skillsList;
