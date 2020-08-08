import {updateShoppingCartItems, createShoppingCart, fetchShoppingCartItems} from '../../actions/index';
import appConstants from '../../constants/appConstants';
import {getSavedSchedules, getShoppingCartId, removeSavedSchedules} from '../../utils/shoppingCart';
import {FETCH_BASIC_USER_INFO, FULFILLED} from '../../constants/ActionTypes';

const {shoppingCart} = appConstants;

const savedSchedules = store => next => action => {
  next(action);

  switch (action.type) {
    case FETCH_BASIC_USER_INFO + FULFILLED: {
      const {responseCode} = action.payload.data;
      if (responseCode === 0) {
        const savedSchedules = getSavedSchedules();
        const cartId = getShoppingCartId();
        if (cartId && savedSchedules) {
          store.dispatch(updateShoppingCartItems(
            {
              action: shoppingCart.actions.add,
              data: savedSchedules
            }, cartId));
        } else if (cartId) {
          store.dispatch(fetchShoppingCartItems({cartId}));
        } else {
          const reqData = savedSchedules ? {
            eventIds: savedSchedules
          } : {};
          store.dispatch(createShoppingCart(reqData));
        }
        removeSavedSchedules();
      }
      break;
    }
    default: {
      break;
    }
  }
};

export default savedSchedules;
