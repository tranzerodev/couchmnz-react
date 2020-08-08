import {
  CLEAR_SPORT_EXPERIENCE_YEAR,
  FETCH_SPORT_EXPERIENCE_YEAR,
  FULFILLED,
  REJECTED,
  PENDING,
  SAVE_SPORT_EXPERIENCE_YEAR,
  DELETE_SPORT_EXPERIENCE_YEAR
} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';

const sportExperienceYear = (state = {data: []}, action) => {
  switch (action.type) {
    case FETCH_SPORT_EXPERIENCE_YEAR + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : Object.assign({}, state, {data: [], status: REJECTED});
    case SAVE_SPORT_EXPERIENCE_YEAR + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : state;
    case DELETE_SPORT_EXPERIENCE_YEAR + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : action.payload.data.responseCode === appConstants.responseCodes.emptyPayload ? Object.assign({}, {data: [], status: FULFILLED}) : state;
    case FETCH_SPORT_EXPERIENCE_YEAR + PENDING : return {data: [], status: PENDING};
    case FETCH_SPORT_EXPERIENCE_YEAR + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_SPORT_EXPERIENCE_YEAR: return {};
    default: return state;
  }
};

export default sportExperienceYear;
