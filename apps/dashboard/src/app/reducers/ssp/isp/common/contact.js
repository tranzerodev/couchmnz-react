import {UPDATE_CONTACT, UPDATE_PHONES, ADD_PHONE, CLEAR_CONTACT, SET_CONTACT, SAVE_ACCOUNT_DETAILS} from '../../../../constants/ActionTypes';

const handlePhoneSearch = (phones, type) => {
  return phones.findIndex(phone => phone.type === type);
};

const initialState = {
  contactPreferences: {
    canSendReminder: 'N',
    canReceiveMarketingCall: 'N'
  },
  location: {
    lat: null,
    lng: null
  },
  businessName: null,
  firstName: null,
  lastName: null,
  landline: null,
  mobile: null,
  businessUrl: null,
  street: null,
  cityID: null,
  cityName: null,
  stateID: null,
  stateName: null,
  countryID: null,
  countryName: null,
  zip: null,
  timezone: {
    id: '',
    label: null
  },
  gender: null
};

export default function contact(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CONTACT: {
      /* Console.log('action', action); */
      const {profile} = action;
      return Object.assign({}, state, profile);
    }
    case UPDATE_PHONES: {
      const {phones} = state;
      const _state = Object.assign({}, state);
      const {profile} = action;
      const index = handlePhoneSearch(phones, profile.type);
      const phone = Object.assign({}, phones[index], profile);
      phones[index] = Object.assign({}, phone);
      _state.phones = Object.assign([], phones);
      return Object.assign({}, _state);
    }
    case ADD_PHONE: {
      console.log('action', action);
      let {phones} = state;
      if (!phones) {
        phones = [];
      }
      const {profile} = action;
      const index = handlePhoneSearch(phones, profile.type);
      if (index < 0) {
        phones.push(Object.assign({}, {...profile, share: false}));
      }
      const _state = Object.assign({}, state);
      _state.phones = Object.assign([], phones);
      return Object.assign({}, _state);
    }
    case CLEAR_CONTACT: {
      /* Console.log('clear'); */
      return initialState;
    }
    case SET_CONTACT: {
      /* Console.log('action', action); */
      const {data} = action;
      return Object.assign({}, state, data);
    }
    case SAVE_ACCOUNT_DETAILS: {
      /* Console.log('action', action); */
      const {contact} = action;
      return Object.assign({}, state, contact);
    }
    default:
      return state;
  }
}
