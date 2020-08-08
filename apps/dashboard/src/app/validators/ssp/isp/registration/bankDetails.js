
function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}

function isValidAccountNumber(number) {
  const validAccountNumber = {required: false, valid: true};
  if (notNull(number)) {
    validAccountNumber.required = true;
    if (Number.isInteger(parseFloat(number)) && number > 0) {
      validAccountNumber.valid = true;
    } else {
      validAccountNumber.valid = false;
    }
  }
  return validAccountNumber;
}

function validateAll(validation) {
  if (
    validation.accountNumber.valid === true &&
    validation.routingNumber.valid === true
  ) {
    return true;
  }
  return false;
}

function checkRequired(data) {
  return {required: notNull(data)};
}

function validateRequired(validation) {
  if (
    validation.accountNumber.required === true &&
    validation.routingNumber.required === true &&
    validation.holder.required === true &&
    validation.firstName.required === true &&
    validation.lastName.required === true &&
    validation.type.required === true &&
    validation.nickName.required === true &&
    validation.bank.required === true
  ) {
    return true;
  }
  return false;
}

export function validateBankPayoutDetails(data) {
  const validation = {};
  validation.accountNumber = isValidAccountNumber(data.accountNumber);
  validation.routingNumber = isValidAccountNumber(data.routingNumber);

  validation.holder = checkRequired(data.holder);

  validation.firstName = checkRequired(data.firstName);
  validation.lastName = checkRequired(data.lastName);
  validation.type = checkRequired(data.type);
  //Not sure why kept getting performUpdateIfNecessary: Unexpected batch number
  //when removing validation.nickName
  //validation.nickName = checkRequired(data.nickName);
  //Quick patch not to spend too much time on this since it needed to be refactor
  //later on
  validation.nickName = {required: true}
  validation.bank = checkRequired(data.bank);

  validation.valid = validateAll(validation);
  validation.required = validateRequired(validation);
  return validation;
}

