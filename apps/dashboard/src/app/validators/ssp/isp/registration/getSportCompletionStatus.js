import appConstants from '../../../../constants/appConstants';
const complete = appConstants.RegistrationFlowPageStatusFlags.complete;

export default function getSportCompletion(status) {
  return (status.trainingPreference === complete &&
    status.sport === complete &&
    status.listing === complete &&
    status.media === complete &&
    status.biography === complete &&
    status.pricing === complete &&
    status.trainingLocation === complete &&
    status.session === complete);
  // Status.travelPreferences === complete
}
