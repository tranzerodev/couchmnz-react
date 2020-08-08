import {FULFILLED, REJECTED, PENDING, ADD_NEW_AWARD_TO_DB} from '../constants/ActionTypes';

const initialState = {data: {}, status: null};

export default function profileUpdateStatus(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_AWARD_TO_DB + FULFILLED : {
      if (action.payload.data.responseCode >= 100) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {status: FULFILLED});
    }
    case ADD_NEW_AWARD_TO_DB + PENDING : return {status: PENDING};
    case ADD_NEW_AWARD_TO_DB + REJECTED : return {status: REJECTED};
    default:
      return state;
  }
}
