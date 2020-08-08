import {isPricingComplete} from './pricing/complete';
import validateTrainingPreferences from './trainingPrefrences';

export default function sessionPrevalidation(data) {
  const {ages, gender, skillLevels} = data.prerequisites;
  const training = data.subSSPTypes;
  const trainingPreference = validateTrainingPreferences({ages, gender, skillLevels, training});
  if (trainingPreference.valid) {
    const {subSSPTypes} = data.pricePerSession;
    const pricingComplete = isPricingComplete(subSSPTypes);
    if (pricingComplete) {
      const {trainingLocations} = data;
      if (trainingLocations.length > 0) {
        return true;
      }
    }
  }
  return false;
}
