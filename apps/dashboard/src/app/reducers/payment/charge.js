import {PENDING, CHARGE_CARD, FULFILLED, REJECTED} from '../../constants/ActionTypes';

const initialState = {
  data: {},
  status: null,
  responseCode: 0
};

const charge = (state = initialState, action) => {
  switch (action.type) {
    case CHARGE_CARD + PENDING : {
      return Object.assign({}, state, {status: PENDING});
    }
    case CHARGE_CARD + FULFILLED : {
      const {responseCode, payload} = action.payload.data;
      if (responseCode > 0) {
        return Object.assign({}, state, {data: payload, status: REJECTED, responseCode});
      }
      const data = payload;
      return Object.assign({}, state, {status: FULFILLED, data, responseCode: 0});
    }
    case CHARGE_CARD + REJECTED : {
      return Object.assign({}, state, {status: REJECTED, responseCode: 0});
    }
    default:
      return state;
  }
};

export default charge;

