import {isValidEmail, notNull, isNonEmptyArray} from '../common/util';

const validateEmail = object => {
  if (object) {
    return {
      email: isValidEmail(object.email) || !notNull(object.email),
      name: notNull(object.name)
    };
  }
  return {
    email: false,
    name: false
  };
};

const checkValidEmail = object => object && object.email === true;

const checkMailList = emails => isNonEmptyArray(emails) && emails.every(checkValidEmail);

const validateEmails = emails => {
  if (isNonEmptyArray(emails)) {
    const validatedEmails = emails.map(validateEmail);
    return {
      valid: checkMailList(validatedEmails),
      emails: validatedEmails
    };
  }
  return {
    valid: false,
    emails: []
  };
};

export default validateEmails;
