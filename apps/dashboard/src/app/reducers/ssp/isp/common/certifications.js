import {
  CLEAR_SPORT_CERTIFICATIONS,
  FETCH_SPORT_CERTIFICATIONS,
  FULFILLED,
  REJECTED,
  PENDING,
  SAVE_SPORT_CERTIFICATION,
  DELETE_SPORT_CERTIFICATION
} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';

const sportCertifications = (state = {data: []}, action) => {
  switch (action.type) {
    case FETCH_SPORT_CERTIFICATIONS + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : Object.assign({}, state, {data: [], status: REJECTED});
    case SAVE_SPORT_CERTIFICATION + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : state;
    case DELETE_SPORT_CERTIFICATION + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : action.payload.data.responseCode === appConstants.responseCodes.emptyPayload ? Object.assign({}, {data: [], status: FULFILLED}) : state;
    case FETCH_SPORT_CERTIFICATIONS + PENDING : return {data: [], status: PENDING};
    case FETCH_SPORT_CERTIFICATIONS + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_SPORT_CERTIFICATIONS: return {};
    default: return state;
  }
};

export default sportCertifications;
// Import {SET_CERTIFICATIONS, ADD_NEW_SPORT_CERTIFICATION, REMOVE_SPORT_CERTIFICATION, CLEAR_CERTIFICATIONS, CLEAR_SPORTS_RELATED_STORES} from '../../../../constants/ActionTypes';

// const initialState = [];

// export default function certifications(state = initialState, action) {
//   switch (action.type) {
//     case SET_CERTIFICATIONS: {
//       const {certifications} = action;
//       return certifications;
//     }
//     case ADD_NEW_SPORT_CERTIFICATION: {
//       const {data} = action;
//       const _state = Object.assign([], state);
//       _state.push(data);
//       return _state;
//     }
//     case REMOVE_SPORT_CERTIFICATION: {
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
//     case CLEAR_CERTIFICATIONS:
//       return initialState;
//     default:
//       return state;
//   }
// }
