import {PENDING, SIGN_UP, FULFILLED, REJECTED, CHECK_EMAIL_AVAILABILITY} from '../../constants/ActionTypes';

const initialState = {
  data: {},
  status: null,
  email: '',
  emailAvailability: {
    email: '',
    isExist: false
  },
  displayMessage: ''
};
const signUp = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP + PENDING : {
      return Object.assign({}, state, {status: PENDING});
    }
    case SIGN_UP + FULFILLED : {
      const {payload, responseCode, developerMessage} = action.payload.data;
      if (responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED, displayMessage: developerMessage});
      }
      return Object.assign({}, state, {status: FULFILLED, data: payload});
    }
    case SIGN_UP + REJECTED : {
      return Object.assign({}, state, {status: REJECTED});
    }
    case CHECK_EMAIL_AVAILABILITY + FULFILLED : {
      if (action.payload.data.responseCode === 0) {
        return Object.assign({}, state, {emailAvailability: action.payload.data.payload});
      }
      return Object.assign({}, state, {emailAvailability: {
        email: '',
        isExist: false
      }});
    }
    default:
      return state;
  }
};

export default signUp;

