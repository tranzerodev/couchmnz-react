
import {FULFILLED, REJECTED, PENDING, SSP_REPORT_ATHLETE} from '../../../../constants/ActionTypes';

const initialState = '';

export default function reportAthleteStatus(state = initialState, action) {
  switch (action.type) {
    case SSP_REPORT_ATHLETE + FULFILLED : {
      if (action.payload.data.responseCode >= 100) {
        return REJECTED;
      }
      return FULFILLED;
    }
    case SSP_REPORT_ATHLETE + PENDING : return PENDING;
    case SSP_REPORT_ATHLETE + REJECTED : return REJECTED;

    default:
      return state;
  }
}

