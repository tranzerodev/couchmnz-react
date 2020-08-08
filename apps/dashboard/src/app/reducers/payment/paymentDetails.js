import {PENDING, FETCH_PAYMENT_DETAILS, FULFILLED, REJECTED, SAVE_PAYMENT_SOURCE, DELETE_PAYMENT_SOURCE} from '../../constants/ActionTypes';

const initialState = {
  data: {
    currency: '',
    savedCards: [],
    totalAmount: 0,
    walletBalance: 0
  },
  status: '',
  saveStatus: null,
  deleteStatus: null
};
const paymentDetails = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYMENT_DETAILS + PENDING : {
      return Object.assign({}, state, {status: PENDING});
    }
    case FETCH_PAYMENT_DETAILS + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      const data = action.payload.data.payload;
      return Object.assign({}, state, {status: FULFILLED, data});
    }
    case FETCH_PAYMENT_DETAILS + REJECTED : {
      return Object.assign({}, state, {status: REJECTED});
    }
    case SAVE_PAYMENT_SOURCE + PENDING : {
      return Object.assign({}, state, {saveStatus: PENDING});
    }
    case SAVE_PAYMENT_SOURCE + REJECTED : {
      return Object.assign({}, state, {saveStatus: REJECTED});
    }
    case SAVE_PAYMENT_SOURCE + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {saveStatus: REJECTED});
      }
      return Object.assign({}, state, {saveStatus: FULFILLED});
    }
    case DELETE_PAYMENT_SOURCE + PENDING : {
      return Object.assign({}, state, {deleteStatus: PENDING});
    }
    case DELETE_PAYMENT_SOURCE + REJECTED : {
      return Object.assign({}, state, {deleteStatus: REJECTED});
    }
    case DELETE_PAYMENT_SOURCE + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {deleteStatus: REJECTED});
      }
      return Object.assign({}, state, {deleteStatus: FULFILLED});
    }
    default:
      return state;
  }
};

export default paymentDetails;

