import {UPDATE_DEFAULT_SESSION, CLEAR_SESSION, FETCH_SESSIONS_NEW, FULFILLED, REJECTED, PENDING} from '../../../../constants/ActionTypes';

const initialState = {data: []};

export default function sessionsNew(state = initialState, action) {
  switch (action.type) {
    case FETCH_SESSIONS_NEW + FULFILLED: {
      const data = action.payload.data.responseCode === 0 ? action.payload.data.payload : [];
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    case FETCH_SESSIONS_NEW + PENDING : return {data: [], status: PENDING};
    case FETCH_SESSIONS_NEW + REJECTED : return {data: [], status: REJECTED};
    case UPDATE_DEFAULT_SESSION: {
      const {id} = action.profile;
      return Object.assign({}, {...state, data: state.data.map(session => session.id === id ? {...session, defaultSession: 'Y'} : {...session, defaultSession: 'N'})});
    }
    case CLEAR_SESSION:
      return initialState;
    default:
      return state;
  }
}
