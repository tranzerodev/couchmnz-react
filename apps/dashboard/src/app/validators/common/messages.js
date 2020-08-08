import config from '../../config';
import {notNull} from './util';
import appConstants from '../../constants/appConstants';

function validateTo(to) {
  if (Array.isArray(to) && to.length > 0) {
    return true;
  }
  return false;
}

const isValid = validation => {
  const {to, subject} = validation;
  return (to === true && subject === true);
};
export function validateMessages(data) {
  const validation = {};
  const {to, subject} = data;
  validation.to = validateTo(to);
  validation.subject = notNull(subject) && notNull(subject.trim());
  validation.valid = isValid(validation);
  return validation;
}
export function validateLabel(data) {
  let validLabel = false;
  const {newLabelName} = data;
  if (notNull(newLabelName.trim())) {
    validLabel = Boolean(config.RegExp.messagingLabel.test(newLabelName));
  }
  return validLabel;
}
export function validateFileAttachmentSize(data) {
  const {size} = data;
  const FileSize = size / 1024 / 1024; // In MB
  return !((FileSize > config.messagingSystem.maxFileSizeLimit));
}

export function canFetchMetadata(profile) {
  return (profile && profile.id && profile.isActive === appConstants.profileActiveFlages.active);
}
