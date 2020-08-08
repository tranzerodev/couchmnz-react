import appConstants from '../../constants/appConstants';

const {userProfileTypes} = appConstants;
const {PARENT} = userProfileTypes;

export const hasChild = profiles => {
  const parentProfile = profiles.find(profile => profile.type === PARENT);
  if (parentProfile && parentProfile.dependents.length > 0) {
    if (profiles.length === 1 && parentProfile.dependents.length === 1) {
      return false;
    }
    return true;
  }
  return false;
};
