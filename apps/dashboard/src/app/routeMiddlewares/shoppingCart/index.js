import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect';
import {canAccessShoppingCart, shoppingCartRedirectPath} from '../../validators/common/shoppingCart';

export const shoppingCartPrevalidation = connectedRouterRedirect({
  redirectPath: state => {
    const {userProfiles} = state;
    return shoppingCartRedirectPath(userProfiles.data);
  },
  allowRedirectBack: false,
  authenticatedSelector: state => {
    const {userProfiles} = state;
    return canAccessShoppingCart(userProfiles.data);
  },
  wrapperDisplayName: 'shoppingCartPrevalidation'
});
