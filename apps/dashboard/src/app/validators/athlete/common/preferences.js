import {notNull, isNumber, isNonEmptyArray} from '../../../validators/common/util';

const validatePreferences = data => {
  const validation = {
    sport: false,
    experience: false,
    skillLevel: false,
    sspSubTypes: false,
    trainerGenders: false,
    address: false,
    distance: false,
    location: false,
    valid: false
  };

  const {id, name, yearOfExperience, skillLevel, preferences} = data;
  const {travelPref} = preferences;
  const {travelFrom} = travelPref;
  validation.sport = notNull(id) && notNull(name);
  validation.experience = notNull(yearOfExperience) ? isNumber(yearOfExperience) && parseInt(yearOfExperience, 10) >= 0 : true;
  validation.skillLevel = notNull(skillLevel.id) && notNull(skillLevel.description);
  validation.sspSubTypes = isNonEmptyArray(preferences.sspSubTypes);
  validation.trainerGenders = isNonEmptyArray(preferences.trainerGenders);
  validation.location = notNull(travelPref) && notNull(travelFrom.location);
  validation.distance = (notNull(travelPref) && notNull(travelPref.distance)) ? (parseInt(travelPref.distance, 10) > 0) : true;
  validation.address = (notNull(travelPref) && parseInt(travelPref.distance, 10) > 0) ? (notNull(travelFrom) && notNull(travelFrom.address)) : true;
  validation.valid = validation.sport && validation.experience &&
    validation.skillLevel && validation.sspSubTypes && validation.trainerGenders &&
      validation.distance && validation.address;
  return validation;
};

export default validatePreferences;
