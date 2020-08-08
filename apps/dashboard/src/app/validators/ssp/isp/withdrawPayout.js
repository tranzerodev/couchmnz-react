import {notNull} from '../../../validators/common/util';
import config from '../../../config';
const validateWithdrawAmount = settings => {
  const validation = {
    cutoffAmount: false
  };

  const {cutoffAmount} = settings;

  validation.cutoffAmount = notNull(cutoffAmount) && (cutoffAmount >= config.minWithdrawAmount);

  validation.valid = validation.cutoffAmount;
  return validation;
};

export default validateWithdrawAmount;
