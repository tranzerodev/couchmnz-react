import {UPDATE_EVENT, CLEAR_EVENTS, ADD_EVENTS, REMOVE_EVENT, FETCH_EVENTS, FULFILLED, PENDING, REJECTED,
  UPDATE_OVERRIDE_SESSION_LENGTH, UPDATE_OVERRIDE_BUFFER_LENGTH} from '../constants/ActionTypes';

const initialState = {data: []};

const handleEventSearch = (events, id) => {
  const index = events.findIndex(event => event.id === id);
  return index >= 0 ? index : -1;
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EVENT: {
      const {profile} = action;
      const index = handleEventSearch(state.data, profile.id);
      const _state = Object.assign([], state.data);
      _state[index] = Object.assign({}, _state[index], profile);
      return Object.assign({...state, data: _state});
    }
    case ADD_EVENTS: {
      const {events} = action;
      return Object.assign({...state, data: state.data.concat(events)});
    }
    case REMOVE_EVENT: {
      const {profile} = action;
      return Object.assign({...state, data: state.data.filter(event => event.id !== profile.id)});
    }
    case UPDATE_OVERRIDE_SESSION_LENGTH: {
      const {sessionID, overrideSessionLength} = action.profile;
      console.log('sessionID', sessionID, 'overrideSessionLength', overrideSessionLength);
      return Object.assign({}, {...state, data: state.data.map(event => event.session.id === sessionID ? {...event, overrideSessionLength} : event)});
    }
    case UPDATE_OVERRIDE_BUFFER_LENGTH: {
      const {sessionID, overrideBufferLength} = action.profile;
      console.log('sessionID', sessionID, 'overrideBufferLength', overrideBufferLength);
      return Object.assign({}, {...state, data: state.data.map(event => event.session.id === sessionID ? {...event, overrideBufferLength} : event)});
    }
    case FETCH_EVENTS + FULFILLED: {
      const payload = action.payload.data.responseCode === 0 ? action.payload.data.payload : [];
      const data = payload.map(event => {
        return {
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        };
      });
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    case FETCH_EVENTS + PENDING : return {data: [], status: PENDING};
    case FETCH_EVENTS + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_EVENTS:
      return initialState;
    default:
      return state;
  }
}
