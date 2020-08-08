import {getProfileStatus} from '../registration/registrationPageStatus';
import getProfilePagesCompletionStatus from '../registration/getProfileCompletionStatus';
export default function getProfileCompletionStatus(profile, workingDays, profileActivationStatus) {
  if (profileActivationStatus) {
    return true;
  }
  const status = getProfileStatus(profile, workingDays.data);
  return getProfilePagesCompletionStatus(status);
}
