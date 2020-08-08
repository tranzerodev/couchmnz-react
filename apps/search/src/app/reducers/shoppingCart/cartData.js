import {PENDING, FETCH_SHOPPING_CART_ITEMS, FULFILLED, REJECTED, UPDATE_SHOPPING_CART_ITEMS, CREATE_SHOPPING_CART} from '../../constants/ActionTypes';
import {setShoppingCartId} from '../../utils/shoppingCart';

const initialState = {
  data: {
    paymentSummary: {},
    cartItems: []
  },
  status: null,
  updateStatus: ''
};
const shoppingCart = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHOPPING_CART_ITEMS + PENDING : {
      return Object.assign({}, state, {status: PENDING});
    }
    case UPDATE_SHOPPING_CART_ITEMS + PENDING : {
      return Object.assign({}, state, {updateStatus: PENDING});
    }
    case FETCH_SHOPPING_CART_ITEMS + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      const data = action.payload.data.payload;
      const cartId = data.cartId;
      setShoppingCartId(cartId);
      return Object.assign({}, state, {status: FULFILLED, data});
    }
    case FETCH_SHOPPING_CART_ITEMS + REJECTED : {
      return Object.assign({}, state, {status: REJECTED});
    }
    case UPDATE_SHOPPING_CART_ITEMS + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      const data = action.payload.data.payload;
      const cartId = data.cartId;
      setShoppingCartId(cartId);
      return Object.assign({}, state, {status: FULFILLED, updateStatus: FULFILLED, data});
    }
    case CREATE_SHOPPING_CART + PENDING : {
      return Object.assign({}, state, {status: PENDING});
    }
    case CREATE_SHOPPING_CART + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      const data = action.payload.data.payload;
      const cartId = data.cartId;
      setShoppingCartId(cartId);
      return Object.assign({}, state, {status: FULFILLED, data});
    }
    default:
      return state;
  }
};

export default shoppingCart;

