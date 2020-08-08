import {CHANGE_SELECTED_PROFILE} from '../constants/ActionTypes';

const initialState = {
  id: null
};
export default function searchData(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SELECTED_PROFILE: {
      const {selectedProfile} = action;
      return Object.assign({}, state, selectedProfile);
    }

    default:
      return state;
  }
}

