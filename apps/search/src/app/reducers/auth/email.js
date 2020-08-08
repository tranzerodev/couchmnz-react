import {PENDING, CHECK_EMAIL_AVAILABILITY, FULFILLED, REJECTED} from '../../constants/ActionTypes';

const initialState = {
  data: {email: '',
    isExist: ''
  },
  status: ''
};

const emailAvailabilitty = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_EMAIL_AVAILABILITY + PENDING : {
      return Object.assign({}, state, {status: PENDING});
    }
    case CHECK_EMAIL_AVAILABILITY + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
    }
    case CHECK_EMAIL_AVAILABILITY + REJECTED : {
      return Object.assign({}, state, {status: REJECTED});
    }
    default:
      return state;
  }
};

export default emailAvailabilitty;

