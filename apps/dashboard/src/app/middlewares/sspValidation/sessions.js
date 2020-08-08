import {
  sspValidateSession
} from '../../actions';
import {SSP_SESSION_SUBMIT, UPDATE_SESSION} from '../../constants/ActionTypes';

const updateProfileData = store => next => action => {
  next(action);
  switch (action.type) {
    case UPDATE_SESSION: {
      console.log('store validate');
      const {sessions} = store.getState();
      const id = action && action.profile && action.profile.id ? action.profile.id : null;
      const index = sessions.data.findIndex(session => session.id === id);
      store.dispatch(sspValidateSession(index >= 0 ? sessions.data[index] : {}));
      break;
    }
    case SSP_SESSION_SUBMIT: {
      console.log('store validate');
      store.dispatch(sspValidateSession(action && action.data && action.data.session ? action.data.session : {}));
      break;
    }
    default:break;
  }
};

export default updateProfileData;
