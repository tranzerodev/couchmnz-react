
import {
  sspValidateEvents
} from '../../actions';
import {ADD_EVENTS, SET_SESSIONS, UPDATE_EVENT, SSP_SUBMIT_EVENTS, REMOVE_EVENT} from '../../constants/ActionTypes';

const updateProfileData = store => next => action => {
  next(action);
  switch (action.type) {
    case ADD_EVENTS:
    case SET_SESSIONS:
    case UPDATE_EVENT:
    case REMOVE_EVENT:
    case SSP_SUBMIT_EVENTS: {
      const {events} = store.getState();
      store.dispatch(sspValidateEvents({events}));
      break;
    }
    default:break;
  }
};

export default updateProfileData;
