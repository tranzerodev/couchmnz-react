import {
  updateProfile
} from '../actions';

import {
  UPDATE_BUSINESS_MODEL,
  UPDATE_BOOKING_PREFERENCES,
  UPDATE_CANCELLATION_POLICY,
  UPDATE_PAYOUT_OPTION,
  CLEAR_PAYOUT_OPTION,
  UPDATE_CONTACT,
  UPDATE_BUSINESS,
  UPDATE_PHONES,
  ADD_PHONE,
  UPDATE_BANK_DETAILS,
  UPDATE_PAYPAL_DETAILS,
  CLEAR_BANK_DETAILS,
  CLEAR_PAYPAL_DETAILS,
  UPDATE_CURRENCY,
  CLEAR_CURRENCY,
  UPDATE_DEGREE,
  ADD_NEW_GEN_CERTIFICATION,
  REMOVE_GEN_CERTIFICATION,
  ADD_NEW_GEN_AWARD,
  REMOVE_GEN_AWARD,
  CLEAR_GEN_AWARDS,
  ADD_NEW_GEN_AFFILIATION,
  REMOVE_GEN_AFFILIATION,
  ADD_NEW_GEN_TOOL,
  REMOVE_GEN_TOOL,
  UPDATE_SPORT,
  DELETE_SPORT,
  UPDATE_SPECIALIZATION,
  ADD_DEGREE,
  REMOVE_UNI_DEGREE,
  UPDATE_LISTING,
  UPDATE_NICKNAME
} from '../constants/ActionTypes';
/* eslint complexity: 0 */

const updateProfileData = store => next => action => {
  next(action);
  switch (action.type) {
    case ADD_NEW_GEN_AWARD:
    case REMOVE_GEN_AWARD:
    case CLEAR_GEN_AWARDS:
    case UPDATE_BUSINESS_MODEL:
    case UPDATE_BOOKING_PREFERENCES:
    case UPDATE_CANCELLATION_POLICY:
    case UPDATE_PAYOUT_OPTION:
    case CLEAR_PAYOUT_OPTION:
    case UPDATE_CONTACT:
    case UPDATE_BUSINESS:
    case UPDATE_PHONES:
    case ADD_PHONE:
    case UPDATE_BANK_DETAILS:
    case UPDATE_PAYPAL_DETAILS:
    case UPDATE_CURRENCY:
    case CLEAR_CURRENCY:
    case CLEAR_BANK_DETAILS:
    case CLEAR_PAYPAL_DETAILS:
    case UPDATE_DEGREE:
    case ADD_NEW_GEN_CERTIFICATION:
    case ADD_NEW_GEN_AFFILIATION:
    case REMOVE_GEN_AFFILIATION:
    case REMOVE_GEN_CERTIFICATION:
    case ADD_NEW_GEN_TOOL:
    case UPDATE_SPORT:
    case DELETE_SPORT:
    case UPDATE_SPECIALIZATION:
    case ADD_DEGREE:
    case REMOVE_UNI_DEGREE:
    case UPDATE_LISTING:
    case UPDATE_NICKNAME:
    case REMOVE_GEN_TOOL: {
      const {bookingPreferences, certifications, cancellationPolicy, businessModel, contact, degrees, sport,
        payoutOption, bankDetails, paypalDetails, currency, profile, training, sspValidation, paypalVerification,
        genCertifications, genAwards, genAffiliations, genTools, currentSport, listing
      } = store.getState();
      console.log('UPDATE_PROFILE', 'sport', sport, 'currentSport', currentSport);
      const newSports = Object.assign([], profile && profile.data && profile.data.summary && profile.data.summary.sports && profile.data.summary.length && profile.data.summary.sports);
      if (newSports.findIndex(otherSport => otherSport.id === sport.id) < 0) {
        newSports.concat({id: sport.id, name: sport.name});
      }
      const newProfile = {
        profile: {
          ...(profile && profile.data && profile.data.profile ? profile.data.profile : {}),
          displayPicture: profile.data && profile.data.profile && profile.data.profile.displayPicture ? profile.data.profile.displayPicture : '',
          nickName: sspValidation.accountDetails.nickName.required && sspValidation.accountDetails.nickName.valid && listing && listing.nickname ? listing.nickname : (profile.data.profile.nickName) ? profile.data.profile.nickName : null,
          firstName: sspValidation.accountDetails.firstName && contact.firstName ? contact.firstName : (profile.data.profile.firstName) ? profile.data.profile.firstName : null,
          lastName: sspValidation.accountDetails.lastName && contact.lastName ? contact.lastName : (profile.data.profile.lastName) ? profile.data.profile.lastName : null,
          gender: sspValidation.accountDetails.gender && contact.gender ? contact.gender : (profile.data.profile.gender) ? profile.data.profile.gender : null
        },
        summary: {
          ...profile.data.summary,
          sports: [sport],
          nonSportSpecializations: [],
          genCertifications,
          genAwards,
          genAffiliations,
          genUnivDegrees: degrees,
          genTools,
          subSSPTypes: training && training.length ? training : []
        },
        notes: {
          meetNotes: '',
          firstPrepNotes: '',
          gearNotes: ''
        },
        contact: contact && sspValidation.accountDetails.valid ? contact : profile.data.contact,
        bookingPreference: bookingPreferences && sspValidation.bookingPreference.bookingPreference ? bookingPreferences : profile.data.bookingPreference,
        workHours: [],
        cancellationPolicy: cancellationPolicy && sspValidation.bookingPreference.cancellationPolicy ? cancellationPolicy : profile.data.cancellationPolicy,
        businessModel: businessModel && sspValidation.businessModel.valid ? businessModel : profile.data.businessModel,
        payoutOption: payoutOption && sspValidation.payoutDetails.payoutOption ? payoutOption : profile.data.payoutOption,
        currency: currency && sspValidation.payoutDetails.currency ? currency : profile.data.currency,
        bankDetails: bankDetails && sspValidation.bankPayoutDetails.valid ? bankDetails : profile.data.bankDetails,
        paypalDetails: paypalDetails && sspValidation.paypalSettings.valid && paypalDetails.email && paypalVerification.data && paypalVerification.data.email && paypalDetails.email === paypalVerification.data.email ? paypalDetails : (paypalDetails.email === profile.data.profile.email) ? paypalDetails : profile.data.paypalDetails
      };
      store.dispatch(updateProfile({
        data: newProfile,
        status: '_FULFILLED'
      }));
      break;
    }
    default: break;
  }
};

export default updateProfileData;
