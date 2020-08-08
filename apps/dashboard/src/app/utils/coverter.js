import appConstants from '../constants/appConstants';
import {isNumber} from '../validators/common/util';
const {conversion} = appConstants;
export const feetToInch = value => isNumber(value) ? Math.toFixed((parseFloat(value)) * conversion.feetToInch, 1) : 0.0;
export const inchToFeet = value => isNumber(value) ? Math.toFixed((parseFloat(value) * conversion.inchToFeet), 1) : 0.0;
export const poundsToKilos = value => isNumber(value) ? Math.ceil((parseFloat(value) * conversion.poundsToKilos)) : 0.0;
export const kilosToPounds = value => isNumber(value) ? Math.ceil((parseFloat(value) * conversion.kilosToPounds)) : 0.0;
export const milesToKilometres = value => isNumber(value) ? Math.ceil((parseFloat(value) * conversion.milesToKilometres)) : 0.0;
export const kilometresToMiles = value => isNumber(value) ? Math.ceil((parseFloat(value) * conversion.kilometresToMiles)) : 0.0;
export const lengthToFeetInches = value => {
  if (isNumber(value)) {
    const feet = parseInt(value, 10);
    const inches = Math.round((value - feet) * conversion.feetToInch, 10);
    return {
      feet: feet > appConstants.maxFeet ? appConstants.maxFeet : feet,
      inches: inches > appConstants.maxInches ? appConstants.maxInches : inches
    };
  }
  return {
    feet: '',
    inches: ''
  };
};
export const feetInchesToLength = value => {
  if (value && value.feet && value.inch) {
    const {feet, inches} = value;
    return Math.toFixed(feet + (inches / conversion.feetToInch), 1);
  }
  return 0.0;
};
