import {
  validateBankPayoutDetails,
  sspValidatePayoutDetails,
  sspValidateAccountDetails,
  sspValidateBookingPreference,
  sspValidateBusinessModel,
  sspValidateBuildProfile
} from '../../actions';
import {
  UPDATE_BANK_DETAILS, UPDATE_CURRENCY, UPDATE_PAYOUT_OPTION, UPDATE_CONTACT, UPDATE_PHONES, ADD_PHONE, UPDATE_BOOKING_PREFERENCES, UPDATE_CANCELLATION_POLICY, UPDATE_BUSINESS_MODEL, UPDATE_SPORT, UPDATE_SPECIALIZATION, SSP_BUILD_PROFILE_SUBMIT, UPDATE_SKILLLEVEL, UPDATE_AGE, UPDATE_TRAINING, UPDATE_GENDER, SSP_VALIDATE_TRAINING_PREFERENCE, SSP_TRAINING_PREFERENCE_SUBMIT, SET_AGES, SET_TRAINING, SET_GENDER, SET_SKILLS, UPDATE_PROFILE, CLEAR_SPORTS, UPDATE_CERTIFICATION, SSP_SET_NICKNAME, SET_BUSINESS_MODEL, SET_BOOKING_PREFERENCES, SET_BANK_DETAILS, SET_CANCELATION_POLICY, SET_PAYOUT_OPTION, SET_CURRENCY
} from '../../constants/ActionTypes';

const updateProfileData = store => next => action => {
  next(action);
  switch (action.type) {
    case SET_BANK_DETAILS:
    case UPDATE_BANK_DETAILS: {
      const {bankDetails} = store.getState();
      store.dispatch(validateBankPayoutDetails(bankDetails));
      break;
    }
    case UPDATE_CURRENCY:
    case SET_PAYOUT_OPTION:
    case SET_CURRENCY:
    case UPDATE_PAYOUT_OPTION: {
      const {payoutOption, currency} = store.getState();
      store.dispatch(sspValidatePayoutDetails({payoutOption, currency}));
      break;
    }
    case UPDATE_CONTACT:
    case UPDATE_PHONES:
    case SSP_SET_NICKNAME:
    case ADD_PHONE: {
      const {contact, listing, nickname} = store.getState();
      store.dispatch(sspValidateAccountDetails({...contact, listing, nickname}));
      break;
    }
    case UPDATE_BOOKING_PREFERENCES:
    case SET_BOOKING_PREFERENCES:
    case SET_CANCELATION_POLICY:
    case UPDATE_CANCELLATION_POLICY: {
      const {bookingPreferences,
        cancellationPolicy} = store.getState();
      store.dispatch(sspValidateBookingPreference({bookingPreferences, cancellationPolicy}));
      break;
    }
    case SET_BUSINESS_MODEL:
    case UPDATE_BUSINESS_MODEL: {
      const {businessModel} = store.getState();
      store.dispatch(sspValidateBusinessModel({businessModel}));
      break;
    }
    case SSP_BUILD_PROFILE_SUBMIT:
    case UPDATE_CERTIFICATION:
    case CLEAR_SPORTS:
    case UPDATE_SPORT:
    case UPDATE_SPECIALIZATION: {
      const {sport} = store.getState();
      store.dispatch(sspValidateBuildProfile({sport}));
      break;
    }
    default:break;
  }
};

export default updateProfileData;
