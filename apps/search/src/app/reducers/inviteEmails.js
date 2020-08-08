import {FULFILLED, REJECTED, INVITE_USERS} from '../constants/ActionTypes';
const initialState = {};
const inviteEmails = (state = initialState, action) => {
  switch (action.type) {
    case INVITE_USERS + FULFILLED : {
      const inviteUsers = action.payload.data;
      return inviteUsers;
    }
    case INVITE_USERS + REJECTED : {
      const inviteUsers = {};
      return inviteUsers;
    }
    default:
      return state;
  }
};

export default inviteEmails;

