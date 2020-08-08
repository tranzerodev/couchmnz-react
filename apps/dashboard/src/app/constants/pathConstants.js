import appConstants from '../constants/appConstants';
import config from '../config';

const slugify = string => {
  const a = 'àáäâãåăæąçćčđďèéěėëêęǵḧìíïîįłḿǹńňñòóöôœøṕŕřßśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
  const b = 'aaaaaaaaacccddeeeeeeeghiiiiilmnnnnooooooprrssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') 
    .replace(p, c => b.charAt(a.indexOf(c)))
    .replace(/&/g, '-and-') 
    .replace(/[^\w\-]+/g, '') 
    .replace(/\-\-+/g, '-') 
    .replace(/^-+/, '') 
    .replace(/-+$/, '') 
}

export const BOOKINGS_PATH = () => {
    const path = '/bookings'
    return config.ssrUrl + path
}
export const CALENDAR_PATH = () => {
    const path = '/calendar'
    return config.ssrUrl + path
}
export const DASHBOARD_PATH = () => {
    const path = '/dashboard'
    return config.ssrUrl + path
}

export const MESSAGES_PATH = () => {
    const path = '/messages'
    return config.ssrUrl + path
}
export const SSR_PATH = path => {
    return config.ssrUrl + path
}

export const DASHBOARD_MANAGE_COMPLETE_SCHEDULER_SETTINGS = sport => {
    if ( sport ) {
        return config.ssrUrl + `/dashboard/sports/${slugify(sport)}/scheduler`
    } 
    return '#'
}  

export const ACCOUNTS_PATH = tab => {
    return config.ssrUrl + `/dashboard/accounts?tab=${tab}`
}

export const DASHBOARD_SESSION_TRAINING_LOCATION = '/dashboard/sessions/training-location';
export const DASHBOARD_SESSION_TRAINING_LOCATION_LIST = '/dashboard/sessions/training-location/list';
export const DASHBOARD_SESSION_TRAINING_LOCATION_ADD = '/dashboard/sessions/training-location/add';
export const DASHBOARD_SESSION_TRAINING_LOCATION_EDIT = '/dashboard/sessions/training-location/edit';
export const DASHBOARD_SESSION_SET_PRICING = '/dashboard/sessions/set-pricing';
export const DASHBOARD_SESSION_DEFINE_SESSION = '/dashboard/sessions/define-session';
export const PROFILE = '/profile';
export const REGISTRATION_BUSINESS_MODEL = '/model';
export const DASHBOARD_PROFILE_BIOGRAPHY = '/dashboard/profile/biography';
export const DASHBOARD_LINK = '/dashboard';
export const DASHBOARD_SSP = DASHBOARD_LINK + '/isp';
export const DASHBOARD_SCHEDULES = DASHBOARD_SSP + '/schedules';
export const DASHBOARD_SESSIONS = DASHBOARD_SSP + '/sessions';
export const DASHBOARD_PROFILE = DASHBOARD_SSP + '/profile';
export const DASHBOARD_REWARDS = DASHBOARD_SSP + '/rewards';
export const DASHBOARD_ACCOUNT = DASHBOARD_SSP + '/account';
export const DASHBOARD_ISP_LANDING = DASHBOARD_SSP + '/landing';
export const DASHBOARD_PROFILE_BUILD_PROFILE = DASHBOARD_PROFILE + '/build-profile';
export const DASHBOARD_PROFILE_TRAINING_PREFERENCE = DASHBOARD_PROFILE + '/training-preferences';
export const DASHBOARD_PROFILE_LISTING_DETAILS = DASHBOARD_PROFILE + '/listing-details';
export const DASHBOARD_PROFILE_PHOTOS_AND_VIDEOS = DASHBOARD_PROFILE + '/photos-videos';
export const DASHBOARD_ACCOUNT_BUSINESS_MODEL = DASHBOARD_ACCOUNT + '/business-model';
export const DASHBOARD_ACCOUNT_BOOKING_PREFERENCE = DASHBOARD_ACCOUNT + '/booking-preferences';
export const DASHBOARD_ACCOUNT_DETAILS = DASHBOARD_ACCOUNT + '/account-details';
export const DASHBOARD_ACCOUNT_PAYOUT_DETAILS = DASHBOARD_ACCOUNT + '/payout-details';
export const DASHBOARD_ACCOUNT_PAYOUT_HISTORY = DASHBOARD_ACCOUNT + '/payout-history';
export const DASHBOARD_ACCOUNT_PAYOUT_HISTORY_EARNINGS = DASHBOARD_ACCOUNT_PAYOUT_HISTORY + '/earnings';
export const DASHBOARD_ACCOUNT_PAYOUT_HISTORY_PAYOUTS = DASHBOARD_ACCOUNT_PAYOUT_HISTORY + '/payouts';
export const DASHBOARD_ACCOUNT_EARNING_DETAILS = DASHBOARD_ACCOUNT_PAYOUT_HISTORY_EARNINGS + '/details';
export const DASHBOARD_ACCOUNT_PAYOUT_WITHDRAW = DASHBOARD_ACCOUNT_PAYOUT_HISTORY_EARNINGS + '/withdraw';
export const DASHBOARD_ACCOUNT_REGISTRATION_14_PAYPAL = DASHBOARD_ACCOUNT + '/payout-details/registration-14-paypal';
export const DASHBOARD_ACCOUNT_REGISTRATION_14_BANK_PAYOUT = DASHBOARD_ACCOUNT + '/payout-details/registration-14-bank-payout';
export const DASHBOARD_ACCOUNT_SCHEDULER_SETTINGS = DASHBOARD_ACCOUNT + '/scheduler-settings';
export const DASHBOARD_ACCOUNT_WALLET = DASHBOARD_ACCOUNT + '/wallet';

