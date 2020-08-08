import {NEW_CERTIFICATION_VALIDATION, NEW_CERTIFICATION_SUBMIT, CLEAR_NEW_CERTIFICATION_VALIDATION} from '../constants/ActionTypes';

function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}

const initialState = {
  submitted: false,
  valid: false,
  id: false,
  institution: false,
  year: false
};
const validateNewCertification = (state = initialState, action) => {
  switch (action.type) {
    case NEW_CERTIFICATION_VALIDATION : {
      const data = action.data;
      const validation = Object.assign({}, state);
      validation.id = notNull(data.id);
      validation.institution = notNull(data.certifierID);
      validation.year = notNull(data.year);
      if (validation.id === true && validation.institution === true && validation.year === true) {
        validation.valid = true;
      } else {
        validation.valid = false;
      }
      return validation;
    }
    case NEW_CERTIFICATION_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      return validation;
    }
    case CLEAR_NEW_CERTIFICATION_VALIDATION:
      return initialState;
    default:
      return state;
  }
};

export default validateNewCertification;

