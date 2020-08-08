import {NEW_DEGREE_VALIDATION, NEW_DEGREE_SUBMIT} from '../constants/ActionTypes';

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
const validateNewDegree = (state = initialState, action) => {
  switch (action.type) {
    case NEW_DEGREE_VALIDATION : {
      const data = action.data;
      const validation = Object.assign({}, state);
      validation.id = notNull(data.id);
      validation.institution = notNull(data.institutionID);
      validation.year = notNull(data.year);
      if (validation.id === true && validation.institution === true && validation.year === true) {
        validation.valid = true;
      } else {
        validation.valid = false;
      }
      return validation;
    }
    case NEW_DEGREE_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      return validation;
    }
    default:
      return state;
  }
};

export default validateNewDegree;