export const SSP = '/ssp';
export const DASHBOARD = 'dashboard';
export const COMING_SOON = 'coming-soon';
export const COMING_SOON_SCC = COMING_SOON + '/scc';
export const COMING_SOON_TF = COMING_SOON + '/TF';
export const COMING_SOON_OSP = COMING_SOON + '/OSP';
export const COMING_SOON_P = COMING_SOON + '/parent';
export const COMING_SOON_A = COMING_SOON + '/athlet';

export const DASHBOARD_SESSION_ADD_SESSION = '/dashboard/sessions/define-session/add-session';
export const DASHBOARD_SESSION_EDIT_SESSION = '/dashboard/sessions/define-session/edit-session';
export const REGISTRATION = '/registration';
export const ISP = REGISTRATION + '/' + appConstants.userProfileTypes.ISP;
export const ATHLETE = REGISTRATION + '/' + appConstants.userProfileTypes.ATHLETE;
export const PARENT = REGISTRATION + '/' + appConstants.userProfileTypes.PARENT;

export const ISP_REG_FLOW_BUILD_PROFILE = ISP + '/sport';
export const ISP_REG_FLOW_BIOGRAPHY = ISP + '/biography';
export const REGISTRATION_ISP_BIOGRAPHY = ISP + '/biography';

export const REGISTRATION_ISP_SPORTS = ISP + '/sport';
export const REGISTRATION_ISP_TRAINING_PREFERENCE = ISP + '/training-preferences';
export const REGISTRATION_ISP_LISTING = ISP + '/listing';
export const REGISTRATION_ISP_MEDIA = ISP + '/photos-and-videos';
export const REGISTRATION_ISP_PRICING = ISP + '/pricing';
export const REGISTRATION_ISP_TRAINING_LOCATIONS = ISP + '/training-locations';
export const REGISTRATION_ISP_SESSIONS = ISP + '/sessions';
export const REGISTRATION_ISP_SCHEDULE = ISP + '/schedule';
export const REGISTRATION_ISP_ACCOUNT_DETAILS = ISP + '/account';
export const REGISTRATION_ISP_PROFILE_READY_MESSAGE = ISP + '/message';
export const REGISTRATION_ISP_PAYOUT_DETAILS = ISP + '/payout';
export const REGISTRATION_ISP_BUSINESS_MODAL = ISP + '/business-model';
export const REGISTRATION_ISP_BOOKING_PREFERENCES = ISP + '/booking-preferences';
export const REGISTRATION_ISP_PAYPAL_SETTINGS = ISP + '/paypal';
export const REGISTRATION_ISP_BANK_PAYOUT = ISP + '/bank-payout';
export const WELCOME = ISP + '/welcome';

