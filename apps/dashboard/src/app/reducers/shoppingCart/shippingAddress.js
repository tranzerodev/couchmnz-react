import {PENDING, FETCH_SHIPPING_ADDRESS, FULFILLED, REJECTED, UPDATE_SHIPPING_ADDRESS} from '../../constants/ActionTypes';

const initialState = {
  data: {
    id: null,
    landline: null,
    mobile: null,
    street: null,
    area: null,
    cityId: null,
    city: null,
    stateId: null,
    state: null,
    countryId: null,
    country: null,
    zip: null
  },
  status: null,
  saveStatus: null
};
const shoppingCartAddress = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHIPPING_ADDRESS + PENDING : {
      return Object.assign({}, state, {status: PENDING});
    }
    case FETCH_SHIPPING_ADDRESS + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      const data = action.payload.data.payload;
      return Object.assign({}, state, {status: FULFILLED, data});
    }
    case FETCH_SHIPPING_ADDRESS + REJECTED : {
      return Object.assign({}, state, {status: REJECTED});
    }
    case UPDATE_SHIPPING_ADDRESS + PENDING : {
      return Object.assign({}, state, {saveStatus: PENDING});
    }
    case UPDATE_SHIPPING_ADDRESS + REJECTED : {
      return Object.assign({}, state, {saveStatus: REJECTED});
    }
    case UPDATE_SHIPPING_ADDRESS + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {saveStatus: REJECTED});
      }
      const data = action.payload.data.payload;
      return Object.assign({}, state, {saveStatus: FULFILLED, data});
    }
    default:
      return state;
  }
};

export default shoppingCartAddress;

