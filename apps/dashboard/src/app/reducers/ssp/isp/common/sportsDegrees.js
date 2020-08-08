import {
  CLEAR_SPORT_DEGREES,
  FETCH_SPORT_DEGREES,
  FULFILLED,
  REJECTED,
  PENDING,
  SAVE_SPORT_DEGREE,
  DELETE_SPORT_DEGREE
} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';

const sportDegrees = (state = {data: []}, action) => {
  switch (action.type) {
    case FETCH_SPORT_DEGREES + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : Object.assign({}, state, {data: [], status: REJECTED});
    case SAVE_SPORT_DEGREE + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : state;
    case DELETE_SPORT_DEGREE + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : action.payload.data.responseCode === appConstants.responseCodes.emptyPayload ? Object.assign({}, {data: [], status: FULFILLED}) : state;
    case FETCH_SPORT_DEGREES + PENDING : return {data: [], status: PENDING};
    case FETCH_SPORT_DEGREES + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_SPORT_DEGREES: return {};
    default: return state;
  }
};

export default sportDegrees;
// Import {SET_SPORTS_DEGREE, ADD_SPORTS_DEGREE, CLEAR_SPORTS_DEGREES, REMOVE_SPORTS_DEGREE, CLEAR_SPORTS_RELATED_STORES} from '../../../../constants/ActionTypes';

// const initialState = [];

// export default function degrees(state = initialState, action) {
//   switch (action.type) {
//     case SET_SPORTS_DEGREE: {
//       const {data} = action;
//       return data;
//     }
//     case ADD_SPORTS_DEGREE: {
//       const {data} = action;
//       const _state = Object.assign([], state);
//       _state.push(data);
//       return _state;
//     }
//     case REMOVE_SPORTS_DEGREE: {
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
//     case CLEAR_SPORTS_DEGREES:
//       return initialState;
//     default:
//       return state;
//   }
// }
