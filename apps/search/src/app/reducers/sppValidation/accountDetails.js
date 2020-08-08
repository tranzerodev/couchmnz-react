import {SSP_VALIDATE_ACCOUNT_DETAILS, SSP_ACCOUNT_DETAILS_SUBMIT} from '../../constants/ActionTypes';
import config from '../../config';
import appConstants from '../../constants/appConstants';
function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
function isContainsMobile(mobile) {
  const temp = {
    required: false,
    valid: false
  };
  if (notNull(mobile)) {
    temp.required = true;
    if (config.RegExp.phone.test((mobile))) {
      temp.valid = true;
    }
  }
  return temp;
}
function validateLandline(landline) {
  if (notNull(landline)) {
    if (config.RegExp.phone.test(landline)) {
      return true;
    }
    return false;
  }
  return true;
}

function validateGender(gender) {
  if (gender) {
    const genders = config.genders;
    for (let i = 0; i < genders.length; i++) {
      if (gender === genders[i].value) {
        return true;
      }
    }
  }
  return false;
}

const initialState = {
  submitted: false,
  valid: false,
  countryID: false,
  businessName: false,
  cityName: false,
  street: false,
  firstName: false,
  lastName: false,
  gender: false,
  zip: {
    required: false,
    valid: false,
    maxLength: false
  },
  mobile: {
    required: false,
    valid: false
  },
  timezone: false,
  landline: true,
  businessUrl: true,
  nickName: {
    required: false,
    valid: false
  }
};

function validateZipcode(data) {
  return {
    required: Boolean(data.zip && notNull(data.zip.trim())),
    valid: data.zip && Boolean(config.RegExp.zipcode.test(data.zip)),
    maxLength: data.zip && data.zip.length && data.zip.length < appConstants.zipCodeMaxlength
  };
}

function validNickName(validation, data) {
  if (validation.nickName.required === true && validation.nickName.valid === true && data.nickname.data && data.nickname.data.available === appConstants.nicknameAvailabilityFlags.available && data.nickname.data.nickname === data.listing.nickname) {
    return true;
  }
  return false;
}

function validateAll(validation, data) {
  if (validation.cityName === true && validation.landline === true && validation.timezone === true && validation.countryID === true && validation.businessName === true && validation.street === true && validation.zip.valid === true && validation.zip.maxLength === true && validation.zip.required === true && validation.mobile.valid === true && validation.mobile.required === true && validation.businessUrl === true && validation.firstName === true && validation.lastName === true && validNickName(validation, data)) {
    return true;
  }
  return false;
}
const accountDetails = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIDATE_ACCOUNT_DETAILS : {
      const data = action.data;
      console.log('Data', data);
      const validation = Object.assign({}, state);
      validation.countryID = notNull(data.countryID);
      validation.businessName = Boolean(data.businessName && notNull(data.businessName.trim()));
      validation.street = Boolean(data.street && notNull(data.street.trim()));
      validation.zip = validateZipcode(data);
      validation.cityName = Boolean(data.cityName && notNull(data.cityName));
      validation.mobile = isContainsMobile(data.mobile);
      validation.timezone = Boolean(data.timezone && notNull(data.timezone.id));
      validation.businessUrl = notNull(data.businessUrl) ? Boolean(config.RegExp.url.test(data.businessUrl)) : true;
      validation.landline = validateLandline(data.landline);
      validation.nickName = {
        required: notNull(data.listing.nickname),
        valid: Boolean(data.listing.nickname && config.RegExp.nickName.test(data.listing.nickname))
      };
      validation.firstName = Boolean(data.firstName && notNull(data.firstName.trim()));
      validation.lastName = Boolean(data.lastName && notNull(data.lastName.trim()));
      validation.gender = validateGender(data.gender);
      validation.valid = validateAll(validation, data);
      return validation;
    }
    case SSP_ACCOUNT_DETAILS_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      return validation;
    }
    default:
      return state;
  }
};

export default accountDetails;

