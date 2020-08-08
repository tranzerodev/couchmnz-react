import pathToRegExp from 'path-to-regexp';

import {notNull} from './util';
import appConstants from '../../constants/appConstants';
import {PROFILE, REGISTRATION_PROFILE_TYPE} from '../../constants/pathConstants';

const {userProfileTypes, profileActiveFlages} = appConstants;
const {ATHLETE, PARENT} = userProfileTypes;

const validateProfile = data => {
  const validation = {
    numberOfSession: false,
    shoppingItemsState: false
  };
  const {numberOfSession, shoppingItemsState} = data;
  validation.shoppingItemsState = !shoppingItemsState.includes(false);
  validation.numberOfSession = notNull(numberOfSession) && isNumber(numberOfSession) && parseInt(numberOfSession, 10) > 0;
  validation.valid = validation.shoppingItemsState && validation.numberOfSession;
  return validation;
};

export default validateProfile;

export function validateCartItems(cancelationPolicies, cartItems) {
  const validation = {cartItems: {}, cancelationPolicy: true, for: true};
  cartItems.forEach(element => {
    const temp = {
      cancelationPolicy: false,
      for: {}
    };
    element.orderItems.forEach(orderItem => {
      if (notNull(orderItem.attendeeProfileId)) {
        temp.for[orderItem.id] = true;
      } else {
        temp.for[orderItem.id] = false;
        validation.for = false;
      }
    });
    const index = cancelationPolicies.findIndex(id => id === element.sspId);
    if (index > -1) {
      temp.cancelationPolicy = true;
    } else {
      validation.cancelationPolicy = false;
      temp.cancelationPolicy = false;
    }
    validation.cartItems[element.sspId] = temp;
  });
  return validation;
}

const getAllowedProfilesByStatus = (profiles, flag) => {
  return profiles.find(profile => ((profile.type === ATHLETE || profile.type === PARENT) && profile.isActive === flag));
};

export const canAccessShoppingCart = profiles => {
  const allowedProfile = getAllowedProfilesByStatus(profiles, profileActiveFlages.active);
  if (allowedProfile) {
    return true;
  }
  return false;
};

export const shoppingCartRedirectPath = profiles => {
  const allowedProfile = getAllowedProfilesByStatus(profiles, profileActiveFlages.inactive);
  if (allowedProfile) {
    const toPath = pathToRegExp.compile(REGISTRATION_PROFILE_TYPE);
    return toPath({profileType: allowedProfile.type});
  }
  return PROFILE;
};

export const shoppingCartProfileType = profiles => {
  const allowedProfile = getAllowedProfilesByStatus(profiles, profileActiveFlages.active);
  if (allowedProfile) {
    return allowedProfile.type;
  }
  return '';
};

export const hasChild = profiles => {
  const parentProfile = profiles.find(profile => profile.type === PARENT);
  if (parentProfile && parentProfile.dependents.length > 0) {
    if (profiles.length === 1 && parentProfile.dependents.length === 1) {
      return false;
    }
    return true;
  }
  return false;
};
