import {
  CLEAR_SPORT_AWARDS,
  FETCH_SPORT_AWARDS,
  FULFILLED,
  REJECTED,
  PENDING,
  SAVE_SPORT_AWARD,
  DELETE_SPORT_AWARD
} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';

const sportAwards = (state = {data: []}, action) => {
  switch (action.type) {
    case FETCH_SPORT_AWARDS + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : Object.assign({}, state, {data: [], status: REJECTED});
    case SAVE_SPORT_AWARD + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : state;
    case DELETE_SPORT_AWARD + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : action.payload.data.responseCode === appConstants.responseCodes.emptyPayload ? Object.assign({}, {data: [], status: FULFILLED}) : state;
    case FETCH_SPORT_AWARDS + PENDING : return {data: [], status: PENDING};
    case FETCH_SPORT_AWARDS + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_SPORT_AWARDS: return {};
    default: return state;
  }
};

export default sportAwards;
// Import {SET_SPORTS_AWARDS, ADD_SPORTS_AWARD, REMOVE_SPORTS_AWARD, CLEAR_SPORTS_AWARDS, CLEAR_SPORTS_RELATED_STORES} from '../../../../constants/ActionTypes';

// const initialState = [];

// export default function awards(state = initialState, action) {
//   switch (action.type) {
//     case SET_SPORTS_AWARDS: {
//       const {data} = action;
//       return data;
//     }
//     case ADD_SPORTS_AWARD: {
//       const {data} = action;
//       const _state = Object.assign([], state);
//       _state.push(data);
//       return _state;
//     }
//     case REMOVE_SPORTS_AWARD: {
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
//     case CLEAR_SPORTS_AWARDS:
//       return initialState;
//     default:
//       return state;
//   }
// }
