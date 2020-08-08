import {PENDING, FULFILLED, REJECTED, FETCH_WALLET_SUMMARY} from '../constants/ActionTypes';

const initialState = {
  data: {},
  status: null

};
const walletSummary = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WALLET_SUMMARY + PENDING : {
      return Object.assign({}, state, {status: PENDING});
    }
    case FETCH_WALLET_SUMMARY + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      const data = action.payload.data.payload;
      return Object.assign({}, state, {status: FULFILLED, data});
    }
    case FETCH_WALLET_SUMMARY + REJECTED : {
      return Object.assign({}, state, {status: REJECTED});
    }
    default:
      return state;
  }
};

export default walletSummary;
