import {ISP_FETCH_SPORTS_LIST, FULFILLED, PENDING, REJECTED, DEACTIVATE_SPORT, ACTIVATE_SPORT} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';

const initialState = {data: [], status: null};

export default function workingDays(state = initialState, action) {
  switch (action.type) {
    case ISP_FETCH_SPORTS_LIST + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
    }
    case ISP_FETCH_SPORTS_LIST + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case ISP_FETCH_SPORTS_LIST + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case DEACTIVATE_SPORT + FULFILLED: {
      {
        let newState = Object.assign({}, state);
        if (action.payload.data.responseCode === 0) {
          const sport = action.payload.data.payload;
          if (sport && sport.id) {
            const data = newState.data.map(service => {
              if (sport.id !== service.sportId) {
                return service;
              }
              return {
                ...service,
                isActive: appConstants.sportsActiveFlages.inactive
              };
            });
            newState = Object.assign({}, newState, {data});
          }
        }
        return newState;
      }
    }
    case ACTIVATE_SPORT + FULFILLED: {
      let newState = Object.assign({}, state);
      if (action.payload.data.responseCode === 0) {
        const sport = action.payload.data.payload;
        if (sport && sport.id) {
          const data = newState.data.map(service => {
            if (sport.id !== service.sportId) {
              return service;
            }
            return {
              ...service,
              isActive: appConstants.sportsActiveFlages.active
            };
          });
          newState = Object.assign({}, newState, {data});
        }
      }
      return newState;
    }
    default:
      return state;
  }
}
