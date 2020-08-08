import {
  changeProfile
} from '../actions';
import {CREATE_NEW_PROFILE, FULFILLED} from '../constants/ActionTypes';

const changeProfileMiddleware = store => next => action => {
  next(action);
  switch (action.type) {
    case CREATE_NEW_PROFILE + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        store.dispatch(changeProfile(action.payload.data.payload.newProfile));
      }
      break;
    }
    default:break;
  }
};

export default changeProfileMiddleware;
