import {UPDATE_SKILLLEVEL, CLEAR_SKILLLEVELS, ADD_SKILLLEVEL, SET_SKILLS} from '../constants/ActionTypes';

const initialState = [];

const isExistingItem = (array, id) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      return true;
    }
  }
  return false;
};

export default function skills(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SKILLLEVEL: {
      const newSkilllevel = Object.assign({}, action.skillLevel);
      const _state = Object.assign([], state);
      const skill = Object.assign({}, {
        id: newSkilllevel.id,
        name: newSkilllevel.name
      });
      return Object.assign([], newSkilllevel.checked ? isExistingItem(state, newSkilllevel.id) ? _state.filter(skillLevel => skillLevel !== newSkilllevel.name) : _state.concat(skill) : _state.filter(skillLevel => skillLevel.id !== newSkilllevel.id));
    }
    case ADD_SKILLLEVEL: {
      const newSkilllevel = Object.assign({}, action.skillLevel);
      const _state = Object.assign([], state);
      const skill = Object.assign({}, {
        id: newSkilllevel.id,
        name: newSkilllevel.name
      });
      return Object.assign([], newSkilllevel.checked ? _state.concat(skill) : _state);
    }
    case SET_SKILLS: {
      const {skills} = action;
      return skills;
    }
    case CLEAR_SKILLLEVELS:
      return initialState;
    default:
      return state;
  }
}
