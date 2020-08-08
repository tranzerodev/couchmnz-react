import * as types from '../constants/ActionTypes';
import appConstants from '../constants/appConstants';
import moment from 'moment-timezone';
const sortSportByName = (sport, sport2) => sport.name > sport2.name;

import {
  setSports,
  sspSetNickName,
  // SetGenCertifications,
  // setGenAffiliations,
  // setGenAwards,
  // setGenTools,
  sspSetPresentNickName,
  setDisplayPicture,
  fetchCurrentSport,
  // SetDegree,
  setContact,
  setBusinessModel,
  setBookingPreference,
  setCancelationPolicy,
  setPayoutOption,
  setCurrency,
  setBankDetails,
  setPaypalDetails,
  fetchUserProfiles,
  setBookingCutOffTime
} from '../actions';
import {FULFILLED} from '../constants/ActionTypes';
const setStore = store => next => action => {
  next(action);
  if (action.type === (types.FETCH_PROFILE + types.FULFILLED) && action.payload.data.responseCode === 0) {
    const {firstName, lastName, gender} = action.payload.data.payload.profile;
    const {currentSport} = store.getState();

    store.dispatch(setContact({...action.payload.data.payload.contact, gender, firstName, lastName}));
    store.dispatch(setSports(action.payload.data.payload.summary.sports));
    // Store.dispatch(setGenCertifications(action.payload.data.payload.summary.genCertifications));
    store.dispatch(setBusinessModel(action.payload.data.payload.businessModel ? action.payload.data.payload.businessModel : null));
    store.dispatch(setBookingPreference(action.payload.data.payload.bookingPreference));
    store.dispatch(setBookingCutOffTime(action.payload.data.payload.bookingCutOffTime ? action.payload.data.payload.bookingCutOffTime : null));
    store.dispatch(setCancelationPolicy(action.payload.data.payload.cancellationPolicy));
    store.dispatch(setPayoutOption(action.payload.data.payload.payoutOption));
    store.dispatch(setCurrency(action.payload.data.payload.currency));
    store.dispatch(setBankDetails(action.payload.data.payload.bankDetails));
    store.dispatch(setPaypalDetails(action.payload.data.payload.paypalDetails));

    // Store.dispatch(setDegree(action.payload.data.payload.summary.genUnivDegrees && action.payload.data.payload.summary.genUnivDegrees.length ? action.payload.data.payload.summary.genUnivDegrees : []));
    // store.dispatch(setGenCertifications(action.payload.data.payload.summary.genCertifications && action.payload.data.payload.summary.genCertifications.length ? action.payload.data.payload.summary.genCertifications : []));
    // store.dispatch(setGenAffiliations(action.payload.data.payload.summary.genAffiliations && action.payload.data.payload.summary.genAffiliations.length ? action.payload.data.payload.summary.genAffiliations : []));
    // store.dispatch(setGenAwards(action.payload.data.payload.summary.genAwards && action.payload.data.payload.summary.genAwards.length ? action.payload.data.payload.summary.genAwards : []));
    // store.dispatch(setGenTools(action.payload.data.payload.summary.genTools && action.payload.data.payload.summary.genTools.length ? action.payload.data.payload.summary.genTools : []));

    if (action.payload.data.payload.profile.nickName !== null) {
      store.dispatch(sspSetNickName({available: appConstants.nicknameAvailabilityFlags.available, nickname: action.payload.data.payload.profile.nickName}));
      store.dispatch(sspSetPresentNickName(action.payload.data.payload.profile.nickName));
    }
    if (action.payload.data.payload.summary.sports && action.payload.data.payload.summary.sports.length) {
      const sportID = currentSport.status === FULFILLED ? currentSport.data.id : action.payload.data.payload.summary.sports.sort(sortSportByName)[0].id;
      store.dispatch(fetchCurrentSport({profileID: action.payload.data.payload.profile.id, sportID}));
    }
    const {displayPicture} = store.getState();
    if (!displayPicture.picture) {
      store.dispatch(setDisplayPicture(action.payload.data.payload.profile.displayPicture));
    }

    if (action.payload.data.payload.contact && action.payload.data.payload.contact.timezone && action.payload.data.payload.contact.timezone.label) {
      const timeZoneLabel = action.payload.data.payload.contact.timezone.label;
      const timeZoneString = timeZoneLabel.split(' (')[0]; // TODO Need to fix this
      if (timeZoneString) {
        moment.tz.setDefault(timeZoneString);
      }
    }
  }
};

export default setStore;