export const DASHBOARD_ISP_LOCATION = DASHBOARD_SSP + '/location';
export const DASHBOARD_ISP_BUSINESS_MODEL = DASHBOARD_SSP + '/business-model';
export const DASHBOARD_SPORTS = DASHBOARD_SSP + '/service-profiles';
export const DASHBOARD_MANAGE_SPORT = DASHBOARD_SPORTS + '/manage';
export const DASHBOARD_MANAGE_SPORT_SPECIALITY = DASHBOARD_MANAGE_SPORT + '/sport-specialty';
export const DASHBOARD_MANAGE_SPORT_TRAINING_PREFERENCES = DASHBOARD_MANAGE_SPORT + '/training-preferences';
export const DASHBOARD_MANAGE_SPORT_PRICING = DASHBOARD_MANAGE_SPORT + '/pricing';
export const DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS = DASHBOARD_MANAGE_SPORT + '/training-locations';
export const DASHBOARD_MANAGE_SPORT_TRAVEL_PREFRENCES = DASHBOARD_MANAGE_SPORT + '/travel-preference';
export const DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS_ADD = DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS + '/add';
export const DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS_EDIT = DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS + '/edit';
export const DASHBOARD_MANAGE_SPORT_SESSIONS = DASHBOARD_MANAGE_SPORT + '/sessions';
export const DASHBOARD_MANAGE_SPORT_SESSIONS_ADD = DASHBOARD_MANAGE_SPORT_SESSIONS + '/add';
export const DASHBOARD_MANAGE_SPORT_SESSIONS_EDIT = DASHBOARD_MANAGE_SPORT_SESSIONS + '/edit';
export const DASHBOARD_MANAGE_SPORT_BIOGRAPHY = DASHBOARD_MANAGE_SPORT + '/biography';
export const DASHBOARD_MANAGE_SPORT_LISTING = DASHBOARD_MANAGE_SPORT + '/listing';
export const DASHBOARD_MANAGE_SPORT_MEDIA = DASHBOARD_MANAGE_SPORT + '/media';
export const DASHBOARD_MANAGE_COMPLETE_SERVICE = DASHBOARD_MANAGE_SPORT + '/complete-service';
export const DASHBOARD_MANAGE_COMPLETE_BOOKING_PREFERENCE = DASHBOARD_MANAGE_SPORT + '/complete-booking-preference';
export const DASHBOARD_MANAGE_COMPLETE_ACCOUNT_DETAILS = DASHBOARD_MANAGE_SPORT + '/complete-account-details';
export const DASHBOARD_MANAGE_COMPLETE_PAYOUT_DETAILS = DASHBOARD_MANAGE_SPORT + '/complete-payout-details';
export const DASHBOARD_MANAGE_COMPLETE_PAYPAL_SETTINGS = DASHBOARD_MANAGE_SPORT + '/complete-paypal-settings';
export const DASHBOARD_MANAGE_COMPLETE_BANK_PAYOUT = DASHBOARD_MANAGE_SPORT + '/complete-bank-payout';
// export const DASHBOARD_MANAGE_COMPLETE_SCHEDULER_SETTINGS = DASHBOARD_MANAGE_SPORT + '/complete-scheduler-settings';

export const DEFAULT_PICTURE = 'https://localhost//images/profile/photo-default.png';

export const DASHBOARD_PARENT = '/dashboard/' + appConstants.userProfileTypes.PARENT;
export const PARENT_ACCOUNT = DASHBOARD_PARENT + '/account';
export const PARENT_MANAGE_ACCOUNT = PARENT_ACCOUNT + '/manage';

export const PARENT_ACCOUNT_DETAILS = PARENT_MANAGE_ACCOUNT + '/details';

