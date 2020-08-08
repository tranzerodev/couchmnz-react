import {UPDATE_SERVICES, CLEAR_SERVICES, SET_SERVICES, UPDATE_SERVICE} from '../constants/ActionTypes';

const initialState = [];

const isExistingItem = (array, id) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      return true;
    }
  }
  return false;
};

export default function training(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SERVICE: {
      const newService = Object.assign({}, action.service);
      const _state = Object.assign([], state);
      const service = Object.assign({}, {
        id: newService.id,
        name: newService.name
      });
      return Object.assign([], newService.checked ? isExistingItem(state, newService.id) ? _state.filter(training => training !== newService.name) : _state.concat(service) : _state.filter(training => training.id !== newService.id));
    }
    case SET_SERVICES: {
      const {services} = action;
      return services;
    }
    case CLEAR_SERVICES:
      return initialState;
    default:
      return state;
  }
}
