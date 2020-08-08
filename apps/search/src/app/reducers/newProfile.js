import {SET_NEW_PROFILE} from '../constants/ActionTypes';
const initialState = {};
const newProfile = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_PROFILE: {
      const {newProfileType} = action;
      return newProfileType;
    }
    default:
      return state;
  }
};

export default newProfile;

