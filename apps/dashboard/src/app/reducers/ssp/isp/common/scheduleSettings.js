import {FULFILLED, REJECTED, PENDING, SS_CANCEL_SCHEDULE_SETTINGS, FETCH_ISP_SCHEDULE_SETTINGS} from '../../../../constants/ActionTypes';

const initialState = {
  data: null,
  status: null
};

export default function scheduleSettings(state = initialState, action) {
  switch (action.type) {
    case FETCH_ISP_SCHEDULE_SETTINGS + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      const data = action.payload.data.payload;
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    case FETCH_ISP_SCHEDULE_SETTINGS + PENDING : return {status: PENDING};
    case FETCH_ISP_SCHEDULE_SETTINGS + REJECTED : return {status: REJECTED};
    case SS_CANCEL_SCHEDULE_SETTINGS: return {status: action.status};
    default:
      return state;
  }
}
