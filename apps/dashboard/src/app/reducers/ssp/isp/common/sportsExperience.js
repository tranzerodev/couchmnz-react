import {
  CLEAR_SPORT_EXPERIENCE,
  FETCH_SPORT_EXPERIENCE,
  FULFILLED,
  REJECTED,
  PENDING,
  SAVE_SPORT_EXPERIENCE,
  DELETE_SPORT_EXPERIENCE
} from '../../../../constants/ActionTypes';
import appConstants from '../../../../constants/appConstants';

const initialState = [
  {
    type: 'coaching',
    description: []
  },
  {
    type: 'playing',
    description: []
  }
];

const sportExperience = (state = {data: initialState}, action) => {
  switch (action.type) {
    case FETCH_SPORT_EXPERIENCE + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : Object.assign({}, state, {data: initialState, status: REJECTED});
    case SAVE_SPORT_EXPERIENCE + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : state;
    case DELETE_SPORT_EXPERIENCE + FULFILLED: return action.payload.data.responseCode === appConstants.responseCodes.success ? Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED}) : action.payload.data.responseCode === appConstants.responseCodes.emptyPayload ? Object.assign({}, {data: initialState, status: FULFILLED}) : state;
    case FETCH_SPORT_EXPERIENCE + PENDING : return {data: initialState, status: PENDING};
    case FETCH_SPORT_EXPERIENCE + REJECTED : return {data: initialState, status: REJECTED};
    case CLEAR_SPORT_EXPERIENCE: return {};
    default: return state;
  }
};

export default sportExperience;
