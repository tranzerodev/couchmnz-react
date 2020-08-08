import {FETCH_VOLUME_DISCOUNTS, FULFILLED, PENDING, REJECTED} from '../constants/ActionTypes';

const initialState = {data: {
  basePrice: 0,
  volumeDiscounts: []}, status: null};

export default function volumeDiscounts(state = initialState, action) {
  switch (action.type) {
    case FETCH_VOLUME_DISCOUNTS + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
    }
    case FETCH_VOLUME_DISCOUNTS + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case FETCH_VOLUME_DISCOUNTS + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case FETCH_VOLUME_DISCOUNTS:
      return initialState;
    default:
      return state;
  }
}
