import {notNull} from '../../../validators/common/util';

const validateOverridePrice = overridePrice => {
  const validation = {
    overridePrice: false
  };

  validation.overridePrice = notNull(overridePrice) && (overridePrice > 0);

  validation.valid = validation.overridePrice;
  return validation;
};

export default validateOverridePrice;
