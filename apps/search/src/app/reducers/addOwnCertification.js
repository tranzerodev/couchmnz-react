import {ADD_NEW_CERTIFICATION_TO_DB, PENDING, REJECTED, FULFILLED} from '../constants/ActionTypes';

const initialState = {data: {}, status: null};

export default function addOwnCertificationUpdateStatus(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_CERTIFICATION_TO_DB + FULFILLED : {
      if (action.payload.data.responseCode >= 100) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {status: FULFILLED});
    }
    case ADD_NEW_CERTIFICATION_TO_DB + PENDING : return {status: PENDING};
    case ADD_NEW_CERTIFICATION_TO_DB + REJECTED : return {status: REJECTED};
    default:
      return state;
  }
}
