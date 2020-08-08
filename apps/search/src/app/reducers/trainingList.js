import {
  CLEAR_TRAINING_LIST,
  FETCH_TRAINING_LIST,
  FULFILLED,
  REJECTED,
  PENDING
} from '../constants/ActionTypes';

const trainingList = (state = {data: []}, action) => {
  switch (action.type) {
    case FETCH_TRAINING_LIST + FULFILLED: return Object.assign({}, state, {data: action.payload.data.payload.general, status: FULFILLED});
    case FETCH_TRAINING_LIST + PENDING : return {data: [], status: PENDING};
    case FETCH_TRAINING_LIST + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_TRAINING_LIST: return {data: []};
    default: return state;
  }
};

export default trainingList;
