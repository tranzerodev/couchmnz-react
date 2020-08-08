import {ISP_FETCH_WORKING_DAYS, FULFILLED, PENDING, REJECTED, ISP_SAVE_WORKING_DAYS} from '../../../../constants/ActionTypes';
const disabledWeek = {startTime: null, endTime: null};
const initialState = {data: {
  MON: disabledWeek,
  TUE: disabledWeek,
  WED: disabledWeek,
  THU: disabledWeek,
  FRI: disabledWeek,
  SAT: disabledWeek,
  SUN: disabledWeek
}, status: null, postStatus: null};

export default function workingDays(state = initialState, action) {
  switch (action.type) {
    case ISP_FETCH_WORKING_DAYS + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
    }
    case ISP_FETCH_WORKING_DAYS + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case ISP_FETCH_WORKING_DAYS + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case ISP_SAVE_WORKING_DAYS + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {postStatus: REJECTED});
      }
      return Object.assign({}, state, {postStatus: FULFILLED});
    }
    case ISP_SAVE_WORKING_DAYS + PENDING: {
      return Object.assign({}, state, {postStatus: PENDING});
    }
    case ISP_SAVE_WORKING_DAYS + REJECTED: {
      return Object.assign({}, state, {postStatus: REJECTED});
    }
    case ISP_FETCH_WORKING_DAYS:
      return initialState;
    default:
      return state;
  }
}
