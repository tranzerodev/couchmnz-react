import {PENDING, FULFILLED, REJECTED, FETCH_ATHLETE_PROFILE, FETCH_ATHLETE_PREFERENCES} from '../../../constants/ActionTypes';
import {Map as map} from 'immutable';
const initialState = {
  data: {},
  status: null
};

const getSport = (data, sport) => map(data).set(sport.id, sport);

export default function sportsMapping(state = initialState, action) {
  switch (action.type) {
    case FETCH_ATHLETE_PROFILE + PENDING: return Object.assign({}, state, {status: PENDING});
    case FETCH_ATHLETE_PROFILE + FULFILLED: {
      let newState;
      if (action.payload.data.responseCode > 0) {
        newState = Object.assign({}, state, {status: REJECTED});
      } else {
        const data = action.payload.data.payload.sports;
        let sportsMap = map();
        for (let i = 0; i < data.length; i++) {
          sportsMap = getSport(sportsMap, data[i]);
        }
        newState = Object.assign({}, state, {data: sportsMap.toJS(), status: FULFILLED});
      }
      return newState;
    }
    case FETCH_ATHLETE_PROFILE + REJECTED: return Object.assign({}, state, {status: REJECTED});
    case FETCH_ATHLETE_PREFERENCES + FULFILLED: {
      let newState = Object.assign({}, state);
      if (action.payload.data.responseCode === 0) {
        const sport = action.payload.data.payload;
        if (sport.id) {
          const {data} = state;
          const newData = map(data).set(sport.id, sport).toJS();
          newState = Object.assign({}, state, {data: newData});
        }
      }
      return newState;
    }
    default:
      return state;
  }
}
