import {FETCH_ISP_ORDER_UPCOMMING_SESSIONS, FULFILLED, REJECTED, PENDING} from '../../../../constants/ActionTypes';

const initialState = {
  data: [],
  status: null
};
export default function orderUpcommingSessions(state = initialState, action) {
  switch (action.type) {
    case FETCH_ISP_ORDER_UPCOMMING_SESSIONS + FULFILLED : {
      if (action.payload.data.responseCode >= 100) {
        return Object.assign({}, initialState, {status: REJECTED});
      }
      const data = action.payload.data.payload;
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    case FETCH_ISP_ORDER_UPCOMMING_SESSIONS + PENDING : return Object.assign({}, initialState, {status: PENDING});
    case FETCH_ISP_ORDER_UPCOMMING_SESSIONS + REJECTED : return Object.assign({}, initialState, {status: REJECTED});
    default:
      return state;
  }
}
