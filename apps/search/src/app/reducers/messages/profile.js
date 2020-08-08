import {CHANGE_MESSAGING_PROFILE} from '../../constants/ActionTypes';
const initialState = {
  id: '1451214435',
  type: null,
  displayName: null
};
const profile = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MESSAGING_PROFILE: {
      const {profile} = action;
      return profile;
    }
    default:
      return state;
  }
};

export default profile;
