import {UPDATE_TRAINING, CLEAR_TRAINING, SET_TRAINING, SAVE_TRINING_PREFERENCES, CLEAR_SPORTS_RELATED_STORES} from '../../../../constants/ActionTypes';

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
    case 'SAVE_TRAINING_LOCATION': {
      return {
        payload: action.payload
      }
    }
    case UPDATE_TRAINING: {
      const newTraining = Object.assign({}, action.training);
      const _state = Object.assign([], state);
      const training = Object.assign({}, {
        id: newTraining.id,
        name: newTraining.name
      });
      return Object.assign([], newTraining.checked ? isExistingItem(state, newTraining.id) ? _state.filter(training => training !== newTraining.name) : _state.concat(training) : _state.filter(training => training.id !== newTraining.id));
    }
    case SET_TRAINING: {
      const {trainings} = action;
      return trainings;
    }
    case SAVE_TRINING_PREFERENCES: {
      const {trainings} = action;
      return Object.assign([], trainings);
    }
    case CLEAR_SPORTS_RELATED_STORES: {
      return initialState;
    }
    case CLEAR_TRAINING:
      return initialState;
    default:
      return state;
  }
}
