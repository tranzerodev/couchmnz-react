export function notNull(value) {
  if (value === undefined || value === null || value === '') {
    return false;
  }
  return true;
}

function validateSport(sport) {
  if (notNull(sport) && notNull(sport.name)) {
    if (notNull(sport.id)) {
      return true;
    }
  }
  return false;
}

function validateAll(validation) {
  if (
    validation.sport === true
  ) {
    return true;
  }
  return false;
}

function checkRequired(validation) {
  if (
    validation.sport === true
  ) {
    return true;
  }
  return false;
}

export function validateBuildProfile(sport) {
  const validation = {};
  validation.sport = validateSport(sport);
  validation.required = checkRequired(validation);
  validation.valid = validateAll(validation);
  return validation;
}

