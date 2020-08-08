import {SSP_VALIDATE_TRAINING_PREFERENCE, SSP_TRAINING_PREFERENCE_SUBMIT} from '../../constants/ActionTypes';
function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
const initialState = {
  submitted: false,
  valid: false,
  skillLevels: false,
  ages: false,
  gender: false,
  training: false
};
const trainingPreferences = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIDATE_TRAINING_PREFERENCE : {
      const data = action.data;
      const validation = Object.assign({}, state);
      validation.skillLevels = Boolean(data.skillLevels && data.skillLevels.length && data.skillLevels[0].id && data.skillLevels[0].name);
      validation.training = Boolean(data.training && data.training.length && data.training[0].id && data.training[0].name);
      validation.ages = Boolean(data.ages && data.ages.length && data.ages[0].id && data.ages[0].name);
      validation.gender = Boolean(data.gender && data.gender.length && notNull(data.gender[0]));
      if (validation.skillLevels === true && validation.training === true && validation.ages === true && validation.gender === true) {
        validation.valid = true;
      } else {
        validation.valid = false;
      }
      return validation;
    }
    case SSP_TRAINING_PREFERENCE_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      return validation;
    }
    default:
      return state;
  }
};

export default trainingPreferences;

