import {SSP_VALIDATE_BUILD_PROFILE, SSP_BUILD_PROFILE_SUBMIT} from '../../constants/ActionTypes';
function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
const valid = true;
let validCertification = true;
let validDegrees = true;
function validateSport(sport) {
  const validatedSport = {};
  validatedSport.sport = {
    required: Boolean(notNull(sport.name) && sport.name),
    valid: Boolean(notNull(sport.id) && sport.id)
  };
  // ValidatedSports[i].experience = Boolean(sports[i].experience && notNull(sports[i].experience));
  validatedSport.coachingExperience = {
    numberOfYears: Boolean(notNull(sport.coachingExperience) && sport.coachingExperience.numberOfYears) && typeof sport.coachingExperience.numberOfYears === 'number' && sport.coachingExperience.numberOfYears > 0,
    description: Boolean(true || (notNull(sport.coachingExperience) && sport.coachingExperience.description) && typeof sport.coachingExperience.description === 'string' && sport.coachingExperience.description !== '')
  };
  validatedSport.playingExperience = {
    numberOfYears: Boolean(notNull(sport.playingExperience) && sport.playingExperience.numberOfYears) && typeof sport.playingExperience.numberOfYears === 'number' && sport.playingExperience.numberOfYears > 0,
    description: Boolean(true || (notNull(sport.playingExperience) && sport.playingExperience.description) && typeof sport.playingExperience.description === 'string' && sport.playingExperience.description !== '')
  };
  validatedSport.offerTerminology = Boolean(notNull(sport.offerTerminology)) && typeof sport.offerTerminology === 'string' && sport.offerTerminology !== '';
  validatedSport.valid = Boolean(validatedSport.sport.required === true &&
      validatedSport.sport.valid === true &&
        validatedSport.coachingExperience.numberOfYears === true &&
          validatedSport.playingExperience.numberOfYears === true);
          //validatedSport.coachingExperience.description === true &&
              //validatedSport.playingExperience.description === true);
  console.log('Valid', valid);
  return validatedSport;
}
function validationCertifications(data) {
  const valiadteCertifications = [];
  validCertification = true;
  for (let i = 0; i < data.certifications.length; i++) {
    valiadteCertifications[i] = {id: i};
    valiadteCertifications[i].certificate = {
      certificationName: data.certifications[i] && data.certifications[i].institutionName && notNull(data.certifications[i].institutionName) ? notNull(data.certifications[i].name) : true,
      institutionName: data.certifications[i] && data.certifications[i].name && notNull(data.certifications[i].name) ? notNull(data.certifications[i].institutionName) : true
    };
    validCertification = Boolean(valiadteCertifications[i].certificate.certificationName && valiadteCertifications[i].certificate.institutionName);
  }
  return valiadteCertifications;
}

function validationDegrees(data) {
  const valiadteDegrees = [];
  validDegrees = true;
  for (let i = 0; i < data.degrees.length; i++) {
    valiadteDegrees[i] = {id: i};
    valiadteDegrees[i].degree = {
      degreeName: data.degrees[i] && data.degrees[i].name && notNull(data.degrees[i].institutionName) ? notNull(data.degrees[i].name) : true,
      institutionName: data.degrees[i] && data.degrees[i].name && notNull(data.degrees[i].name) ? notNull(data.degrees[i].institutionName) : true
    };
    validDegrees = Boolean(valiadteDegrees[i].degree.degreeName && valiadteDegrees[i].degree.institutionName);
  }
  return valiadteDegrees;
}

const initialState = {
  submitted: false,
  valid: false,
  sport: false,
  certifications: [],
  degrees: []
};
const bookingPreferences = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIDATE_BUILD_PROFILE : {
      const data = action.data;
      const validation = Object.assign({}, state);
      validation.sport = validateSport(data.sport);
      // Validation.certifications = validationCertifications(data);
      // validation.degrees = validationDegrees(data);
      validation.valid = validation.sport.valid;
      return validation;
    }
    case SSP_BUILD_PROFILE_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      return validation;
    }
    default:
      return state;
  }
};

export default bookingPreferences;
