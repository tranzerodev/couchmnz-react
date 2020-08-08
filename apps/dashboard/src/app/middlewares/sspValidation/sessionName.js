import {
  sspValidateSessionName
} from '../../actions';
import {UPDATE_OFFER_TERMINOLOGY, SSP_SESSION_NAME_SUBMIT} from '../../constants/ActionTypes';

const updateProfileData = store => next => action => {
  next(action);
  switch (action.type) {
    case UPDATE_OFFER_TERMINOLOGY:
    case SSP_SESSION_NAME_SUBMIT: {
      const {sport} = store.getState();
      // store.dispatch(sspValidateSessionName({sessionName: sport && sport.offerTerminology ? sport.offerTerminology : ''}));
      break;
    }
    default:break;
  }
};

export default updateProfileData;
