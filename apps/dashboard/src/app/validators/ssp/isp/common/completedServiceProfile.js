import appConstants from '../../../../constants/appConstants';

export function getSportsCompletionStatus(sectionStatus) {
  const {intermediate, disabled} = appConstants.RegistrationFlowPageStatusFlags;
  const pages = Object.keys(sectionStatus).map(key => {
    return sectionStatus[key];
  });
  return pages.indexOf(disabled) === -1 && pages.indexOf(intermediate) === -1;
}

export default function getCompletedServiceProfile(data) {
  for (let i = 0; i < data.length; i++) {
    const service = getSportsCompletionStatus(data[i].sectionStatus);
    if (service) {
      return data[i];
    }
  }
}

