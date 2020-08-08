import {notNull, isNumber} from '../../../common/util';
import appConstants from '../../../../constants/appConstants';

const validate = object => {
  const validation = {
    name: false,
    institution: false,
    year: false,
    valid: false
  };
  const {name, institutionName, year} = object;
  validation.name = notNull(name);
  validation.year = isNumber(year) && year >= appConstants.minimumYear && year <= appConstants.maximumYear;
  validation.institution = notNull(institutionName);
  validation.valid = validation.name && validation.year && validation.institution;
  return validation;
};

export default validate;
