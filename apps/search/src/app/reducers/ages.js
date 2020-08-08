import {UPDATE_AGE, CLEAR_AGES, SET_AGES} from '../constants/ActionTypes';

const initialState = [];

const isExistingItem = (array, id) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      return true;
    }
  }
  return false;
};

const ages = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AGE: {
      const newAge = Object.assign({}, action.age);
      const _state = Object.assign([], state);
      const age = Object.assign({}, {
        id: newAge.id,
        name: newAge.name
      });
      return Object.assign([], newAge.checked ? isExistingItem(state, newAge.id) ? _state.filter(age => age !== newAge.name) : _state.concat(age) : _state.filter(age => age.id !== newAge.id));
    }
    case SET_AGES: {
      const {ages} = action;
      return ages;
    }
    case CLEAR_AGES:
      return undefined;
    default:
      return state;
  }
};

export default ages;
