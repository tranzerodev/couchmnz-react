import {notNull, isNumber, isPercent} from '../../../common/util';

const validate = object => {
  const validation = {};
  const {name, numberOfSessions, discount} = object;
  validation.name = notNull(name);
  validation.numberOfSessions = isNumber(numberOfSessions) && object.numberOfSessions < 100 && object.numberOfSessions > 0;
  validation.discount = isPercent(discount);
  validation.valid = validation.name && validation.numberOfSessions && validation.discount;
  return validation;
};

export default validate;
