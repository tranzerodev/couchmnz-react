import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect';
import {FULFILLED, PENDING, REJECTED} from '../constants/ActionTypes';
import {DASHBOARD, PROFILE, REGISTRATION, REGISTRATION_ISP_SPORTS, REGISTRATION_ATHLETE_PROFILE, SHOPPING_CART, REGISTRATION_PARENT_PROFILE, REGISTRATION_ATHLETE_PREFERENCES, REGISTRATION_PARENT_PREFERENCES} from '../constants/pathConstants';
import appConstants from '../constants/appConstants';
const {isp, athlete/* , parent */} = appConstants.profiles;

// Const searchISP = profile => profile.type === isp;
// Const searchAthlete = profile => profile.type === athlete;
// Const searchParent = profile => profile.type === parent;

export const selectProfile = connectedRouterRedirect({
  redirectPath: PROFILE,
  allowRedirectBack: false,
  authenticatedSelector: state => Boolean(state.userProfiles.status === FULFILLED && state.userProfiles.data.length),
  wrapperDisplayName: 'ProfileSelect'
});

export const profileStage = connectedRouterRedirect({
  /* RedirectPath: '/registration-ssp-profile', */
  redirectPath: REGISTRATION,
  allowRedirectBack: false,
  /* AuthenticatedSelector: state => state.profile && state.profile.status !== REJECTED && state.profile.status !== PENDING && state.profile.status === FULFILLED && state.profile.data.profile.isActive === 'Y'/* state.profile.data.profile.regStage > config.RegStages.DASHBOARD */
  // AuthenticatedSelector: state => ((state.profile && state.profile.status === PENDING) || (state.profile && state.profile.status === REJECTED) || (state.profile && state.profile.status && state.profile.status === FULFILLED && state.profile.data.profile.isActive === appConstants.profileActiveFlages.active))/* state.profile.data.profile.regStage > config.RegStages.DASHBOARD */,
  authenticatedSelector: state => ((state.userProfiles && state.userProfiles.status === PENDING) || (state.userProfiles && state.userProfiles.status === REJECTED) || (state.userProfiles.status === FULFILLED && state.userProfiles.selectedProfile && state.userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.active)),
  wrapperDisplayName: 'ProfileStage1'
});

export const dashboardStage = connectedRouterRedirect({
  /* RedirectPath: '/registration-ssp-profile', */
  redirectPath: '/' + DASHBOARD,
  allowRedirectBack: false,
  // AuthenticatedSelector: state => ((state.profile && state.profile.status === PENDING) || (state.profile && state.profile.status === REJECTED) || (state.profile && state.profile.status && state.profile.status === FULFILLED && state.profile.data.profile.isActive === appConstants.profileActiveFlages.inactive))/* state.profile.data.profile.regStage > config.RegStages.DASHBOARD */,
  authenticatedSelector: state => ((state.userProfiles && state.userProfiles.status === PENDING) || (state.userProfiles && state.userProfiles.status === REJECTED) || (state.userProfiles.status === FULFILLED && state.userProfiles.selectedProfile && state.userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.inactive)),
  wrapperDisplayName: 'WelcomePage'
});

export const buildProfile = connectedRouterRedirect({
  redirectPath: REGISTRATION,
  allowRedirectBack: false,
  authenticatedSelector: state => Boolean(state.userProfiles.status === FULFILLED && state.userProfiles.selectedProfile && state.userProfiles.selectedProfile && state.userProfiles.selectedProfile.type === isp),
  // AuthenticatedSelector: state => Boolean(state.userProfiles.status === FULFILLED && state.userProfiles.data.find(searchISP)),
  // AuthenticatedSelector: state => Boolean(state.userIDs.data.coachIDs && state.userIDs.data.coachIDs.length),
  wrapperDisplayName: 'ProfileStage2'
});

