
import {FULFILLED, REJECTED, PENDING, SSP_CANCEL_FUTURE_SESSIONS} from '../../../../constants/ActionTypes';

const initialState = '';

export default function sspCancelFutureSessionStatus(state = initialState, action) {
  switch (action.type) {
    case SSP_CANCEL_FUTURE_SESSIONS + FULFILLED : {
      if (action.payload.data.responseCode >= 100) {
        return REJECTED;
      }
      return FULFILLED;
    }
    case SSP_CANCEL_FUTURE_SESSIONS + PENDING : return PENDING;
    case SSP_CANCEL_FUTURE_SESSIONS + REJECTED : return REJECTED;

    default:
      return state;
  }
}

