import {matchPath} from 'react-router';

import appConstants from '../../constants/appConstants';
import {getReturnUrl} from '../../../auth/auth';
import {fetchProfile, changeProfile, fetchAthleteProfile, fetchParentProfile, fetchAthleteAccount} from '../../actions/index';
import {DASHBOARD_PROFILE_TYPE} from '../../constants/pathConstants';
import {isNonEmptyArray} from '../../validators/common/util';

export default function handleChangeProfile(profile, store) {
  switch (profile.type) {
    case appConstants.userProfileTypes.ISP: {
      store.dispatch(fetchProfile({profileID: profile.id}));
      break;
    }
    case appConstants.userProfileTypes.ATHLETE: {
      store.dispatch(fetchAthleteProfile({athleteId: profile.id}));
      store.dispatch(fetchAthleteAccount());
      break;
    }
    case appConstants.userProfileTypes.PARENT: {
      const {userProfiles} = store.getState();
      if (profile && profile.dependentId) {
        store.dispatch(fetchParentProfile({parentId: profile.id, childId: profile.dependentId}));
        return;
      }
      store.dispatch(fetchParentProfile({parentId: profile.id, childId: isNonEmptyArray(profile.dependents) ? userProfiles && userProfiles.selectedProfile ? userProfiles.selectedProfile.dependentId : 'null' : 'null'}));
      break;
    }
    default: break;
  }
}

export function getProfile(userProfiles) {
  const pathname = getReturnUrl();
  const match = matchPath(pathname, {path: DASHBOARD_PROFILE_TYPE, exact: false, strict: false});
  if (match) {
    const profileType = match.params.profileType;
    const profile = userProfiles.find(profile => profile.type === profileType);
    if (profile) {
      return profile;
    }
  }
  const profile = userProfiles.find(profile => profile.isActive === appConstants.profileActiveFlages.active);
  if (profile) {
    return profile;
  }
  return userProfiles[0];
}

export function handleUrlChange(store, location, match) {
  const {userProfiles} = store.getState();
  const {selectedProfile} = userProfiles;
  let profileType = match.params.profileType;
  profileType = appConstants.userProfileTypes[Object.keys(appConstants.userProfileTypes).find(key => appConstants.userProfileTypes[key] === profileType)];
  if (profileType && selectedProfile && (profileType !== selectedProfile.type || profileType === appConstants.userProfileTypes.PARENT)) {
    const newProfile = userProfiles.data.find(profile => profile.type === profileType);
    if (newProfile) {
      if (profileType === appConstants.userProfileTypes.PARENT) {
        newProfile.dependentId = location.state && location.state.dependentId ? location.state.dependentId : undefined;
        newProfile.displayName = location.state && location.state.displayName ? location.state.displayName : newProfile.displayName;
      }
      const dependentId = location.state && location.state.dependentId ? location.state.dependentId : undefined;
      if (dependentId) {
        const dependent = newProfile.dependents.find(i => i.id === dependentId);
        store.dispatch(changeProfile({...newProfile, dependents: [dependent]}));
        return;
      }
      store.dispatch(changeProfile(newProfile));
    }
  }
}
