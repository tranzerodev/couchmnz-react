import {isNonEmptyArray} from '../../../common/util';
export default function validation({skillLevels, training, ages, gender}) {
  const validation = {
    skillLevels: false,
    training: false,
    gender: false,
    ages: false,
    valid: false
  };
  validation.skillLevels = isNonEmptyArray(skillLevels);
  validation.training = isNonEmptyArray(training);
  validation.ages = isNonEmptyArray(ages);
  validation.gender = isNonEmptyArray(gender);
  validation.valid = validation.skillLevels && validation.training && validation.ages && validation.gender;
  return validation;
}
