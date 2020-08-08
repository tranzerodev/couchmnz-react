import {UPDATE_CONTACT, UPDATE_PHONES, ADD_PHONE, CLEAR_CONTACT, SET_CONTACT} from '../constants/ActionTypes';

const handlePhoneSearch = (phones, type) => {
  return phones.findIndex(phone => phone.type === type);
};

const initialState = {
  contactPreferences: {
    sms: 'N'
  },
  location: {
    lat: 0.0,
    lng: 0.0
  },
  businessName: null,
  firstName: null,
  lastName: null,
  landline: null,
  mobile: null
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
    default:
      return state;
  }
}
