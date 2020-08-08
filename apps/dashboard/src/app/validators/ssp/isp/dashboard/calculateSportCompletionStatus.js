import getSportDataFilledStatus from '../common/getCurrentSportStatus';
import getSportCompletionStatus from '../registration/getSportCompletionStatus';
export default function getProfileCompletionStatus(currentSport, sessions, sportActivationStatus) {
  if (sportActivationStatus) {
    return true;
  }
  const status = getSportDataFilledStatus(currentSport, sessions);
  return getSportCompletionStatus(status);
}
