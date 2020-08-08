import {FULFILLED, REJECTED, PENDING, SAVE_FUND_SETTINGS} from '../../../../constants/ActionTypes';
const initialState = {
  status: null
};
const saveFundSettings = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_FUND_SETTINGS + FULFILLED : {
      return {status: FULFILLED};
    }
    case SAVE_FUND_SETTINGS + PENDING : {
      return {status: PENDING};
    }
    case SAVE_FUND_SETTINGS + REJECTED : {
      return {status: REJECTED};
    }
    default:
      return state;
  }
};

export default saveFundSettings;
