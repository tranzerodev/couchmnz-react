import {
  CLEAR_GEN_EXPERIENCE,
  FETCH_GEN_EXPERIENCE,
  FULFILLED,
  REJECTED,
  PENDING,
  SAVE_GEN_EXPERIENCE,
  DELETE_GEN_EXPERIENCE
} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';

const genExperience = (state = {data: []}, action) => {
  switch (action.type) {
    case FETCH_GEN_EXPERIENCE + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : Object.assign({}, state, {data: [], status: REJECTED});
    case SAVE_GEN_EXPERIENCE + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : state;
    case DELETE_GEN_EXPERIENCE + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : action.payload.data.responseCode === appConstants.responseCodes.emptyPayload ? Object.assign({}, {data: [], status: FULFILLED}) : state;
    case FETCH_GEN_EXPERIENCE + PENDING : return {data: [], status: PENDING};
    case FETCH_GEN_EXPERIENCE + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_GEN_EXPERIENCE: return {};
    default: return state;
  }
};

export default genExperience;
