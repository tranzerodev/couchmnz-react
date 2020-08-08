import {notNull} from '../../../common/util';
import appConstants from '../../../../constants/appConstants';

const validate = object => {
  const validation = {
    name: false,
    isCertified: true,
    certificate: false,
    institution: false,
    valid: false
  };
  const {name, isCertified, certificateName, institutionName} = object;
  validation.name = notNull(name);
  // Validation.isCertified = notNull(isCertified);
  validation.institution = validation.isCertified && isCertified === appConstants.yes ? notNull(institutionName) : true;
  validation.certificate = validation.isCertified && isCertified === appConstants.yes ? notNull(certificateName) : true;
  validation.valid = validation.name && validation.isCertified && validation.certificate && validation.institution;
  return validation;
};

export default validate;
