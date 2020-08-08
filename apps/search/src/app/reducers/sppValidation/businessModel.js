import {SSP_VALIDATE_BUSINESS_MODEL, SSP_BUSINESS_MODEL_SUBMIT} from '../../constants/ActionTypes';
function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
const initialState = {
  submitted: false,
  valid: false,
  businessModel: false
};
const businessModel = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIDATE_BUSINESS_MODEL : {
      const data = action.data;
      const validation = Object.assign({}, state);
      validation.businessModel = notNull(data.businessModel);
      if (validation.businessModel === true) {
        validation.valid = true;
      } else {
        validation.valid = false;
      }
      return validation;
    }
    case SSP_BUSINESS_MODEL_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      return validation;
    }
    default:
      return state;
  }
};

export default businessModel;

