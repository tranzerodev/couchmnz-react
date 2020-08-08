import {FETCH_PROFILE_SPORTS_MAPPING, PENDING, FULFILLED, REJECTED, FETCH_CURRENT_SPORT, DEACTIVATE_SPORT, ACTIVATE_SPORT, DELETE_SPORT} from '../../../../constants/ActionTypes';
import {Map as map} from 'immutable';
import appConstants from '../../../../constants/appConstants';
const initialState = {
  data: {},
  status: null
};

export default function sportsMapping(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE_SPORTS_MAPPING + PENDING: {
      const newState = Object.assign({}, state, {status: PENDING});
      return newState;
    }
    case FETCH_PROFILE_SPORTS_MAPPING + FULFILLED: {
      const data = action.payload.data.payload;
      let newState;
      if (action.payload.data.responseCode > 0) {
        newState = Object.assign({}, state, {status: REJECTED});
      } else {
        newState = Object.assign({}, state, {data, status: FULFILLED});
      }
      return newState;
    }
    case FETCH_PROFILE_SPORTS_MAPPING + REJECTED: {
      const newState = Object.assign({}, state, {status: REJECTED});
      return newState;
    }
    case ACTIVATE_SPORT + FULFILLED: {
      let newState = Object.assign({}, state);
      if (action.payload.data.responseCode === 0) {
        const sport = action.payload.data.payload;
        if (sport && sport.id) {
          const {data} = state;
          const updatedSport = Object.assign({}, data[sport.id], {isActive: appConstants.sportsActiveFlages.active});
          const newData = Object.assign({}, data, {[sport.id]: updatedSport});
          newState = Object.assign({}, state, {data: newData});
        }
      }
      return newState;
    }
    case DEACTIVATE_SPORT + FULFILLED: {
      {
        let newState = Object.assign({}, state);
        if (action.payload.data.responseCode === 0) {
          const sport = action.payload.data.payload;
          if (sport && sport.id) {
            const {data} = state;
            const updatedSport = Object.assign({}, data[sport.id], {isActive: appConstants.sportsActiveFlages.inactive});
            const newData = Object.assign({}, data, {[sport.id]: updatedSport});
            newState = Object.assign({}, state, {data: newData});
          }
        }
        return newState;
      }
    }
    case FETCH_CURRENT_SPORT + FULFILLED: {
      let newState = Object.assign({}, state);
      if (action.payload.data.responseCode === 0) {
        const sport = action.payload.data.payload;
        if (sport.id) {
          const {data} = state;
          const newData = Object.assign({}, data, {[sport.id]: sport});
          newState = Object.assign({}, state, {data: newData});
        }
      }
      return newState;
    }
    case DELETE_SPORT + FULFILLED: {
      const {payload} = action;
      if (payload.data.responseCode === 0 && payload.data.payload.id) {
        const newState = map(state.data).delete(payload.data.payload.id).toJS();
        return Object.assign({}, state, {data: newState});
      }
      return state;
    }

    default:
      return state;
  }
}
