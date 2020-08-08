import {notNull} from '../../../common/util';

const validate = object => {
  const validation = {
    type: false,
    description: false,
    valid: false
  };
  const {description} = object;
  // Validation.type = notNull(type);
  validation.description = notNull(description.trim());
  validation.valid = validation.description;
  return validation;
};

export default validate;
