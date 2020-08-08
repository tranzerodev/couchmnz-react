import {FULFILLED, REJECTED, PENDING, FETCH_SSP_ORDER_SUMMARY} from '../../../../constants/ActionTypes';
const initialState = {
  data: {
    currentBalance: 0,
    withdrawableBalance: 0,
    minimumBalanceToWithdraw: 0,
    priceUnit: '$',
    lastPayoutAmount: 0,
    lastPayoutOn: ''
  },
  status: null
};
const payoutSummary = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SSP_ORDER_SUMMARY + FULFILLED : {
      const orderSummary = {data: action.payload.data.payload, status: FULFILLED};
      return orderSummary;
    }
    case FETCH_SSP_ORDER_SUMMARY + PENDING : {
      const orderSummary = {data: {}, status: PENDING};
      return orderSummary;
    }
    case FETCH_SSP_ORDER_SUMMARY + REJECTED : {
      const orderSummary = {data: {}, status: REJECTED};
      return orderSummary;
    }
    default:
      return state;
  }
};

export default payoutSummary;
