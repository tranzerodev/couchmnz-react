import {fetchCitiesCountry} from '../actions';
import {FULFILLED, FETCH_STATES} from '../constants/ActionTypes';
const setStore = store => next => action => {
  next(action);
  switch (action.type) {
    case FETCH_STATES + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        if (action.payload.data.payload.states && action.payload.data.payload.states.length) {
          break;
        }
        if (action.payload.data.payload.countryID) {
          store.dispatch(fetchCitiesCountry({id: action.payload.data.payload.countryID}));
        }
      }
      break;
    }
    default:break;
  }
};

export default setStore;
