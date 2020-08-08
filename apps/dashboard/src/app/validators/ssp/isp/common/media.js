import {notNull, isNonEmptyArray} from '../../../common/util';
export default function validation({actionPictures, displayPicture}) {
  const validation = {
    displayPicture: false,
    actionPictures: false,
    valid: false
  };
  validation.actionPictures = isNonEmptyArray(actionPictures);
  validation.displayPicture = notNull(displayPicture);
  validation.valid = validation.actionPictures && validation.actionPictures;
  return validation;
}
