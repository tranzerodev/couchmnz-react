import {notNull, isValidDate} from '../../../validators/common/util';
import moment from 'moment';
import appConstants from '../../../constants/appConstants';

export function isGradeApplicable(dob) {
  const age = moment().diff(dob, 'years');
  if (age < appConstants.parent.maxAgeApplicableForGrade) {
    return true;
  }
  return false;
}

const validateProfile = data => {
  const validation = {
    firstName: false,
    lastName: false,
    gender: false,
    dob: false,
    country: false,
    // Grade: false,
    height: false,
    weight: false,
    valid: false
  };
  const {firstName, lastName, gender, dob, country, height, weight} = data;
  validation.firstName = notNull(firstName);
  validation.lastName = notNull(lastName);
  validation.gender = notNull(gender);
  validation.dob = isValidDate(dob) && moment(dob).add(appConstants.minParentAge, 'years').isBefore(moment(new Date())) && moment(dob).isAfter(moment(new Date()).subtract(appConstants.maxParentAge, 'years'));
  validation.grade = validation.dob && isGradeApplicable(dob);
  validation.country = notNull(country) && (notNull(country.id) || notNull(country.name));
  // Validation.grade = notNull(grade);
  validation.height = notNull(height) && notNull(height.value) ? parseInt(height.value, 10) > 0 : true;
  validation.weight = notNull(weight) && notNull(weight.value) ? parseInt(weight.value, 10) > 0 : true;
  validation.valid = validation.firstName && validation.lastName &&
    validation.gender && validation.dob && validation.country && validation.height && validation.weight;
  return validation;
};

export default validateProfile;
