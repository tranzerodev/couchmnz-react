import appConstants from '../../../../constants/appConstants';
const complete = appConstants.RegistrationFlowPageStatusFlags.complete;

export default function getProfileCompletion(status) {
  return Boolean(
    status.businessModel === complete &&
    status.bookingPreference === complete &&
    status.accountDetails === complete &&
    status.payoutDetails === complete &&
    status.schedulerWorkingDays === complete
  );
}
