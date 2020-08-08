import {FETCH_SELECTED_THREAD, CLEAR_SELECTED_THREAD, FULFILLED, PENDING, REJECTED, GET_UPDATED_SELECTED_THREAD, FETCH_MESSAGE_THREADS} from '../../constants/ActionTypes';
const initialState = {
  data: null,
  status: ''
};
const selectedThread = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SELECTED_THREAD + PENDING : {
      const newState = Object.assign({}, initialState, {status: PENDING});
      return newState;
    }
    case FETCH_SELECTED_THREAD + FULFILLED : {
      const data = action.payload.data.payload;
      let newState = Object.assign({}, initialState, {status: FULFILLED}); // Need to remove this just fr message template demo
      if (data) {
        newState = Object.assign({}, {data, status: FULFILLED});
      }

      return newState;
    }
    case FETCH_SELECTED_THREAD + REJECTED : {
      const newState = Object.assign({}, initialState, {status: REJECTED});
      // Const newState = Object.assign({}, initialState, {status: FULFILLED});
      return newState;
    }
    case GET_UPDATED_SELECTED_THREAD + FULFILLED: {
      const data = action.payload.data.payload;
      const newState = Object.assign({}, {data});
      return newState;
    }
    case CLEAR_SELECTED_THREAD: {
      return initialState;
    }
    case FETCH_MESSAGE_THREADS + PENDING: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default selectedThread;
