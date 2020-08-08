import {UPDATE_ATHLETE, CLEAR_ATHLETE} from '../../constants/ActionTypes';

const initialState = {
  gender: {
    list: [],
    dataType: 'boolShould'},
  age: {
    list: [],
    dataType: 'boolShould'},
  skillLevel: {
    list: [],
    dataType: 'boolShould'}
};

export default function athlete(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ATHLETE: {
      action.athlete.dataType = 'listBoolQuery';
      return Object.assign({}, state, action.athlete);
    }
    case CLEAR_ATHLETE:
      return initialState;
    default:
      return state;
  }
}