export const PARENT_PROFILE = DASHBOARD_PARENT + '/profile';
export const PARENT_MANAGE_PROFILE = PARENT_PROFILE + '/manage';
export const PARENT_PROFILE_DETAILS = PARENT_MANAGE_PROFILE + '/details';
export const PARENT_PROFILE_SKILLS = PARENT_MANAGE_PROFILE + '/skills';

export const DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY = PARENT_MANAGE_ACCOUNT + '/orderhistory';
export const DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY_LIST = DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY + '/list';
export const DASHBOARD_PARENT_ACCOUNT_ORDER_DETAILS = DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY + '/details';
export const DASHBOARD_PARENT_ACCOUNT_WALLET = PARENT_MANAGE_ACCOUNT + '/wallet';

export const DASHBOARD_PARENT_ACCOUNT_PAYMENT_PREFERENCES = PARENT_MANAGE_ACCOUNT + '/payment-preferences';
export const REGISTRATION_ATHLETE_PROFILE = ATHLETE + '/profile';
export const REGISTRATION_ATHLETE_PREFERENCES = ATHLETE + '/preferences';
export const REGISTRATION_ATHLETE_ACCOUNT = ATHLETE + '/account';
export const REGISTRATION_ATHLETE_SHORT = ATHLETE + '/short';

export const REGISTRATION_PARENT_PROFILE = PARENT + '/profile';
export const REGISTRATION_PARENT_PREFERENCES = PARENT + '/preferences';
export const REGISTRATION_PARENT_ACCOUNT = PARENT + '/account';
export const REGISTRATION_PARENT_SHORT = PARENT + '/short';

export const DASHBOARD_ATHLETE = '/dashboard/' + appConstants.userProfileTypes.ATHLETE;
export const DASHBOARD_PROFILE_TYPE = DASHBOARD_LINK + '/:profileType';
export const REGISTRATION_PROFILE_TYPE = REGISTRATION + '/:profileType';
export const DASHBOARD_ATHLETE_SCHEDULE = DASHBOARD_PROFILE_TYPE + '/scheduler';
export const DASHBOARD_ATHLETE_SCHEDULER_MANAGE = DASHBOARD_ATHLETE_SCHEDULE + '/manage';
export const DASHBOARD_ATHLETE_SCHEDULER_MANAGE_SESSION = DASHBOARD_ATHLETE_SCHEDULER_MANAGE + '/session';
export const DASHBOARD_ATHLETE_SCHEDULER_SCHEDULED = DASHBOARD_ATHLETE_SCHEDULER_MANAGE_SESSION + '/scheduled';
export const DASHBOARD_ATHLETE_SCHEDULER_UNSCHEDULED = DASHBOARD_ATHLETE_SCHEDULER_MANAGE_SESSION + '/unscheduled';
export const DASHBOARD_ATHLETE_SCHEDULER_UNSCHEDULED_ORDER_ITEM_ID = DASHBOARD_ATHLETE_SCHEDULER_UNSCHEDULED + '/:orderItemId';
export const DASHBOARD_ATHLETE_SCHEDULER_CHANGES = DASHBOARD_ATHLETE_SCHEDULER_MANAGE_SESSION + '/changes';
export const DASHBOARD_ATHLETE_SCHEDULER_MANAGE_ORDER_ITEM = DASHBOARD_ATHLETE_SCHEDULER_MANAGE + '/order/:orderId/session/:sessionId/order-items';
export const DASHBOARD_ATHLETE_SCHEDULER_AVAILABLE_SLOTS = DASHBOARD_ATHLETE_SCHEDULER_MANAGE + '/events/:orderItemId/schedule/:scheduleId/available-slots';
export const DASHBOARD_ATHLETE_SCHEDULER_HISTORY = DASHBOARD_ATHLETE_SCHEDULER_MANAGE + '/history';

