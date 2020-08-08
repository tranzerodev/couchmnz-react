import {notNull} from '../../../common/util';
export default function (data) {
  const validation = {
    headline: false,
    valid: false
  };
  validation.headline = notNull(data.headline);
  if (validation.headline === true) {
    validation.valid = true;
  }
  return validation;
}
