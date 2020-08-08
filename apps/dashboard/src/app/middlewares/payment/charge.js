import {CHARGE_CARD, FULFILLED} from '../../constants/ActionTypes';
import {getShoppingCartId} from '../../utils/shoppingCart';
import {fetchShoppingCartItems, createShoppingCart} from '../../actions';

const charge = store => next => action => {
  next(action);

  switch (action.type) {
    case CHARGE_CARD + FULFILLED : {
      const {responseCode} = action.payload.data;
      if (responseCode > 0) {
        break;
      }
      const cartId = getShoppingCartId();
      if (cartId) {
        store.dispatch(fetchShoppingCartItems({cartId}));
      } else {
        store.dispatch(createShoppingCart({}));
      }
      break;
    }
    default: {
      break;
    }
  }
};

export default charge;
