import {FETCH_USER_IDS, FULFILLED, REJECTED, PENDING, CREATE_NEW_PROFILE} from '../constants/ActionTypes';
const initialState = {data: {}, status: null};
const userIDs = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_IDS + FULFILLED : {
      const userIDs = {data: action.payload.data.payload, status: FULFILLED};
      return userIDs;
    }
    case FETCH_USER_IDS + PENDING : {
      const userIDs = {data: {}, status: PENDING};
      return userIDs;
    }
    case FETCH_USER_IDS + REJECTED : {
      const userIDs = {data: {}, status: REJECTED};
      return userIDs;
    }
    case CREATE_NEW_PROFILE + FULFILLED: {
      let userIDs = {};
      if (action.payload.data.responseCode > 0) {
        userIDs = {data: {}, status: REJECTED};
      } else {
        userIDs = {data: action.payload.data.payload, status: FULFILLED};
      }
      return userIDs;
    }
    case CREATE_NEW_PROFILE + PENDING : {
      const userIDs = {data: {}, status: PENDING};
      return userIDs;
    }
    default:
      return state;
  }
};

export default userIDs;

