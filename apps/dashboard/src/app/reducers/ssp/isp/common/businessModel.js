import {UPDATE_BUSINESS_MODEL, CLEAR_BUSINESS_MODEL, SET_BUSINESS_MODEL, SAVE_BUSINESS_MODEL} from '../../../../constants/ActionTypes';

const initialState = null;

export default function businessModel(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BUSINESS_MODEL: {
      const {profile} = action;
      return profile;
    }
    case SAVE_BUSINESS_MODEL: {
      const {businessModel} = action;
      return businessModel;
    }
    case CLEAR_BUSINESS_MODEL: {
      return initialState;
    }
    case SET_BUSINESS_MODEL: {
      const {data} = action;
      return data;
    }
    default:
      return state;
  }
}
