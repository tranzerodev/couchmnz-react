import {REMOVE_LOCATION, FULFILLED, PENDING, REJECTED} from '../../../../constants/ActionTypes';

const initialState = {data: [], status: null, responseCode: undefined};

export default function traininLocationDeleteStatus(state = initialState, action) {
  switch (action.type) {
    case REMOVE_LOCATION + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED, responseCode: action.payload.data.responseCode});
      }
      return Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
    }
    case REMOVE_LOCATION + PENDING: {
      return Object.assign({}, state, {status: PENDING, responseCode: undefined});
    }
    case REMOVE_LOCATION + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case REMOVE_LOCATION:
      return initialState;
    default:
      return state;
  }
}
