import {
  CLEAR_SPORT_AFFILIATIONS,
  FETCH_SPORT_AFFILIATIONS,
  FULFILLED,
  REJECTED,
  PENDING,
  SAVE_SPORT_AFFILIATION,
  DELETE_SPORT_AFFILIATION
} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';

const sportAffiliations = (state = {data: []}, action) => {
  switch (action.type) {
    case FETCH_SPORT_AFFILIATIONS + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : Object.assign({}, state, {data: [], status: REJECTED});
    case SAVE_SPORT_AFFILIATION + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : state;
    case DELETE_SPORT_AFFILIATION + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : action.payload.data.responseCode === appConstants.responseCodes.emptyPayload ? Object.assign({}, {data: [], status: FULFILLED}) : state;
    case FETCH_SPORT_AFFILIATIONS + PENDING : return {data: [], status: PENDING};
    case FETCH_SPORT_AFFILIATIONS + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_SPORT_AFFILIATIONS: return {};
    default: return state;
  }
};

export default sportAffiliations;
// Import {SET_SPORTS_AFFILIATION, ADD_NEW_SPORTS_AFFILIATION, REMOVE_SPORTS_AFFILIATION, CLEAR_SPORTS_AFFILIATION, CLEAR_SPORTS_RELATED_STORES} from '../../../../constants/ActionTypes';

// const initialState = [];

// export default function sportsAffiliation(state = initialState, action) {
//   switch (action.type) {
//     case SET_SPORTS_AFFILIATION: {
//       const {data} = action;
//       return data;
//     }
//     case ADD_NEW_SPORTS_AFFILIATION: {
//       const {data} = action;
//       const _state = Object.assign([], state);
//       _state.push(data);
//       return _state;
//     }
//     case REMOVE_SPORTS_AFFILIATION: {
//       const {index} = action;
//       const items = [
//         ...state.slice(0, index),
//         ...state.slice(index + 1)
//       ];
//       return items;
//     }
//     case CLEAR_SPORTS_RELATED_STORES: {
//       return initialState;
//     }
//     case CLEAR_SPORTS_AFFILIATION:
//       return initialState;
//     default:
//       return state;
//   }
// }
