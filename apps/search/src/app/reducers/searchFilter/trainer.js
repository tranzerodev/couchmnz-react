import {UPDATE_TRAINER, CLEAR_TRAINER} from '../../constants/ActionTypes';

const initialState = {};

export default function trainer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TRAINER: {
      action.trainer.dataType = 'bool';
      return Object.assign({}, state, action.trainer);
    }
    case CLEAR_TRAINER:
      return initialState;
    default:
      return state;
  }
}
