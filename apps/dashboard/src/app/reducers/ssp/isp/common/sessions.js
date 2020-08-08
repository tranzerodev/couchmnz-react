import {UPDATE_SESSION, UPDATE_DEFAULT_SESSION, CLEAR_SESSION, SET_SESSIONS, ADD_SESSION, REMOVE_SESSION, FETCH_SESSIONS, FULFILLED, REJECTED, PENDING} from '../../../../constants/ActionTypes';

const initialState = {data: []};

const handleSessionSearch = (sessions, id) => {
  const index = sessions.findIndex(session => session.id === id);
  return index >= 0 ? index : -1;
};

export default function sessions(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SESSION: {
      const {profile} = action;
      const index = handleSessionSearch(state.data, profile.id);
      const _state = Object.assign([], state.data);
      _state[index] = Object.assign({}, _state[index], profile);
      return Object.assign({...state, data: _state});
    }
    case ADD_SESSION: {
      const {profile} = action;
      const _state = Object.assign([], state.data);
      _state.push(profile);
      return Object.assign({...state, data: _state});
    }
    case REMOVE_SESSION: {
      const {profile} = action;
      return Object.assign({...state, data: state.data.filter(session => session.id !== profile.id)});
    }
    case SET_SESSIONS: {
      const {profile} = action;
      return Object.assign({...state, data: state.concat(profile)});
    }
    case FETCH_SESSIONS + FULFILLED: {
      const data = action.payload.data.responseCode === 0 ? action.payload.data.payload : [];
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    case FETCH_SESSIONS + PENDING : return {data: [], status: PENDING};
    case FETCH_SESSIONS + REJECTED : return {data: [], status: REJECTED};
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
