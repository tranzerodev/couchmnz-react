import {FULFILLED, REJECTED, PENDING, SS_OVERIDE_PRICE, SS_OVERIDE_PRICE_STATUS} from '../../../../constants/ActionTypes';

const initialState = {status: null};

export default function overidePrice(state = initialState, action) {
  switch (action.type) {
    case SS_OVERIDE_PRICE + FULFILLED : {
      if (action.payload.data.responseCode >= 100) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {status: FULFILLED});
    }
    case SS_OVERIDE_PRICE + PENDING : return {status: PENDING};
    case SS_OVERIDE_PRICE + REJECTED : return {status: REJECTED};
    case SS_OVERIDE_PRICE_STATUS: return {status: action.status};
    default:
      return state;
  }
}
