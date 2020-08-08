import {FULFILLED, REJECTED, PENDING, FETCH_BANK_ACCOUNTS} from '../../../../constants/ActionTypes';
const initialState = {
  data: {
  },
  status: null
};
const bankAccounts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BANK_ACCOUNTS + FULFILLED : {
      const bankAccounts = {data: action.payload.data.payload, status: FULFILLED};
      return bankAccounts;
    }
    case FETCH_BANK_ACCOUNTS + PENDING : {
      const bankAccounts = {data: {}, status: PENDING};
      return bankAccounts;
    }
    case FETCH_BANK_ACCOUNTS + REJECTED : {
      const bankAccounts = {data: {}, status: REJECTED};
      return bankAccounts;
    }
    default:
      return state;
  }
};

export default bankAccounts;
