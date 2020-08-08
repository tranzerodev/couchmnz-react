import {isValidEmail} from '../../../validators/common/util';
import appConstants from '../../../constants/appConstants';
const validateInviteAthlete = inviteAthleteTags => {
  const validation = {
    email: true,
    require: false
  };

  validation.require = inviteAthleteTags.length > 0;

  inviteAthleteTags.forEach(inviteAthleteTag => {
    if ((inviteAthleteTag.type === appConstants.InviteAthlete.inviteBy.email) && (isValidEmail(inviteAthleteTag.value) === false)) {
      validation.email = false;
      return true;
    }
  });
  validation.valid = validation.require === true && validation.email === true;
  return validation;
};

export default validateInviteAthlete;
