
import {FETCH_SSP_PAYOUT_LIST, FULFILLED, PENDING, REJECTED} from '../../../../constants/ActionTypes';

const initialState = {
  data: [],
  priceUnit: '',
  total: 0
};

export default function payouts(state = initialState, action) {
  switch (action.type) {
    case FETCH_SSP_PAYOUT_LIST + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        const payload = action.payload.data.payload;
        return Object.assign({}, state, {data: payload.payouts, total: payload.total, priceUnit: payload.priceUnit, status: FULFILLED});
      }
      return Object.assign({}, state, {data: [], total: 0, status: REJECTED});
    }
    case FETCH_SSP_PAYOUT_LIST + PENDING : return {data: [], total: 0, priceUnit: '', status: PENDING};
    case FETCH_SSP_PAYOUT_LIST + REJECTED : return {data: [], total: 0, priceUnit: '', status: REJECTED};
    default:
      return state;
  }
}
