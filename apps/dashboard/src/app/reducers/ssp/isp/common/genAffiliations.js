import {
  CLEAR_GEN_AFFILIATIONS,
  FETCH_GEN_AFFILIATIONS,
  FULFILLED,
  REJECTED,
  PENDING,
  SAVE_GEN_AFFILIATION,
  DELETE_GEN_AFFILIATION
} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';

const genAffiliations = (state = {data: []}, action) => {
  switch (action.type) {
    case FETCH_GEN_AFFILIATIONS + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : Object.assign({}, state, {data: [], status: REJECTED});
    case SAVE_GEN_AFFILIATION + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : state;
    case DELETE_GEN_AFFILIATION + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : action.payload.data.responseCode === appConstants.responseCodes.emptyPayload ? Object.assign({}, {data: [], status: FULFILLED}) : state;
    case FETCH_GEN_AFFILIATIONS + PENDING : return {data: [], status: PENDING};
    case FETCH_GEN_AFFILIATIONS + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_GEN_AFFILIATIONS: return {};
    default: return state;
  }
};

export default genAffiliations;

// Import {SET_GEN_AFFILIATION, ADD_NEW_GEN_AFFILIATION, REMOVE_GEN_AFFILIATION, CLEAR_GEN_AFFILIATION} from '../../../../constants/ActionTypes';

// const initialState = [];

// export default function genAffiliations(state = initialState, action) {
//   switch (action.type) {
//     case SET_GEN_AFFILIATION: {
//       const {data} = action;
//       return data;
//     }
//     case ADD_NEW_GEN_AFFILIATION: {
//       const {data} = action;
//       const _state = Object.assign([], state);
//       _state.push(data);
//       return _state;
//     }
//     case REMOVE_GEN_AFFILIATION: {
//       const {index} = action;
//       const items = [
//         ...state.slice(0, index),
//         ...state.slice(index + 1)
//       ];
//       return items;
//     }
//     case CLEAR_GEN_AFFILIATION:
//       return initialState;
//     default:
//       return state;
//   }
// }
