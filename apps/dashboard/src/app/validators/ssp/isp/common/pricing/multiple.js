import {isNumber, isNonEmptyArray, filterClone} from '../../../../common/util';
import appConstants from '../../../../../constants/appConstants';

const validateSpecificPricing = price => price.isPercentage === appConstants.yes ? isNumber(price.operand) && parseFloat(price.operand) >= 0 && parseFloat(price.operand) <= 100 : isNumber(price.operand) && parseFloat(price.operand) >= 0 && parseFloat(price.operand) <= appConstants.maxSpecificPricing;

const validateBasePrice = p => {
  const price = isNumber(p.price) && p.price >= 0;
  const min = isNumber(p.min) && p.min > 0 && p.min <= 127;
  const max = isNumber(p.min) && isNumber(p.max) && parseInt(p.max, 10) >= parseInt(p.min, 10) && parseInt(p.max, 10) <= 127;
  return {
    price,
    min,
    max,
    valid: price && min && max
  };
};

const validateGroupSize = p => {
  const prices = p.sort((p, p2) => parseInt(p.min, 10) > parseInt(p2.min, 10));
  const length = prices.length;
  return prices.map((price, i) => {
    if (length) {
      if (i === 0) {
        return true;
      }

      const currentMin = parseInt(price.min, 10);
      const currentMax = parseInt(price.max, 10);

      const prevMin = parseInt(prices[i - 1].min, 10);
      const prevMax = parseInt(prices[i - 1].max, 10);

      if (currentMin === prevMin && currentMax === prevMax) {
        return false;
      }
    }
    return true;
  });
};

const isValidPrices = prices => {
  // Return isNonEmptyArray(prices) && (prices.every(prices.map(p => p.valid)));
  const validatedPrices = prices.map(p => p.valid);
  const isValid = validatedPrices.every(filterClone);
  return isNonEmptyArray(prices) && isValid;
};

const isValidGroupSizes = groupSizes => groupSizes.every(g => (g === true));
// Export default
const validatePricing = pricing => {
  const {prices, volumeDiscount, skillLevels, ages} = pricing;
  const validation = {
    prices: [],
    volumeDiscount: false,
    skillLevels: false,
    ages: false
  };
  validation.prices = isNonEmptyArray(prices) ? prices.map(p => validateBasePrice(p)) : [];
  validation.groupSizes = validateGroupSize(prices);
  validation.volumeDiscount = isNonEmptyArray(volumeDiscount);

  validation.skillLevels = isNonEmptyArray(skillLevels) ? skillLevels.map(skill => validateSpecificPricing(skill)) : [];
  validation.ages = isNonEmptyArray(ages) ? ages.map(age => validateSpecificPricing(age)) : [];
  validation.valid = isValidPrices(validation.prices) && isValidGroupSizes(validation.groupSizes) && (isNonEmptyArray(skillLevels) ? validation.skillLevels.every(filterClone) : true) && (isNonEmptyArray(ages) ? validation.ages.every(filterClone) : true);
  validation.required = isNonEmptyArray(prices);
  validation.requiredPrices = isNonEmptyArray(prices);
  validation.requiredVolumeDIscount = isNonEmptyArray(volumeDiscount);
  validation.requiredSkillLevels = isNonEmptyArray(skillLevels);
  validation.requiredAges = isNonEmptyArray(ages);
  return validation;
};

export default validatePricing;
