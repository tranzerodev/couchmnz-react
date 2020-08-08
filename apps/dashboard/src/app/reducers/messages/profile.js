import {CHANGE_MESSAGING_PROFILE, CHANGE_PROFILE} from '../../constants/ActionTypes';
const initialState = {
  id: null,
  type: null,
  displayName: null
};
const profile = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MESSAGING_PROFILE: {
      const {profile} = action;
      const {id, type, displayName} = profile;
      return Object.assign({}, state, {id, type, displayName});
    }
    case CHANGE_PROFILE: {
      const {id, type, displayName} = action.profile;
      return Object.assign({}, state, {id, type, displayName});
    }
    default:
      return state;
  }
};

export default profile;
