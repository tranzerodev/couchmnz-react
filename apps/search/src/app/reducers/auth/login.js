import {PENDING, LOGIN, FULFILLED, REJECTED, SIGN_UP, LOGOUT} from '../../constants/ActionTypes';

const initialState = {
  data: {},
  status: null,
  email: '',
  displayMessage: '',
  responseCode: 0
};
const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN + PENDING : {
      return Object.assign({}, state, {email: action.meta, status: PENDING});
    }
    case LOGIN + FULFILLED : {
      const {payload, responseCode, developerMessage} = action.payload.data;
      if (responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED, displayMessage: developerMessage, responseCode});
      }
      return Object.assign({}, state, {status: FULFILLED, data: payload});
    }
    case LOGIN + REJECTED : {
      return Object.assign({}, state, {status: REJECTED});
    }
    case SIGN_UP + PENDING : {
      return Object.assign({}, state, {email: action.meta, status: PENDING});
    }
    case LOGOUT : {
      if (state.status === FULFILLED) {
        return initialState;
      }
      return state;
    }
    default:
      return state;
  }
};

export default login;

