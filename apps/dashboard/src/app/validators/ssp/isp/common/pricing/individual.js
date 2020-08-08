import {isNumber, isNonEmptyArray, filterClone} from '../../../../common/util';
import appConstants from '../../../../../constants/appConstants';

const validateSpecificPricing = price => price.isPercentage === appConstants.yes ? isNumber(price.operand) && parseFloat(price.operand) >= 0 && parseFloat(price.operand) <= 100 : isNumber(price.operand) && parseFloat(price.operand) >= 0 && parseFloat(price.operand) <= appConstants.maxSpecificPricing;

// Export default
const validatePricing = pricing => {
  const {prices, volumeDiscount, skillLevels, ages} = pricing;
  const validation = {
    prices: false,
    volumeDiscount: false,
    skillLevels: false,
    ages: false
  };
  validation.prices = isNonEmptyArray(prices) && isNumber(prices[0].price) && prices[0].price >= 0;
  validation.volumeDiscount = isNonEmptyArray(volumeDiscount);
  validation.skillLevels = isNonEmptyArray(skillLevels) ? skillLevels.map(skill => validateSpecificPricing(skill)) : [];
  validation.ages = isNonEmptyArray(ages) ? ages.map(age => validateSpecificPricing(age)) : [];
  validation.valid = validation.prices && (isNonEmptyArray(skillLevels) ? validation.skillLevels.every(filterClone) : true) && (isNonEmptyArray(ages) ? validation.ages.every(filterClone) : true);
  validation.required = isNonEmptyArray(prices);
  return validation;
};

export default validatePricing;
