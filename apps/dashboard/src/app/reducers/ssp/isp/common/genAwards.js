import {
  CLEAR_GEN_AWARDS,
  FETCH_GEN_AWARDS,
  FULFILLED,
  REJECTED,
  PENDING,
  SAVE_GEN_AWARD,
  DELETE_GEN_AWARD
} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';

const genAwards = (state = {data: []}, action) => {
  switch (action.type) {
    case FETCH_GEN_AWARDS + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : Object.assign({}, state, {data: [], status: REJECTED});
    case SAVE_GEN_AWARD + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : state;
    case DELETE_GEN_AWARD + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : action.payload.data.responseCode === appConstants.responseCodes.emptyPayload ? Object.assign({}, {data: [], status: FULFILLED}) : state;
    case FETCH_GEN_AWARDS + PENDING : return {data: [], status: PENDING};
    case FETCH_GEN_AWARDS + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_GEN_AWARDS: return {};
    default: return state;
  }
};

export default genAwards;
// Import {SET_GEN_AWARDS, ADD_NEW_GEN_AWARD, REMOVE_GEN_AWARD, CLEAR_GEN_AWARDS} from '../../../../constants/ActionTypes';

// const initialState = [];

// export default function awards(state = initialState, action) {
//   switch (action.type) {
//     case SET_GEN_AWARDS: {
//       const {data} = action;
//       return data;
//     }
//     case ADD_NEW_GEN_AWARD: {
//       const {data} = action;
//       const _state = Object.assign([], state);
//       _state.push(data);
//       return _state;
//     }
//     case REMOVE_GEN_AWARD: {
//       const {index} = action;
//       const items = [
//         ...state.slice(0, index),
//         ...state.slice(index + 1)
//       ];
//       return items;
//     }
//     case CLEAR_GEN_AWARDS:
//       return initialState;
//     default:
//       return state;
//   }
// }
