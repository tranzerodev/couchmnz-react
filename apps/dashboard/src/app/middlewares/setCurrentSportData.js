import * as types from '../constants/ActionTypes';
import {
  setTravelPreferences,
  setLocations,
  setTraining,
  setServices,
  setGender,
  setAges,
  setSkills,
  setPricing,
  setListing,
  setActionPictures,
  setActionVideos,
  setSportsStore,
  fetchSessions
  // SetSportsDegrees,
  // setCertifications,
  // setSportsAffiliations,
  // setSportsTools
} from '../actions';
import appConstants from '../constants/appConstants';

function setSportStores(store, sportData) {
  const {profile, userProfiles} = store.getState();
  if (userProfiles.selectedProfile && userProfiles.selectedProfile.type === appConstants.userProfileTypes.ISP) {
    store.dispatch(setSportsStore(sportData));
    store.dispatch(setTravelPreferences(sportData.travelPreferences));
    store.dispatch(setLocations(sportData.trainingLocations));
    store.dispatch(setTraining(sportData.subSSPTypes));
    store.dispatch(setServices(sportData.prerequisites.otherServices));
    store.dispatch(setGender(sportData.prerequisites.gender ? sportData.prerequisites.gender : []));
    store.dispatch(setAges(sportData.prerequisites.ages));
    store.dispatch(setSkills(sportData.prerequisites.skillLevels));
    store.dispatch(setPricing(sportData.pricePerSession.subSSPTypes));
    store.dispatch(setListing({headline: sportData.headline, description: sportData.description, bio: sportData.aboutMe, nickname: profile.data.profile.nickName}));
    store.dispatch(setActionPictures({images: sportData.media.images, baseUrl: sportData.media.imgBaseUrl}));
    store.dispatch(setActionVideos({videos: sportData.media.videos, baseUrl: sportData.media.vidBaseUrl}));
    store.dispatch(fetchSessions({profileID: profile.data.profile.id, sportID: sportData.id}));
  // Store.dispatch(setSportsDegrees(sportData.univDegrees && sportData.univDegrees.length ? sportData.univDegrees : []));
  // store.dispatch(setCertifications(sportData.certifications && sportData.certifications.length ? sportData.certifications : []));
  // store.dispatch(setSportsAffiliations(sportData.affiliations && sportData.affiliations.length ? sportData.affiliations : []));
  // store.dispatch(setSportsTools(sportData.tools && sportData.tools.length ? sportData.tools : []));
  }
}

const setStore = store => next => action => {
  next(action);

  if (action.type === (types.FETCH_CURRENT_SPORT + types.FULFILLED) && action.payload.data.responseCode === 0) {
    setSportStores(store, action.payload.data.payload);
  } else if (action.type === types.CHANGE_CURRENT_SPORT) {
    setSportStores(store, action.sport);
  }
};

export default setStore;
