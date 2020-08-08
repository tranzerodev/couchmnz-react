import {UPDATE_NEW_AFFILIATION, CLEAR_NEW_AFFILIATION} from '../constants/ActionTypes';

const initialState = {
  id: '',
  name: ''
};

export default function award(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NEW_AFFILIATION: {
      const {updatedData} = action;
      return Object.assign({}, state, updatedData);
    }
    case CLEAR_NEW_AFFILIATION:
      return initialState;
    default:
      return state;
  }
}
