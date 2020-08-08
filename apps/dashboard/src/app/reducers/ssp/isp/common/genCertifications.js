import {
  CLEAR_GEN_CERTIFICATIONS,
  FETCH_GEN_CERTIFICATIONS,
  FULFILLED,
  REJECTED,
  PENDING,
  SAVE_GEN_CERTIFICATION,
  DELETE_GEN_CERTIFICATION
} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';

const genCertifications = (state = {data: []}, action) => {
  switch (action.type) {
    case FETCH_GEN_CERTIFICATIONS + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : Object.assign({}, state, {data: [], status: REJECTED});
    case SAVE_GEN_CERTIFICATION + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : state;
    case DELETE_GEN_CERTIFICATION + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : action.payload.data.responseCode === appConstants.responseCodes.emptyPayload ? Object.assign({}, {data: [], status: FULFILLED}) : state;
    case FETCH_GEN_CERTIFICATIONS + PENDING : return {data: [], status: PENDING};
    case FETCH_GEN_CERTIFICATIONS + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_GEN_CERTIFICATIONS: return {};
    default: return state;
  }
};

export default genCertifications;
// Import {SET_GEN_CERTIFICATIONS, ADD_NEW_GEN_CERTIFICATION, REMOVE_GEN_CERTIFICATION, CLEAR_GEN_CERTIFICATIONS} from '../../../../constants/ActionTypes';

// const initialState = [];

// export default function certifications(state = initialState, action) {
//   switch (action.type) {
//     case SET_GEN_CERTIFICATIONS: {
//       const {certifications} = action;
//       return certifications;
//     }
//     case ADD_NEW_GEN_CERTIFICATION: {
//       const {data} = action;
//       const _state = Object.assign([], state);
//       _state.push(data);
//       return _state;
//     }
//     case REMOVE_GEN_CERTIFICATION: {
//       const {index} = action;
//       const items = [
//         ...state.slice(0, index),
//         ...state.slice(index + 1)
//       ];
//       return items;
//     }
//     case CLEAR_GEN_CERTIFICATIONS:
//       return initialState;
//     default:
//       return state;
//   }
// }
