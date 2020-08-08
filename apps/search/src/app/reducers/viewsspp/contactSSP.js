import {CONTACTSSP_DETAIL, FULFILLED, PENDING, REJECTED} from '../../constants/ActionTypes';

const initialState = {status: null};

export default function Data(state = initialState, action) {
  switch (action.type) {
    case CONTACTSSP_DETAIL + FULFILLED: {
      const newState = Object.assign({}, {status: FULFILLED});

      return (newState);
    }
    case CONTACTSSP_DETAIL + PENDING: {
      const status = PENDING;
      const newState = Object.assign({}, {status});
      return (newState);
    }
    case CONTACTSSP_DETAIL + REJECTED: {
      const status = REJECTED;
      const newState = Object.assign({}, {status});
      return (newState);
    }
    default:
      return state;
  }
}
