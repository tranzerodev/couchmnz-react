import {notNull} from '../../../common/util';

const validate = object => {
  const validation = {
    name: false,
    valid: false
  };
  const {name} = object;
  validation.name = notNull(name);
  validation.valid = validation.name;
  return validation;
};

export default validate;
