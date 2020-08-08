
import appConstants from '../../../../constants/appConstants';
import {FULFILLED} from '../../../../constants/ActionTypes';
import getSportsDataFilledStatus from '../common/getCurrentSportStatus';
import {notNull} from '../../../common/util';
import validateBookingPreferences from '../common/bookingPreferences';
import {validateAccountDetails} from './accountDetails';
import {validateBankPayoutDetails} from './bankDetails';
import {validateWorkingDays} from '../common/schedulerSettings';

const intermediate = appConstants.RegistrationFlowPageStatusFlags.intermediate;
const disabled = appConstants.RegistrationFlowPageStatusFlags.disabled;
const complete = appConstants.RegistrationFlowPageStatusFlags.complete;

export function getBusinessModelStatus(businessModel) {
  if (notNull(businessModel)) {
    return complete;
  }
  return intermediate;
}

export function getBookingPreferencesStatus({bookingPreference, cancellationPolicy, bookingCutOffTime}) {
  const validatedBookingPrefences = validateBookingPreferences({bookingPreference, cancellationPolicy, bookingCutOffTime});
  if (validatedBookingPrefences.valid) {
    return complete;
  }
  return intermediate;
}

export function getAccountDeatilsStatus(data) {
  const validatedAccountDetails = validateAccountDetails(data);
  if (validatedAccountDetails.required) {
    return complete;
  }
  return intermediate;
}

export function getPayoutDeatilStatus(data) {
  const {payoutOption, bankDetails} = data;
  if (notNull(payoutOption)) {
    if (payoutOption === appConstants.payoutOption.payPal) {
      const {paypalDetails} = data;
      if (notNull(paypalDetails.email)) {
        return complete;
      }
    } else if (payoutOption === appConstants.payoutOption.bank) {
      const validatedBankDetails = validateBankPayoutDetails(bankDetails);
      if (validatedBankDetails.required) {
        return complete;
      }
    }
  }
  return appConstants.RegistrationFlowPageStatusFlags.intermediate;
}

export function getWorkingDaysStatus(weeks) {
  const valid = validateWorkingDays(weeks);
  if (valid) {
    return complete;
  }
  return intermediate;
}

export function getEventsStatus(sessions, events) {
  if (sessions.data.length > 0) {
    if (events.data.length > 0) {
      return complete;
    }
    return intermediate;
  }
  return disabled;
}

export function getProfileBiographyStatus({genAffiliations, genAwards, genCertifications, genTools, genUnivDegrees}) {
  if (genUnivDegrees.length > 0) {
    return complete;
  }
  if (genCertifications.length > 0) {
    return complete;
  }
  if (genAwards.length > 0) {
    return complete;
  }
  if (genTools.length > 0) {
    return complete;
  }
  if (genAffiliations.length > 0) {
    return complete;
  }
  return intermediate;
}

export default function getPageStatus(profile, currentSport, sessions, events) {
  let status = {
    trainingPreference: disabled,
    sport: intermediate,
    listing: disabled,
    media: disabled,
    biography: disabled,
    businessModel: intermediate,
    bookingPreference: intermediate,
    accountDetails: intermediate,
    payoutDetails: intermediate,
    pricing: disabled,
    trainingLocation: disabled,
    session: disabled,
    event: disabled
  };

    // Sports
  const sportsStatus = getSportsDataFilledStatus(currentSport, sessions);
  status = Object.assign({}, status, {...sportsStatus});

  if (profile.status === FULFILLED) {
    // Biography
    const profileBiography = getProfileBiographyStatus(profile.data.summary);
    status.biography = (profileBiography === complete || status.biography === complete) ? complete : intermediate;

    // Business Model
    const {businessModel} = profile.data;
    status.businessModel = getBusinessModelStatus(businessModel);

    // Booking Prefernces
    const {bookingPreference, cancellationPolicy} = profile.data;
    status.bookingPreference = getBookingPreferencesStatus({bookingPreference, cancellationPolicy});

    // Account Details
    const {contact} = profile.data;
    const nickname = profile.data.profile.nickName;
    const gender = profile.data.profile.gender;
    const firstName = profile.data.profile.firstName;
    const lastName = profile.data.profile.lastName;
    status.accountDetails = getAccountDeatilsStatus({...contact, nickname, gender, firstName, lastName});

    // Payout Details
    status.payoutDetails = getPayoutDeatilStatus(profile.data);
  }
  // Events
  status.event = getEventsStatus(sessions, events);
  return status;
}

export function getProfileStatus(profile, weeks) {
  const status = {
    businessModel: intermediate,
    bookingPreference: intermediate,
    accountDetails: intermediate,
    payoutDetails: intermediate,
    schedulerWorkingDays: intermediate
  };

  if (profile.status === FULFILLED) {
  // Business Model
    const {businessModel, isActive} = profile.data;
    status.businessModel = isActive === appConstants.profileActiveFlages.active ? getBusinessModelStatus(businessModel) : complete;

    // Booking Prefernces
    const {bookingPreference, cancellationPolicy, bookingCutOffTime} = profile.data;
    status.bookingPreference = getBookingPreferencesStatus({bookingPreference, cancellationPolicy, bookingCutOffTime});

    // Account Details
    const {contact} = profile.data;
    const nickname = profile.data.profile.nickName;
    const gender = profile.data.profile.gender;
    const firstName = profile.data.profile.firstName;
    const lastName = profile.data.profile.lastName;
    status.accountDetails = getAccountDeatilsStatus({...contact, nickname, gender, firstName, lastName});

    // Payout Details
    status.payoutDetails = getPayoutDeatilStatus(profile.data);

    // Scheduler Settings
    status.schedulerWorkingDays = complete; //getWorkingDaysStatus(weeks);
  }
  return status;
}
