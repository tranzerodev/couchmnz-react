import {
  CLEAR_GEN_DEGREES,
  FETCH_GEN_DEGREES,
  FULFILLED,
  REJECTED,
  PENDING,
  SAVE_GEN_DEGREE,
  DELETE_GEN_DEGREE
} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';

const genDegrees = (state = {data: []}, action) => {
  switch (action.type) {
    case FETCH_GEN_DEGREES + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : Object.assign({}, state, {data: [], status: REJECTED});
    case SAVE_GEN_DEGREE + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : state;
    case DELETE_GEN_DEGREE + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : action.payload.data.responseCode === appConstants.responseCodes.emptyPayload ? Object.assign({}, {data: [], status: FULFILLED}) : state;
    case FETCH_GEN_DEGREES + PENDING : return {data: [], status: PENDING};
    case FETCH_GEN_DEGREES + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_GEN_DEGREES: return {};
    default: return state;
  }
};

export default genDegrees;

// Import {UPDATE_DEGREE, CLEAR_DEGREES, ADD_NEW_DEGREE, SET_DEGREE, ADD_DEGREE, REMOVE_UNI_DEGREE} from '../../../../constants/ActionTypes';

// const initialState = [];

// export default function degrees(state = initialState, action) {
//   switch (action.type) {
//     case UPDATE_DEGREE: {
//       /* Console.log('action', action); */
//       const {profile, index} = action;
//       const _state = Object.assign([], state);
//       _state[index] = Object.assign({}, _state[index], profile);
//       /* Console.log('_state', _state); */
//       return Object.assign([], state, _state);
//     }
//     case ADD_NEW_DEGREE: {
//       return Object.assign([], state.concat({
//         id: '',
//         name: ''
//       }));
//     }
//     case SET_DEGREE: {
//       const {degree} = action;
//       return degree;
//     }
//     case ADD_DEGREE: {
//       const {data} = action;
//       const _state = Object.assign([], state);
//       _state.push(data);
//       return _state;
//     }
//     case REMOVE_UNI_DEGREE: {
//       const {index} = action;
//       const items = [
//         ...state.slice(0, index),
//         ...state.slice(index + 1)
//       ];
//       return items;
//     }
//     case CLEAR_DEGREES:
//       return initialState;
//     default:
//       return state;
//   }
// }
