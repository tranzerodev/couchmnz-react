import {
  CLEAR_GEN_ACCOMPLISHMENTS,
  FETCH_GEN_ACCOMPLISHMENTS,
  FULFILLED,
  REJECTED,
  PENDING,
  DELETE_GEN_ACCOMPLISHMENT,
  SAVE_GEN_ACCOMPLISHMENT
} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';

const genAccomplishments = (state = {data: []}, action) => {
  switch (action.type) {
    case FETCH_GEN_ACCOMPLISHMENTS + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : Object.assign({}, state, {data: [], status: REJECTED});
    case SAVE_GEN_ACCOMPLISHMENT + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : state;
    case DELETE_GEN_ACCOMPLISHMENT + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : action.payload.data.responseCode === appConstants.responseCodes.emptyPayload ? Object.assign({}, {data: [], status: FULFILLED}) : state;
    case FETCH_GEN_ACCOMPLISHMENTS + PENDING : return {data: [], status: PENDING};
    case FETCH_GEN_ACCOMPLISHMENTS + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_GEN_ACCOMPLISHMENTS: return {};
    default: return state;
  }
};

export default genAccomplishments;
