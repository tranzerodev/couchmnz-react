import {
  sspValidateTrainingPreference
} from '../../actions';
import {UPDATE_TRAINING, UPDATE_SERVICE, UPDATE_GENDER, SET_AGES, SET_TRAINING, SET_SERVICE, SET_GENDER, SET_SKILLS} from '../../constants/ActionTypes';
import {UPDATE_SKILLLEVEL, UPDATE_AGE} from '../../constants/ActionTypes';

const updateProfileData = store => next => action => {
  next(action);
  switch (action.type) {
    case SET_AGES:
    case SET_TRAINING:
    case SET_GENDER:
    case SET_SKILLS:
    case SET_SERVICE:
    case UPDATE_SKILLLEVEL:
    case UPDATE_AGE:
    case UPDATE_TRAINING:
    case UPDATE_SERVICE:
    case UPDATE_GENDER: {
      const {skillLevels, ages, gender, services, training} = store.getState();
      store.dispatch(sspValidateTrainingPreference({skillLevels, services, ages, gender, training}));
      break;
    }
    default:break;
  }
};

export default updateProfileData;
