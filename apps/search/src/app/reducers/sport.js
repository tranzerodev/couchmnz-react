import {UPDATE_SPORT, UPDATE_SPECIALIZATION, ADD_NEW_SPORT, UPDATE_OFFER_TERMINOLOGY, SET_SPORTS_STORE} from '../constants/ActionTypes';
import config from '../config';

const initialState = {};

const handleSpecializationSearch = (specializations, id) => {
  for (let i = 0; i < specializations.length; i++) {
    if (specializations[i].id === id) {
      return true;
    }
  }
  return false;
};

export default function sports(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SPORT: {
      const {profile} = action;
      const _state = Object.assign({}, state, profile);
      /* If (_state.offerTerminology === undefined) {
        _state.offerTerminology = config.offerTerminologies.Session;
      } */
      if (_state.certifications === undefined) {
        _state.certifications = [];
      }
      if (_state.specializations === undefined) {
        _state.specializations = [];
      }
      return Object.assign({}, _state);
    }
    case ADD_NEW_SPORT: {
      return Object.assign({}, {
        id: '',
        name: '',
        specializations: [],
        offerTerminology: config.offerTerminologies.Session
      });
    }
    case UPDATE_SPECIALIZATION: {
      const {specialization} = action;
      const {id, checked} = specialization;

      let sport = Object.assign({}, state);
      let specializations = sport.specializations ? sport.specializations : [];
      if (checked) {
        if (!handleSpecializationSearch(state.specializations, id)) {
          const {id, name} = specialization;
          specializations = Object.assign([], specializations.concat({
            id,
            name
          }));
        }
      } else {
        specializations = Object.assign([], specializations.filter(spec => spec.id !== specialization.id));
      }
      sport = Object.assign({}, sport, {specializations});
      const _state = Object.assign({}, sport);
      return Object.assign({}, _state);
    }
    case UPDATE_OFFER_TERMINOLOGY: {
      const {terminology} = action.data;
      const sport = Object.assign({}, state);
      console.log('Sport', sport);
      if (sport) {
        sport.offerTerminology = terminology;
      }
      return sport;
    }
    case SET_SPORTS_STORE: {
      const {sport} = action;
      const _state = Object.assign({}, state, sport);
      /* If (_state.offerTerminology === undefined) {
        _state.offerTerminology = config.offerTerminologies.Session;
      } */
      if (_state.certifications === undefined) {
        _state.certifications = [];
      }
      if (_state.specializations === undefined) {
        _state.specializations = [];
      }
      return Object.assign({}, _state);
    }
    default:
      return state;
  }
}
