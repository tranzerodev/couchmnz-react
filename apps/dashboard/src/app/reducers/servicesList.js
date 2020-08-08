import {

  FULFILLED,
  REJECTED,
  PENDING,
  FETCH_TRAINING_LIST,
  CLEAR_TRAINING_LIST
} from '../constants/ActionTypes';

const initialState = {
  data: []
};

const servicesList = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRAINING_LIST + FULFILLED: return Object.assign({}, state, {data: action.payload.data.payload.other, status: FULFILLED});
    case FETCH_TRAINING_LIST + PENDING : return {data: [], status: PENDING};
    case FETCH_TRAINING_LIST + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_TRAINING_LIST: return {data: []};
    default: return state;
  }
};

export default servicesList;
