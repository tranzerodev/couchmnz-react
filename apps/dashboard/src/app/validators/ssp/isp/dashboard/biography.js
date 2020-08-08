import {notNull} from '../../../common/util';

export default function validateBiography({coachingExperience, playingExperience}) {
  const validation = {
    playingExperience: false,
    coachingExperience: false
  };
  validation.coachingExperience = notNull(coachingExperience.numberOfYears);
  validation.playingExperience = notNull(playingExperience.numberOfYears);
  validation.valid = validation.coachingExperience;
  return validation;
}
