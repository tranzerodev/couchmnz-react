import {updateShoppingCartItems, createShoppingCart} from '../../actions/index';
import appConstants from '../../constants/appConstants';
import {FULFILLED} from '../../constants/WebConstants';
import {getSavedSchedules, getShoppingCartId, removeSavedSchedules} from '../../utils/shoppingCart';
import {FETCH_USER_PROFILES} from '../../constants/ActionTypes';

const {shoppingCart} = appConstants;

const savedSchedules = store => next => action => {
  next(action);

  switch (action.type) {
    case FETCH_USER_PROFILES + FULFILLED: {
      const {responseCode, payload} = action.payload.data;
      if (responseCode === 0 && payload.length > 0) {
        const savedSchedules = getSavedSchedules();
        if (savedSchedules) {
          const cartId = getShoppingCartId();
          if (cartId) {
            store.dispatch(updateShoppingCartItems(
              {
                action: shoppingCart.actions.add,
                data: savedSchedules
              }, cartId));
          } else {
            store.dispatch(createShoppingCart({
              eventIds: savedSchedules
            }));
          }
          removeSavedSchedules();
        }
      }
      break;
    }
    default: {
      break;
    }
  }
};

export default savedSchedules;
