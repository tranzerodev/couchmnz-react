import {FULFILLED, PENDING, REJECTED, FETCH_ISP_SESSION_DETAILS} from '../../../../constants/ActionTypes';

const initialState = {
  data: null,
  status: null
};

export default function sessionDetails(state = initialState, action) {
  switch (action.type) {
    case FETCH_ISP_SESSION_DETAILS + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        const data = action.payload.data.payload;
        return Object.assign({}, state, {data: data.package, status: FULFILLED});
      }

      return Object.assign({}, state, {data: initialState, status: REJECTED});
    }
    case FETCH_ISP_SESSION_DETAILS + PENDING : return Object.assign({}, state, {status: PENDING});
    case FETCH_ISP_SESSION_DETAILS + REJECTED : return Object.assign({}, state, {status: REJECTED});
    default:
      return state;
  }
}
