import {notNull, isNumber} from '../../../common/util';
import appConstants from '../../../../constants/appConstants';

const validate = object => {
  const validation = {
    type: false,
    year: false,
    valid: false
  };
  const {type, year} = object;
  validation.type = notNull(type);
  validation.year = isNumber(year) && year >= appConstants.minimumExperience && year <= appConstants.maximumExperience;
  validation.valid = validation.type && validation.year;
  return validation;
};

export default validate;
