
import {SSP_BOOKING_ACTION, FULFILLED, PENDING, REJECTED} from '../../../../constants/ActionTypes';

const initialState = null;

export default function bookingActionStatus(state = initialState, action) {
  switch (action.type) {
    case SSP_BOOKING_ACTION + PENDING : return PENDING;
    case SSP_BOOKING_ACTION + FULFILLED : return FULFILLED;
    case SSP_BOOKING_ACTION + REJECTED : return REJECTED;
    default:
      return state;
  }
}
