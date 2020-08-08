import {PENDING, FETCH_BILLING_ADDRESS, FULFILLED, REJECTED, UPDATE_BILLING_ADDRESS} from '../../constants/ActionTypes';

const initialState = {
  data: {
    account: {
      id: null,
      landline: null,
      mobile: null,
      street: null,
      area: null,
      city: {
        id: null,
        name: null
      },
      state: {
        id: null,
        name: null
      },
      country: {
        id: null,
        name: null
      },
      zip: null
    }
  },
  status: null,
  saveStatus: null
};
const shoppingCartAddress = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BILLING_ADDRESS + PENDING : {
      return Object.assign({}, state, {status: PENDING});
    }
    case FETCH_BILLING_ADDRESS + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      const data = action.payload.data.payload;
      return Object.assign({}, state, {status: FULFILLED, data});
    }
    case FETCH_BILLING_ADDRESS + REJECTED : {
      return Object.assign({}, state, {status: REJECTED});
    }
    case UPDATE_BILLING_ADDRESS + PENDING : {
      return Object.assign({}, state, {saveStatus: PENDING});
    }
    case UPDATE_BILLING_ADDRESS + REJECTED : {
      return Object.assign({}, state, {saveStatus: REJECTED});
    }
    case UPDATE_BILLING_ADDRESS + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {saveStatus: REJECTED});
      }
      return Object.assign({}, state, {saveStatus: FULFILLED});
    }
    default:
      return state;
  }
};

export default shoppingCartAddress;