export const profile = connectedRouterRedirect({
  redirectPath: REGISTRATION_ISP_SPORTS,
  allowRedirectBack: false,
  authenticatedSelector: state => !(state.userProfiles.status === FULFILLED && state.userProfiles.selectedProfile && state.userProfiles.selectedProfile && state.userProfiles.selectedProfile.type === isp),
  // AuthenticatedSelector: state => !(state.userProfiles.status === FULFILLED && state.userProfiles.data.find(searchISP)),
  // AuthenticatedSelector: state => !(state.userIDs.data.coachIDs && state.userIDs.data.coachIDs.length),
  wrapperDisplayName: 'ProfileStage3'
});

export const SSPProfileCreation = connectedRouterRedirect({
  // RedirectPath: '/registration-ssp-profile',
  redirectPath: PROFILE,
  allowRedirectBack: false,
  authenticatedSelector: state => !(state.userProfiles.status === FULFILLED && state.userProfiles.selectedProfile && state.userProfiles.selectedProfile.type === isp),
  // AuthenticatedSelector: state => state.profile.status === PENDING || state.profile.status === null || !(state.userIDs.data.coachIDs && state.userIDs.data.coachIDs.length),
  // AuthenticatedSelector: state => state.profile.status === PENDING || state.profile.status === null || !(state.userProfiles.data.find(searchISP)),
  wrapperDisplayName: 'ProfileStage4'
});

export const parentRegistration = connectedRouterRedirect({
  redirectPath: PROFILE,
  allowRedirectBack: false,
  authenticatedSelector: state => true/* Boolean(state.userIDs.data.athleteIDs && state.userIDs.data.athleteIDs.length) */,
  wrapperDisplayName: 'ProfileStage2'
});

export const parentPreferences = connectedRouterRedirect({
  redirectPath: REGISTRATION_PARENT_PROFILE,
  allowRedirectBack: false,
  authenticatedSelector: state => true/* Boolean(state.userIDs.data.athleteIDs && state.userIDs.data.athleteIDs.length) */,
  wrapperDisplayName: 'ProfileStage2'
});

export const parentAccount = connectedRouterRedirect({
  redirectPath: REGISTRATION_PARENT_PREFERENCES,
  allowRedirectBack: false,
  authenticatedSelector: state => true/* Boolean(state.userIDs.data.athleteIDs && state.userIDs.data.athleteIDs.length) */,
  wrapperDisplayName: 'ProfileStage2'
});

export const athleteRegistration = connectedRouterRedirect({
  redirectPath: PROFILE,
  allowRedirectBack: false,
  authenticatedSelector: state => Boolean(state.userProfiles.selectedProfile && state.userProfiles.selectedProfile.type === athlete),
  // AuthenticatedSelector: state => Boolean(state.userIDs.data.athleteIDs && state.userIDs.data.athleteIDs.length),
  // AuthenticatedSelector: state => true, // Boolean(state.userProfiles.status === FULFILLED && state.userProfiles.data.find(searchAthlete)),
  wrapperDisplayName: 'ProfileStage2'
});

export const athletePreferences = connectedRouterRedirect({
  redirectPath: REGISTRATION_ATHLETE_PROFILE,
  allowRedirectBack: false,
  authenticatedSelector: state => Boolean(state.userProfiles.selectedProfile && state.userProfiles.selectedProfile.type === athlete),
  // AuthenticatedSelector: state => Boolean(state.userIDs.data.athleteIDs && state.userIDs.data.athleteIDs.length),
  // authenticatedSelector: state => true, // Boolean(state.userProfiles.status === FULFILLED && state.userProfiles.data.find(searchAthlete)),
  wrapperDisplayName: 'AthleteRegistration'
});

export const athleteAccount = connectedRouterRedirect({
  redirectPath: REGISTRATION_ATHLETE_PREFERENCES,
  allowRedirectBack: false,
  authenticatedSelector: state => Boolean(state.userProfiles.selectedProfile && state.userProfiles.selectedProfile.type === athlete),
  wrapperDisplayName: 'AthleteRegistration'
});
