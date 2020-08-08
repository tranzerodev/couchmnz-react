import {FULFILLED, REJECTED, PENDING, FETCH_FUND_WITHDRAW_SETTINGS} from '../../../../constants/ActionTypes';
const initialState = {
  data: {
    type: '',
    cutoffAmount: 0,
    account: {
      mode: '',
      value: ''
    }
  },
  status: null
};
const fundSettings = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FUND_WITHDRAW_SETTINGS + FULFILLED : {
      const fundSettings = {data: action.payload.data.payload, status: FULFILLED};
      return fundSettings;
    }
    case FETCH_FUND_WITHDRAW_SETTINGS + PENDING : {
      const fundSettings = {data: {}, status: PENDING};
      return fundSettings;
    }
    case FETCH_FUND_WITHDRAW_SETTINGS + REJECTED : {
      const fundSettings = {data: {}, status: REJECTED};
      return fundSettings;
    }
    default:
      return state;
  }
};

export default fundSettings;
