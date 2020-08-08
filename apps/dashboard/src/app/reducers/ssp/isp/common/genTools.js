import {
  CLEAR_GEN_TOOLS,
  FETCH_GEN_TOOLS,
  FULFILLED,
  REJECTED,
  PENDING,
  SAVE_GEN_TOOL,
  DELETE_GEN_TOOL
} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';

const genTools = (state = {data: []}, action) => {
  switch (action.type) {
    case FETCH_GEN_TOOLS + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : Object.assign({}, state, {data: [], status: REJECTED});
    case SAVE_GEN_TOOL + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : state;
    case DELETE_GEN_TOOL + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : action.payload.data.responseCode === appConstants.responseCodes.emptyPayload ? Object.assign({}, {data: [], status: FULFILLED}) : state;
    case FETCH_GEN_TOOLS + PENDING : return {data: [], status: PENDING};
    case FETCH_GEN_TOOLS + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_GEN_TOOLS: return {};
    default: return state;
  }
};

export default genTools;
// Import {SET_GEN_TOOLS, ADD_NEW_GEN_TOOL, REMOVE_GEN_TOOL, CLEAR_GEN_TOOLS} from '../../../../constants/ActionTypes';

// const initialState = [];

// export default function awards(state = initialState, action) {
//   switch (action.type) {
//     case SET_GEN_TOOLS: {
//       const {data} = action;
//       return data;
//     }
//     case ADD_NEW_GEN_TOOL: {
//       const {data} = action;
//       const _state = Object.assign([], state);
//       _state.push(data);
//       return _state;
//     }
//     case REMOVE_GEN_TOOL: {
//       const {index} = action;
//       const items = [
//         ...state.slice(0, index),
//         ...state.slice(index + 1)
//       ];
//       return items;
//     }
//     case CLEAR_GEN_TOOLS:
//       return initialState;
//     default:
//       return state;
//   }
// }
