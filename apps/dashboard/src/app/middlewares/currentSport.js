import {
  updateCurrentSport
} from '../actions';

import {
  UPDATE_SPORT,
  UPDATE_SKILLLEVEL,
  UPDATE_AGE,
  UPDATE_TRAINING,
  UPDATE_GENDER,
  UPDATE_LISTING,
  UPDATE_PRICE,
  UPDATE_SKILLLEVELS_PRICING,
  ADD_AGES_PRICING,
  ADD_SKILLLEVELS_PRICING,
  UPDATE_AGES_PRICING,
  ADD_DISCOUNT,
  CLEAR_PRICES,
  REMOVE_DISCOUNT,
  ADD_LOCATION,
  UPDATE_TRAVEL_PREFERENCES,
  REMOVE_LOCATION,
  UPDATE_OFFER_TERMINOLOGY,
  UPDATE_DEGREE,
  UPDATE_CERTIFICATION,
  UPDATE_SPECIALIZATION,
  ACTIVATE_DISCOUNT,
  ADD_SPORTS_DEGREE,
  ADD_NEW_SPORT_CERTIFICATION,
  ADD_NEW_SPORTS_AFFILIATION,
  REMOVE_SPORTS_AFFILIATION,
  ADD_NEW_SPORT_TOOL,
  REMOVE_SPORTS_TOOL
} from '../constants/ActionTypes';
/* eslint complexity: 0 */

const updateSport = store => next => action => {
  next(action);
  switch (action.type) {
    case UPDATE_SPORT:
    case ADD_SPORTS_DEGREE:
    case UPDATE_SKILLLEVEL:
    case UPDATE_AGE:
    case UPDATE_TRAINING:
    case UPDATE_GENDER:
    case UPDATE_LISTING:
    case UPDATE_PRICE:
    case UPDATE_SKILLLEVELS_PRICING:
    case ADD_AGES_PRICING:
    case ADD_SKILLLEVELS_PRICING:
    case UPDATE_AGES_PRICING:
    case ADD_DISCOUNT:
    case CLEAR_PRICES:
    case REMOVE_DISCOUNT:
    case ADD_LOCATION:
    case UPDATE_TRAVEL_PREFERENCES:
    case REMOVE_LOCATION:
    case UPDATE_DEGREE:
    case UPDATE_CERTIFICATION:
    case UPDATE_SPECIALIZATION:
    case UPDATE_OFFER_TERMINOLOGY:
    case ADD_NEW_SPORT_CERTIFICATION:
    case ADD_NEW_SPORTS_AFFILIATION:
    case REMOVE_SPORTS_AFFILIATION:
    case ADD_NEW_SPORT_TOOL:
    case REMOVE_SPORTS_TOOL:
    case ACTIVATE_DISCOUNT: {
      const {ages, certifications, sportsDegrees, gender, listing, locations, prices, profile, skillLevels, sport,
        training, travelPreferences, sspValidation, services, awards, tools, sportsAffiliation, sportsTools} = store.getState();

      const currentSport = {
        id: sport.id,
        name: sport.name,
        headline: sspValidation.listing.valid && listing && listing.headline ? listing.headline : (profile.data.summary && profile.data.summary.headline) ? profile.data.summary.headline : null,
        description: sspValidation.listing.valid && listing && listing.description ? listing.description : (profile.data.summary && profile.data.summary.description) ? profile.data.summary.description : null,
        aboutMe: sspValidation.listing.valid && listing && listing.bio ? listing.bio : (profile.data.summary && profile.data.summary.aboutMe) ? profile.data.summary.aboutMe : null,
        offerTerminology: sport.offerTerminology,
        coachingExperience: sport.coachingExperience,
        playingExperience: sport.playingExperience,
        specializations: sport.specializations,
        subSSPTypes: training && training.length ? training : [],
        prerequisites: {
          ages: ages && ages.length ? ages : [],
          skillLevels: skillLevels && skillLevels.length ? skillLevels : [],
          gender: gender && gender.length ? gender : [],
          otherServices: services && services.length ? services : []
        },
        pricePerSession: {
          subSSPTypes: prices && prices.length ? prices : []
        },
        travelPreferences,
        trainingLocations: locations && locations.data && locations.data.length ? locations.data : [],
        certifications,
        univDegrees: sportsDegrees,
        awards: awards && awards.length && awards[0] && awards[0].id !== '' ? awards : [],
        affiliations: sportsAffiliation,
        tools: sportsTools
      };
      store.dispatch(updateCurrentSport({
        data: currentSport,
        status: '_FULFILLED'
      }));
      break;
    }
    default: break;
  }
};

export default updateSport;
