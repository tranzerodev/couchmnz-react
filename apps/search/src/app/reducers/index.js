import {combineReducers} from 'redux';

import {polyglotReducer} from 'redux-polyglot';

import sportNameSuggestions from './sportNameSuggestions';
import locationNameSuggestion from './locationNameSuggestion';
import searchData from './searchData';
import locationLookupData from './locationLookup';
import selectedLocation from './selectedLocation';
import selectedProfile from './selectedProfile';
import router from './router';
import popularSports from './popularSports';
import nearbylocation from './nearbylocation';
import userIDs from './userIDs';
import profile from './profile';
import profileActivationStatus from './profileActivationStatus';
import sportActivationStatus from './sportActivationStatus';
import sportAndProfileActivationStatus from './sportAndProfileActivationStatus';
import displayPicture from './displayPicture';
import discounts from './discounts';
/* For SSP Details Display */
import viewssp from './viewsspp';
/* End of for SSP Details Display */
import shoppingCart from './shoppingCart';
import auth from './auth';
import tos from './tos';
import userProfiles from './userProfiles';
import {reducer as formReducer} from 'redux-form';
import registerServiceProvidersAvailability from './forms/registerServiceProvidersAvailability';
import serviceProvidersCoupon from './coupons/serviceProvidersCoupon';
import availableSportsList from './availableSportsList';

const rootReducer = combineReducers({
  polyglot: polyglotReducer,
  auth,
  sportNameSuggestions,
  locationNameSuggestion,
  searchData,
  locationLookupData,
  selectedLocation,
  selectedProfile,
  popularSports,
  nearbylocation,
  viewssp,
  userIDs,
  profile,
  profileActivationStatus,
  sportActivationStatus,
  sportAndProfileActivationStatus,
  displayPicture,
  router,
  discounts,
  shoppingCart,
  tos,
  userProfiles,
  availableSportsList,
  registerServiceProvidersAvailability,
  serviceProvidersCoupon,
  form: formReducer
});

export default rootReducer;
