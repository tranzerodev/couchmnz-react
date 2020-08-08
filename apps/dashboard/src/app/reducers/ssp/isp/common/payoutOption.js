import {UPDATE_PAYOUT_OPTION, CLEAR_PAYOUT_OPTION, SET_PAYOUT_OPTION, SAVE_PAYOUT_OPTION} from '../../../../constants/ActionTypes';

const initialState = null;

export default function businessModel(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PAYOUT_OPTION: {
      const {profile} = action;
      return profile;
    }
    case CLEAR_PAYOUT_OPTION: {
      return initialState;
    }
    case SET_PAYOUT_OPTION: {
      return action.data;
    }
    case SAVE_PAYOUT_OPTION: {
      const {payoutOption} = action;
      return payoutOption;
    }
    default:
      return state;
  }
}
