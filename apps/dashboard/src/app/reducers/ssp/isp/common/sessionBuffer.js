import {FULFILLED, REJECTED, PENDING, SS_SESSION_BUFFER, SS_SESSION_BUFFER_STATUS} from '../../../../constants/ActionTypes';

const initialState = {status: null};

export default function sessionBuffer(state = initialState, action) {
  switch (action.type) {
    case SS_SESSION_BUFFER + FULFILLED : {
      if (action.payload.data.responseCode >= 100) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {status: FULFILLED});
    }
    case SS_SESSION_BUFFER + PENDING : return {status: PENDING};
    case SS_SESSION_BUFFER + REJECTED : return {status: REJECTED};
    case SS_SESSION_BUFFER_STATUS: return {status: action.status};
    default:
      return state;
  }
}
