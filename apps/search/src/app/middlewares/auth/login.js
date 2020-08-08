import {LOGIN, FULFILLED, LOGOUT, VERIFY_OTP} from '../../constants/ActionTypes';
import {setJwtToken, setAxiosRequestIntercepter, logout} from '../../../auth/auth';
import {fetchUserProfiles} from '../../actions/index';

const login = store => next => action => {
  next(action);

  switch (action.type) {
    case LOGIN + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        const data = action.payload.data.payload;
        const {token} = data;
        setJwtToken(token);
        setAxiosRequestIntercepter();
        store.dispatch(fetchUserProfiles());
      }
      break;
    }
    case VERIFY_OTP + FULFILLED : {
      const {responseCode, payload} = action.payload.data;
      if (responseCode === 0) {
        if (payload && payload.token) {
          setJwtToken(payload.token);
        }
      }
      break;
    }
    case LOGOUT: {
      logout();
      break;
    }
    default: {
      break;
    }
  }
};

export default login;