export const PATH_VARIABLE_PACKAGE_ID = 'packageId';
export const PATH_VARIABLE_ATHLETE_ID = 'athleteId';
export const DASHBOARD_SCHEDULE_SESSION = DASHBOARD_SCHEDULES + '/schedule-session';
export const DASHBOARD_MANAGE_BOOKING = DASHBOARD_SCHEDULES + '/manage-booking';
export const DASHBOARD_SESSION_HISTORY = DASHBOARD_SCHEDULES + '/session-history';
export const DASHBOARD_SESSION_DETAILS = DASHBOARD_MANAGE_BOOKING + `/session-details/:${PATH_VARIABLE_PACKAGE_ID}/athlete/:${PATH_VARIABLE_ATHLETE_ID}`;
export const DASHBOARD_ATHLETE_ACCOUNT = DASHBOARD_ATHLETE + '/account';
export const DASHBOARD_ATHLETE_ACCOUNT_MANAGE = DASHBOARD_ATHLETE_ACCOUNT + '/manage';
export const DASHBOARD_ATHLETE_ACCOUNT_PROFILE = DASHBOARD_ATHLETE_ACCOUNT_MANAGE + '/details';
export const DASHBOARD_ATHLETE_ACCOUNT_ORDER_HISTORY = DASHBOARD_ATHLETE_ACCOUNT_MANAGE + '/orderhistory';
export const DASHBOARD_ATHLETE_ACCOUNT_PAYMENT_PREFERENCES = DASHBOARD_ATHLETE_ACCOUNT_MANAGE + '/payment-preferences';
export const DASHBOARD_ATHLETE_ACCOUNT_ORDER_HISTORY_LIST = DASHBOARD_ATHLETE_ACCOUNT_ORDER_HISTORY + '/list';
export const DASHBOARD_ATHLETE_ACCOUNT_ORDER_DETAILS = DASHBOARD_ATHLETE_ACCOUNT_ORDER_HISTORY + '/details';
export const DASHBOARD_ATHLETE_ACCOUNT_WALLET = DASHBOARD_ATHLETE_ACCOUNT_MANAGE + '/wallet';
export const DASHBOARD_PROFILE_TYPE_ACCOUNT_ORDER_DETAILS = DASHBOARD_PROFILE_TYPE + '/account/manage/orderhistory/details';
export const DASHBOARD_PROFILE_TYPE_ACCOUNT_ORDER_HISTORY = DASHBOARD_PROFILE_TYPE + '/account/manage/orderhistory';

export const DASHBOARD_ATHLETE_PROFILE = DASHBOARD_ATHLETE + '/profile';
export const DASHBOARD_ATHLETE_PROFILE_MANAGE = DASHBOARD_ATHLETE_PROFILE + '/manage';
export const DASHBOARD_ATHLETE_PROFILE_DETAILS = DASHBOARD_ATHLETE_PROFILE_MANAGE + '/details';
export const DASHBOARD_ATHLETE_ACCOUNT_SKILLS = DASHBOARD_ATHLETE_PROFILE_MANAGE + '/skills';

export const SHOPPING_CART = '/shopping-cart';
export const SHOPPING_CART_EDIT = SHOPPING_CART + '/edit';
export const SHOPPING_CART_VIEW = SHOPPING_CART + '/view';
export const SHOPPING_CART_PAYMENT = SHOPPING_CART + '/payment';
export const SHOPPING_CART_PAYMENT_CARD = SHOPPING_CART_PAYMENT + '/card';
export const SHOPPING_CART_PAYMENT_PAYPAL = SHOPPING_CART_PAYMENT + '/paypal';
export const SHOPPING_CART_PAYMENT_BANK = SHOPPING_CART_PAYMENT + '/bank';
export const SHOPPING_CART_ADDRESS = SHOPPING_CART + '/address';
export const SHOPPING_CART_INVITE = SHOPPING_CART + '/invite';
export const SHOPPING_CART_PAYMENT_ADD_CARD = SHOPPING_CART_PAYMENT_CARD + '/new';
export const SHOPPING_CART_PAYMENT_SAVED_CARDS = SHOPPING_CART_PAYMENT_CARD + '/saved-cards';

export const PAYMENT_REDIRECT_ROUTE = SHOPPING_CART + '/processing-payment/:type/:sourceId?';
export const SHOPPING_CART_ORDER_CONFIRMATION = SHOPPING_CART + '/transaction/:transactionId/orders';
