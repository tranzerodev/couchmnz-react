import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect';
import {DASHBOARD_MANAGE_SPORT, DASHBOARD_ISP_LOCATION, DASHBOARD_SPORTS, DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS_ADD, REGISTRATION_BUSINESS_MODEL} from '../../../../constants/pathConstants';
import validateTrainingPreferences from '../../../../validators/ssp/isp/common/trainingPrefrences';
import sessionPreValidation from '../../../../validators/ssp/isp/common/sessionPreValidation';
import {FULFILLED} from '../../../../constants/ActionTypes';
import profileCompletion from '../../../../validators/ssp/isp/dashboard/calculateProfileCompletionStatus';
import appConstants from '../../../../constants/appConstants';
import sportCompletion from '../../../../validators/ssp/isp/dashboard/calculateSportCompletionStatus';

export const pricingPreValidation = connectedRouterRedirect({
  redirectPath: DASHBOARD_MANAGE_SPORT,
  allowRedirectBack: false,
  authenticatedSelector: state => {
    if (state.currentSport.status === FULFILLED) {
      const {ages, gender, skillLevels} = state.currentSport.data.prerequisites;
      const training = state.currentSport.data.subSSPTypes;
      const validation = validateTrainingPreferences({ages, gender, skillLevels, training});
      return (validation.skillLevels && validation.training && validation.ages);
    }
    return false;
  },
  wrapperDisplayName: 'pricingPreValidation'
});

export const sportsSpecific = connectedRouterRedirect({
  redirectPath: DASHBOARD_MANAGE_SPORT,
  allowRedirectBack: false,
  authenticatedSelector: state => Boolean(state.currentSport.data && state.currentSport.data.id),
  wrapperDisplayName: 'SportsSpecific'
});

export const sessionsPreValidation = connectedRouterRedirect({
  redirectPath: DASHBOARD_MANAGE_SPORT,
  allowRedirectBack: false,
  authenticatedSelector: state => {
    if (state.currentSport.status === FULFILLED) {
      return sessionPreValidation(state.currentSport.data);
    }
    return false;
  },
  wrapperDisplayName: 'sessionPreValidation'
});

export const schedulerPreValidation = connectedRouterRedirect({
  redirectPath: DASHBOARD_MANAGE_SPORT,
  allowRedirectBack: false,
  authenticatedSelector: state => {
    const {sessions} = state;
    if (sessions.status === FULFILLED) {
      if (sessions.data.length > 0) {
        return true;
      }
    }
    return false;
  },
  wrapperDisplayName: 'sessionPreValidation'
});

export const servicePrevalidation = connectedRouterRedirect({
  redirectPath: REGISTRATION_BUSINESS_MODEL,
  allowRedirectBack: false,
  authenticatedSelector: state => {
    const {contact, profile, serviceProfiles, userProfiles} = state;
    if (serviceProfiles.status === FULFILLED && (!contact.countryID || !profile.data || !profile.data.businessModel) && userProfiles.selectedProfile.type === appConstants.userProfileTypes.ISP && profile.status === FULFILLED) {
      return false;
    }
    return true;
  },
  wrapperDisplayName: 'servicePrevalidation'
});

export const locationPrevalidation = connectedRouterRedirect({
  redirectPath: DASHBOARD_SPORTS,
  allowRedirectBack: false,
  authenticatedSelector: state => {
    const {contact, serviceProfiles} = state;
    if (serviceProfiles.status === FULFILLED && !contact.countryID) {
      return true;
    }
    return false;
  },
  wrapperDisplayName: 'locationPrevalidation'
});

export const completeServicePrevalidation = connectedRouterRedirect({
  redirectPath: DASHBOARD_SPORTS,
  allowRedirectBack: false,
  authenticatedSelector: state => {
    const {profile, workingDays, userProfiles} = state;
    const profileActivationStatus = (userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.active);
    const isProfileCompletion = profileCompletion(profile, workingDays, profileActivationStatus);
    if (isProfileCompletion) {
      return false;
    }
    const {currentSport, sessions} = state;
    const isSportsActive = currentSport.data && currentSport.data.isActive === appConstants.sportsActiveFlages.active;
    const isSportComplete = sportCompletion(currentSport, sessions, isSportsActive);
    if (isSportComplete) {
      return true;
    }
    return false;
  },
  wrapperDisplayName: 'completeServicePrevalidation'
});

export const locationListPrevalidation = connectedRouterRedirect({
  redirectPath: DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS_ADD,
  allowRedirectBack: false,
  authenticatedSelector: state => {
    const {locations} = state;
    if (locations.data.length > 0) {
      return true;
    }
    return false;
  },
  wrapperDisplayName: 'locationListPrevalidation'
});

export const businessModelPrevalidation = connectedRouterRedirect({
  redirectPath: DASHBOARD_ISP_LOCATION,
  allowRedirectBack: false,
  authenticatedSelector: state => {
    const {profile} = state;
    if (profile.data && profile.data.businessModel) {
      return false;
    }
    return true;
  },
  wrapperDisplayName: 'businessModelPrevalidation'
});
