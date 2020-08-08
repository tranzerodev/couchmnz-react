import {UPDATE_SESSION_NAME, CLEAR_SESSION_NAME} from '../../../../constants/ActionTypes';

const initialState = 'Session';

export default function sessionName(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SESSION_NAME: {
      const {profile} = action;
      const {name} = profile;
      return name.toString();
    }
    case CLEAR_SESSION_NAME:
      return initialState.toString();
    default:
      return state;
  }
}
