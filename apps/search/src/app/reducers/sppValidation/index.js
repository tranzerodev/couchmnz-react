import {combineReducers} from 'redux';
import bankPayoutDetails from './bankPayoutDetails.js';
import paypalSettings from './paypalSettings';
import payoutDetails from './payoutDetails';
import accountDetails from './accountDetails';
import bookingPreference from './bookingPreference';
import businessModel from './businessModel';
import trainingPreferences from './trainingPreferences';
import buildProfile from './buildProfile';
import locations from './locations';
import trainingLocations from './trainingLocations';
import travelPreferences from './travelPreferences';
import listing from './listing';
import media from './photosAndVideos';
import sessionName from './sessionName';
import sessions from './sessions';
import events from './events';
import pricing from './pricing';
import discount from './discount';

const sspValidation = combineReducers({
  bankPayoutDetails,
  paypalSettings,
  payoutDetails,
  accountDetails,
  locations,
  events,
  bookingPreference,
  businessModel,
  buildProfile,
  trainingPreferences,
  trainingLocations,
  travelPreferences,
  listing,
  pricing,
  discount,
  media,
  sessionName,
  sessions
});

export default sspValidation;
