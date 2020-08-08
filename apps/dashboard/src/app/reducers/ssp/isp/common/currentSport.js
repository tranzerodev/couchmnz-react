import {CLEAR_CURRENT_SPORT, FETCH_CURRENT_SPORT, FULFILLED, REJECTED, PENDING, CLEAR_SPORTS_RELATED_STORES, CHANGE_CURRENT_SPORT} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';
const initialState = {
  data: {
    isActive: appConstants.sportsActiveFlages.inactive,
    id: null,
    name: null,
    headline: null,
    description: null,
    aboutMe: null,
    offerTerminology: null,
    coachingExperience: {
      numberOfYears: null,
      description: null
    },
    playingExperience: {
      numberOfYears: null,
      description: null
    },
    specializations: [],
    certifications: [],
    subSSPTypes: [],
    prerequisites: {
      ages: [],
      skillLevels: [],
      gender: [],
      otherServices: []
    },
    pricePerSession: {
      subSSPTypes: []
    },
    travelPreferences: {
      travelAddress: null,
      willingToTravel: null,
      distance: null,
      location: {
        lat: null,
        lng: null
      }
    },
    trainingLocations: [],
    media: {
      imgBaseUrl: 'https://localhost/images/user_media/ssp_pics/5a97aa2cdb2529d10e7b23c6/',
      vidBaseUrl: 'https://localhost/images/user_media/ssp_videos/5a97aa2cdb2529d10e7b23c6/',
      images: [],
      videos: []
    },
    univDegrees: [],
    affiliations: [],
    awards: [],
    tools: []
  },
  status: null
};

export default function currentSport(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_SPORT + FULFILLED : {
      console.log('action', action);
      const data = action.payload.data.payload;
      const newData = Object.assign({}, initialState.data, data);
      let newStatus;
      if (action.payload.data.responseCode > 0) {
        newStatus = Object.assign({}, state, {status: REJECTED});
      } else {
        newStatus = Object.assign({}, state, {data: newData, status: FULFILLED});
      }
      return newStatus;
    }
    case FETCH_CURRENT_SPORT + PENDING : {
      const newState = Object.assign({}, state, {status: PENDING});

      return newState;
    }
    case CHANGE_CURRENT_SPORT: {
      const {sport} = action;
      const newStatus = Object.assign({}, state, {data: sport, status: FULFILLED});
      return newStatus;
    }
    case CLEAR_CURRENT_SPORT:
      return {data: {}};
    case CLEAR_SPORTS_RELATED_STORES: {
      return initialState;
    }
    default:
      return state;
  }
}
