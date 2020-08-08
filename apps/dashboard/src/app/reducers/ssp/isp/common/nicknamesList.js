import {FULFILLED, REJECTED, PENDING, FETCH_NICKNAMES} from '../../../../constants/ActionTypes';
const initialState = {data: [], status: null};
const nicknamesList = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NICKNAMES + FULFILLED : {
      const nicknames = {data: action.payload.data.payload, status: FULFILLED};
      return nicknames;
    }
    case FETCH_NICKNAMES + PENDING : {
      const nicknames = {data: [], status: PENDING};
      return nicknames;
    }
    case FETCH_NICKNAMES + REJECTED : {
      const nicknames = {data: [], status: REJECTED};
      return nicknames;
    }
    default:
      return state;
  }
};

export default nicknamesList;

