import {notNull, isNumber} from '../../../common/util';
import appConstants from '../../../../constants/appConstants';

const validate = object => {
  const validation = {
    description: false,
    year: false,
    valid: false
  };
  const {description, year} = object;
  validation.description = notNull(description);
  validation.year = isNumber(year) ? year >= appConstants.minimumYear && year <= appConstants.maximumYear : true;
  validation.valid = validation.description && validation.year;
  return validation;
};

export default validate;
