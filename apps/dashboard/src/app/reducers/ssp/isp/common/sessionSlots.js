import {FULFILLED, REJECTED, PENDING, FETCH_ISP_AVAILABLE_SESSION_SLOTS} from '../../../../constants/ActionTypes';

const initialState = {
  data: [],
  status: null
};

export default function sessionSlots(state = initialState, action) {
  switch (action.type) {
    case FETCH_ISP_AVAILABLE_SESSION_SLOTS + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      const data = action.payload.data.payload;
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    case FETCH_ISP_AVAILABLE_SESSION_SLOTS + PENDING : return {status: PENDING};
    case FETCH_ISP_AVAILABLE_SESSION_SLOTS + REJECTED : return {status: REJECTED};
    case FETCH_ISP_AVAILABLE_SESSION_SLOTS: return {status: action.status};
    default:
      return state;
  }
}
