import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect';
import {notNull} from '../../validators/common/util';

export const verifyOTPPrevalidation = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => {
    if (notNull(state.auth.login.email)) {
      return true;
    }
    return false;
  },
  wrapperDisplayName: 'verifyOTPPrevalidation'
});

