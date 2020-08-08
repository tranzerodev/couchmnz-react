import {matchPath} from 'react-router';

import {LOCATION_URL_CHANGE} from '../../constants/ActionTypes';
import {SHOPPING_CART} from '../../constants/pathConstants';
import {fetchShoppingCartItems, createShoppingCart} from '../../actions';
import {getShoppingCartId} from '../../utils/shoppingCart';
import {notFetched} from '../../validators/common/util';

const cartData = store => next => action => {
  next(action);
  const storeState = store.getState();
  switch (action.type) {
    case LOCATION_URL_CHANGE: {
      const {location} = action.data;
      const {pathname} = location;
      const match = matchPath(pathname, {path: SHOPPING_CART, strict: false, exact: false});
      if (match) {
        const {shoppingCart} = storeState;
        if (notFetched(shoppingCart.cartData.status)) {
          const cartId = getShoppingCartId();
          if (cartId) {
            store.dispatch(fetchShoppingCartItems({cartId}));
          } else {
            store.dispatch(createShoppingCart({}));
          }
        }
      }
      break;
    }
    default: {
      break;
    }
  }
};

export default cartData;
