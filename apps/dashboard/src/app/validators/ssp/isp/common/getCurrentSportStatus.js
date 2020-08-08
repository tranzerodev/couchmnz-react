import {FULFILLED} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';
import {notNull} from '../../../common/util';
import validateTrainingPreferences from './trainingPrefrences';
import validateListing from '../dashboard/listing';
import validateMedia from './media';
import sessionPreValidation from './sessionPreValidation';
import validatetravelPreference from '../../../../validators/ssp/isp/dashboard/travelPreference';
import validateBiography from '../dashboard/biography';

export function validateBuildProfile(currentSport) {
  const validation = {
    sports: false
  };
  if (currentSport.data) {
    validation.sport = notNull(currentSport.data.id);
    validation.valid = validation.sport;
  }
  return validation;
}

export function getSportsBiographyStatus({coachingExperience, playingExperience}) {
  const {intermediate, complete} = appConstants.RegistrationFlowPageStatusFlags;
  const validation = validateBiography({coachingExperience, playingExperience});
  if (validation.coachingExperience === true || validation.playingExperience === true) {
    return complete;
  }
  return intermediate;
}

export function getSportStatus(currentSport) {
  const validatedSports = validateBuildProfile(currentSport);
  if (validatedSports.valid) {
    return appConstants.RegistrationFlowPageStatusFlags.complete;
  }
  return appConstants.RegistrationFlowPageStatusFlags.intermediate;
}

export function getTrainingPreferencesStatus({prerequisites, training}) {
  const {ages, gender, skillLevels} = prerequisites;
  const trainingPreference = validateTrainingPreferences({ages, gender, skillLevels, training});
  if (trainingPreference.valid) {
    return appConstants.RegistrationFlowPageStatusFlags.complete;
  }
  return appConstants.RegistrationFlowPageStatusFlags.intermediate;
}

export function getListingStatus(headline) {
  const validatedListing = validateListing({headline});
  if (validatedListing.valid) {
    return appConstants.RegistrationFlowPageStatusFlags.complete;
  }
  return appConstants.RegistrationFlowPageStatusFlags.intermediate;
}

export function getSportsMediaStatus(actionPictures) {
  const validatedMedia = validateMedia({actionPictures, displayPicture: null});
  if (validatedMedia.actionPictures) {
    return appConstants.RegistrationFlowPageStatusFlags.complete;
  }
  return appConstants.RegistrationFlowPageStatusFlags.intermediate;
}

export function getPricingStatus(data) {
  const {ages, gender, skillLevels} = data.prerequisites;
  const training = data.subSSPTypes;
  const validation = validateTrainingPreferences({ages, gender, skillLevels, training});
  const preValidationStatus = validation.skillLevels && validation.training && validation.ages;
  if (preValidationStatus) {
    const {subSSPTypes} = data.pricePerSession;
    for (let i = 0; i < subSSPTypes.length; i++) {
      if (subSSPTypes[i].prices.length < 1) {
        return appConstants.RegistrationFlowPageStatusFlags.intermediate;
      }
    }
    return appConstants.RegistrationFlowPageStatusFlags.complete;
  }
  return appConstants.RegistrationFlowPageStatusFlags.disabled;
}

export function getTravelPreferenceStatus(travelPreferences) {
  const validation = validatetravelPreference(travelPreferences);
  if (validation.valid) {
    return appConstants.RegistrationFlowPageStatusFlags.complete;
  }
  return appConstants.RegistrationFlowPageStatusFlags.intermediate;
}

export function getTrainingLocation({trainingLocations}) {
  if (trainingLocations.length > 0) {
    return appConstants.RegistrationFlowPageStatusFlags.complete;
  }
  return appConstants.RegistrationFlowPageStatusFlags.intermediate;
}

export function getSessionStatus(sessions, data) {
  const status = sessionPreValidation(data);
  if (status) {
    if (sessions.status === FULFILLED && sessions.data.length > 0) {
      return appConstants.RegistrationFlowPageStatusFlags.complete;
    }
    return appConstants.RegistrationFlowPageStatusFlags.intermediate;
  }
  return appConstants.RegistrationFlowPageStatusFlags.disabled;
}

export default function getSportsDataFilledStatus(currentSport, sessions) {
  const intermediate = appConstants.RegistrationFlowPageStatusFlags.intermediate;
  const disabled = appConstants.RegistrationFlowPageStatusFlags.disabled;
  const status = {
    trainingPreference: disabled,
    sport: intermediate,
    listing: disabled,
    media: disabled,
    biography: disabled,
    pricing: disabled,
    trainingLocation: disabled,
    session: disabled,
    travelPreferences: disabled
  };
  if (currentSport.status === FULFILLED) {
    // Build Profile
    status.sport = getSportStatus(currentSport);

    // Biography
    const {coachingExperience, playingExperience} = currentSport.data;
    status.biography = getSportsBiographyStatus({coachingExperience, playingExperience});

    // Training Preferences
    status.trainingPreference = getTrainingPreferencesStatus({prerequisites: currentSport.data.prerequisites, training: currentSport.data.subSSPTypes});

    // Listing
    status.listing = getListingStatus(currentSport.data.headline);

    // Media
    status.media = getSportsMediaStatus(currentSport.data.media.images);

    // Pricing
    status.pricing = getPricingStatus(currentSport.data);

    // Training Locations
    const {trainingLocations, travelPreferences} = currentSport.data;
    status.trainingLocation = getTrainingLocation({trainingLocations});

    // Travel Preference
    status.travelPreferences = 'Y'; // getTravelPreferenceStatus(travelPreferences);

    // Sessions
    status.session = getSessionStatus(sessions, currentSport.data);
  }
  return status;
}
