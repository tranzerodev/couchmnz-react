import {SSP_VALIADATE_LISTING, SSP_LISTING_SUBMIT} from '../../constants/ActionTypes';
import config from '../../config';
import appConstants from '../../constants/appConstants';
function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
const initialState = {
  submitted: false,
  valid: true
};
const listing = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIADATE_LISTING : {
      // Const data = action.data;
      const validation = Object.assign({}, state);
      // Validation.nickName = {
      //   required: notNull(data.listing.nickname),
      //   valid: Boolean(data.listing.nickname && config.RegExp.nickName.test(data.listing.nickname))
      // };
      // if (validation.nickName.required === true && validation.nickName.valid === true && data.nickname.data && data.nickname.data.available === appConstants.nicknameAvailabilityFlags.available && data.nickname.data.nickname === data.listing.nickname) {
      //   validation.valid = true;
      // } else {
      //   validation.valid = false;
      // }
      validation.valid = true;
      return validation;
    }
    case SSP_LISTING_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      return validation;
    }
    default:
      return state;
  }
};

export default listing;

