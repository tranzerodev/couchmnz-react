import {notNull} from '../../../common/util';
import appConstants from '../../../../constants/appConstants';
import {validateZipcode} from '../registration/accountDetails';

function willingToTravel(flag, notEmpty) {
  return notEmpty ? appConstants.willingToTravelFlags.yes === flag : false;
}

function validateAll(validation) {
  return validation.willingToTravel &&
  validation.distance &&
  validation.city &&
  validation.country &&
  validation.travelAddress &&
  validation.zip.required &&
  validation.zip.valid &&
  validation.zip.maxLength;
}

export default function (data) {
  const validation = {
    willingToTravel: false,
    distance: true,
    city: true,
    country: true,
    zip: {
      required: true,
      maxLength: true,
      valid: true
    },
    travelAddress: true,
    valid: false
  };
  validation.willingToTravel = Boolean(data.willingToTravel && notNull(data.willingToTravel.trim()));
  const flag = willingToTravel(data.willingToTravel, validation.willingToTravel);
  if (flag) {
    validation.distance = Boolean(data.distance && notNull(data.distance));
    validation.city = notNull(data.cityID);
    validation.country = notNull(data.countryID);
    validation.zip = validateZipcode(data);
    validation.travelAddress = Boolean(data.travelAddress && notNull(data.travelAddress.trim()));
  }
  validation.valid = validateAll(validation);
  return validation;
}
