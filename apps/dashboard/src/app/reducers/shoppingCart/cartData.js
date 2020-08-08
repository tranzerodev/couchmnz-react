import {
  PENDING,
  FETCH_SHOPPING_CART_ITEMS,
  FULFILLED,
  REJECTED,
  UPDATE_SHOPPING_CART_ITEMS,
  CREATE_SHOPPING_CART,
  FETCH_SHOPPING_CART_ITEMS_COUNT,
  FETCH_PAYMENT_SUMMARY
} from '../../constants/ActionTypes';
import {setShoppingCartId, getTotalItems} from '../../utils/shoppingCart';

const initialState = {
  data: {
    paymentSummary: {},
    cartItems: []
  },
  status: null,
  updateStatus: '',
  itemCount: 0,
  itemCountStatus: ''
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
      return Object.assign({}, state, {
        status: FULFILLED,
        data,
        itemCount: getTotalItems(data.cartItems),
        itemCountStatus: FULFILLED
      });
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
      return Object.assign({}, state, {
        status: FULFILLED,
        data,
        updateStatus: FULFILLED,
        itemCount: getTotalItems(data.cartItems),
        itemCountStatus: FULFILLED
      });
    }
    case CREATE_SHOPPING_CART + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      const data = action.payload.data.payload;
      const cartId = data.cartId;
      setShoppingCartId(cartId);
      return Object.assign({}, state, {
        status: FULFILLED,
        data,
        itemCount: getTotalItems(data.cartItems),
        itemCountStatus: FULFILLED
      });
    }
    case FETCH_SHOPPING_CART_ITEMS_COUNT + FULFILLED: {
      const {responseCode, payload} = action.payload.data;
      if (responseCode > 0) {
        return Object.assign({}, state, {itemCountStatus: REJECTED, itemCount: 0});
      }
      return Object.assign({}, state, {itemCountStatus: FULFILLED, itemCount: payload.count});
    }
    case FETCH_PAYMENT_SUMMARY + FULFILLED: {
      const {responseCode, payload} = action.payload.data;
      if (responseCode > 0) {
        return state;
      }
      const cartData = Object.assign({}, state.data);
      cartData.paymentSummary = payload;
      return Object.assign({}, state, {data: cartData});
    }
    default:
      return state;
  }
};

export default shoppingCart;

