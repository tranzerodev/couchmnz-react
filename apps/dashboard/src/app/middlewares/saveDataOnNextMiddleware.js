import {UPDATE_LISTING, SAVE_TRINING_PREFERENCES, SAVE_BUILD_PROFILE, SAVE_TRAINING_LOCATIONS, SAVE_BIOGRAPHY, SAVE_BUSINESS_MODEL, SAVE_BOOKING_PREFERENCE, SAVE_ACCOUNT_DETAILS, SAVE_PRICE, SAVE_BANK_PAYOUT_DETAILS, SAVE_PAYOUT_OPTION, UPDATE_PAYPAL_DETAILS, SAVE_ATHLETE_PROFILE} from '../constants/ActionTypes';
import {saveData} from './saveDataOnNextMiddlewareUtils';
import {constructProfile} from './updateProfileUtils';
import {constructCurrentSportData} from './updateCurrentSportUtils';

const saveDataOnNextMiddleware = store => next => action => {
  next(action);
  switch (action.type) {
    case SAVE_TRINING_PREFERENCES:
    case SAVE_BUILD_PROFILE:
    case SAVE_BIOGRAPHY:
    case SAVE_BUSINESS_MODEL:
    case SAVE_BOOKING_PREFERENCE:
    case SAVE_TRAINING_LOCATIONS:
    case SAVE_ACCOUNT_DETAILS:
    case UPDATE_LISTING:
    case UPDATE_PAYPAL_DETAILS:
    case SAVE_PRICE:
    case SAVE_PAYOUT_OPTION:
    case SAVE_BANK_PAYOUT_DETAILS: {
      const {updateType} = action;
      const storeState = store.getState();
      const profile = constructProfile(storeState);
      const sport = constructCurrentSportData(storeState);
      saveData(updateType, {profile, sport}, store);
      break;
    }
    default:break;
  }
};

export default saveDataOnNextMiddleware;

