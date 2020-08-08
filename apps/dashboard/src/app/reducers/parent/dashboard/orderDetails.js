import {FETCH_PARENT_ORDER_DETAILS, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {data: {
  ssp: {
    id: '',
    name: '',
    nickName: '',
    profileImage: ''
  },
  orderDetails: {
    id: '',
    number: '',
    status: '',
    bookingDate: '',
    totalPrice: '',
    tax: ''
  },
  packages: [{

    id: '',
    name: ' ',
    noOfSessions: 0,
    costPerSession: '',
    totalCost: '',
    volumeDiscount: '',
    CoachBucksDiscount: ''
  }

  ],
  sport: {

  },
  paymentInfo: {
    method: '',
    billingAddress: ''
  }
}, status: null};

export default function orderDetails(state = initialState, action) {
  switch (action.type) {
    case FETCH_PARENT_ORDER_DETAILS + FULFILLED: {
      let orderDetails = {};
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {data: {}, status: REJECTED});
      }
      orderDetails = Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
      return orderDetails;
    }
    case FETCH_PARENT_ORDER_DETAILS + PENDING: {
      return {data: {}, status: PENDING};
    }
    case FETCH_PARENT_ORDER_DETAILS + REJECTED: {
      return {data: {}, status: REJECTED};
    }
    case FETCH_PARENT_ORDER_DETAILS:
      return initialState;
    default:
      return state;
  }
}
