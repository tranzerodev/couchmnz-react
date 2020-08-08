import {PENDING, FETCH_SHOPPING_CART_TRANSACTION_SUMMARY, FULFILLED, REJECTED} from '../../constants/ActionTypes';

const defaultData = {
  transactionId: '5b2d07f207b941529677810',
  totalPaid: '300.00',
  orders: [
    {
      id: '5b2d07f20b6a91529677810',
      receiptLink: 'https://localhost/payment/invoice/download/5b2d07f20b6a91529677810',
      orderDate: '2018-06-22T14:30:10+00:00',
      ssp: {
        id: '5b22579ddb2529a4397b23c7',
        profileImage: 'https://localhost/images/user_media/profile_pics/5b225881db2529c8397b23c7.jpg',
        name: 'Ruskin Bond'
      },
      orderItems: {
        '22-5b239b9bdb2529b5387b23c6': {
          sport: 'Baseball',
          offerTerminology: {
            singular: null,
            plural: ''
          },
          trainingType: 'Club Fitting',
          skillLevel: 'Beginner',
          ageGroup: 'Preteen (10-12)',
          sessionLabel: 'Beginner\'s Sessions',
          occurances: [
            {
              label: 'Session 1',
              status: 'SCHEDULED',
              startDate: '2018-06-23 08:00:00',
              endDate: '2018-06-24 09:00:00',
              location: {
                address: '1649, 26th Main Rd, Parangi Palaya, Sector 2, HSR Layout, Bengaluru, Karnataka 560102, India',
                lat: '12.90994600',
                lng: '77.65155100'
              }
            },
            {
              label: 'Session 2',
              status: 'UNSCHEDULED'
            }
          ],
          totalAmount: 600,
          paidAmount: 600,
          tax: 0,
          attendee: {
            type: 'CHILD',
            name: 'Sam'
          }
        }
      }
    }
  ]
};

const initialState = {
  data: {},
  status: null

};
const taxSummary = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHOPPING_CART_TRANSACTION_SUMMARY + PENDING : {
      return Object.assign({}, state, {status: PENDING});
    }
    case FETCH_SHOPPING_CART_TRANSACTION_SUMMARY + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      const data = action.payload.data.payload;
      return Object.assign({}, state, {status: FULFILLED, data});
    }
    case FETCH_SHOPPING_CART_TRANSACTION_SUMMARY + REJECTED : {
      return Object.assign({}, state, {status: REJECTED});
    }
    default:
      return state;
  }
};

export default taxSummary;

