import {
  CLEAR_SPORT_ACCOMPLISHMENTS,
  FETCH_SPORT_ACCOMPLISHMENTS,
  FULFILLED,
  REJECTED,
  PENDING,
  SAVE_SPORT_ACCOMPLISHMENT,
  DELETE_SPORT_ACCOMPLISHMENT
} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';

const sportAccomplishments = (state = {data: []}, action) => {
  switch (action.type) {
    case FETCH_SPORT_ACCOMPLISHMENTS + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : Object.assign({}, state, {data: [], status: REJECTED});
    case SAVE_SPORT_ACCOMPLISHMENT + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : state;
    case DELETE_SPORT_ACCOMPLISHMENT + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : action.payload.data.responseCode === appConstants.responseCodes.emptyPayload ? Object.assign({}, {data: [], status: FULFILLED}) : state;
    case FETCH_SPORT_ACCOMPLISHMENTS + PENDING : return {data: [], status: PENDING};
    case FETCH_SPORT_ACCOMPLISHMENTS + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_SPORT_ACCOMPLISHMENTS: return {};
    default: return state;
  }
};

export default sportAccomplishments;
