import config from '../config';
export const BASE_URL = config.baseURL + '/api/v1';
export const ELASTIC_SEARCH_URL = config.esBaseURL;
export const BASE_URL2 = 'http://10.1.1.2:3090/coachlist/api/v1';

export const REWARDS = BASE_URL + '/profile/ssp/{profileID}/rewards/points';
/* Export const SSP_PROFILE = BASE_URL + '/users/ssp/valiadtion/{userID}'; */
export const SSP_PROFILE = BASE_URL + '/isp/profile/{profileID}';
export const CURRENT_SPORT = BASE_URL + '/isp/{profileID}/sport/{sportID}';
export const REWARDS_STATS = BASE_URL + '/users/ssp/{profileID}/rewards/stats';
export const SESSION_STATS = BASE_URL + '/users/ssp/{profileID}/sessions/stats';
export const REVIEW_STATS = BASE_URL + '/users/ssp/{profileID}/reviews/stats';
export const EARNING_STATS = BASE_URL + '/users/ssp/{profileID}/earnings/stats';
export const INVITE_USERS = BASE_URL + '/users/{profileID}/refer/users';
export const FETCH_REWARDS_HISTORY = BASE_URL + '/users/{userID}/rewards/history/{startIndex}/{endIndex}?filter={filter}';
export const FETCH_USER_IDS = BASE_URL + '/user-roles';
export const FETCH_NICKNAMES = BASE_URL + '/nickname/suggestions';
export const VERIFY_NICKNAME = BASE_URL + '/nickname/availability';
export const FETCH_TIMEZONES = BASE_URL + '/timezones';
export const GET_JWT_TOKEN = BASE_URL + '/getdbauth?token={token}';

// For SSP Details Session Finder
export const FETCH_SSP_SESSIONS_URL = BASE_URL + '/ssp/{nickname}/{sportID}/sessions';
export const FETCH_SSP_PROFILEDATA_BASE = BASE_URL + '/showssp/{nickname}';
export const FETCH_SSP_PROFILEDATA_SPORT = FETCH_SSP_PROFILEDATA_BASE + '/{sportID}';

// End of SSP Details
export const CREATE_PROFILE = BASE_URL + '/{profileType}/create-profile';
export const ISP_UPLOAD_PROFILE_PICTURE = BASE_URL + '/isp/{profileID}/profile-picture';
export const ISP_UPLOAD_ACTION_PICTURES = BASE_URL + '/isp/{profileID}/action-pictures';
export const ISP_DELETE_ACTION_PICTURE = BASE_URL + '/isp/{profileID}/action-picture/{pictureID}';
export const ISP_UPLOAD_ACTION_VIDEOS = BASE_URL + '/isp/{profileID}/action-videos';
export const ISP_DELETE_ACTION_VIDEO = BASE_URL + '/isp/{profileID}/action-video/{videoID}';
export const ISP_UPDATE_ACTION_IMAGES = BASE_URL + '/isp/{profileID}/action-pictures/attributes';
export const ISP_UPDATE_ACTION_VIDEOS = BASE_URL + '/isp/{profileID}/action-videos/attributes';

export const ISP_UPDATE_SESSIONS = BASE_URL + '/isp/{profileID}/session/{sportID}';
// Export const ISP_UPDATE_SESSIONS = BASE_URL + '/isp/{profileID}/session';

export const ISP_UPDATE_EVENTS = BASE_URL + '/isp/{profileID}/events';

export const CITY_LIST_COUNTRY = BASE_URL + '/country/{id}/cities';
export const CITY_LIST_STATE = BASE_URL + '/state/{id}/cities';
export const VERIFY_PAYPAL_EMAIL = BASE_URL + '/isp/{profileID}/paypal/verify-email';
export const VERIFY_PAYPAL_PIN = BASE_URL + '/isp/{profileID}/paypal/verify-pin';

export const GOOGLE_MAPS_API = 'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={key}';

export const ADD_NEW_DEGREE_TO_DB = BASE_URL + '/isp/{profileID}/add-degree';
export const ADD_NEW_INSTITUTION_TO_DB = BASE_URL + '/isp/{profileID}/add-institution';

export const CHANGE_PASSWORD_URL = BASE_URL + '/change-password';
export const DEACTIVATE_ACCOUNT = BASE_URL + '/{profileID}/deactivate-account';
export const FETCH_GEN_CERTIFICATIONS = BASE_URL + '/general-certifications';
export const ADD_NEW_CERTIFICATION_TO_DB = BASE_URL + '/isp/{profileID}/add-certification';
export const FETCH_GEN_AWARDS = BASE_URL + '/awards';
export const ADD_NEW_AWARD_TO_DB = BASE_URL + '/isp/{profileID}/add-award';
export const ADD_NEW_TOOL_TO_DB = BASE_URL + '/isp/{profileID}/add-tool';
export const FETCH_GEN_TOOLS = BASE_URL + '/tools';
export const ISP_DELETE_SESSION = '/isp/{profileID}/session/{sessionID}';

export const SPORT_SUB_SSP_TYPES = BASE_URL + '/isp/sub-ssp-types/{sportID}';

export const USER_PROFILES_URL = BASE_URL + '/profiles';
export const MESSAGE_URL = BASE_URL + '/{profileID}/messages';
export const MESSAGE_LABEL_URL = MESSAGE_URL + '/labels';
export const MESSAGE_LABEL_THREADS_URL = MESSAGE_LABEL_URL + '/{labelName}';
export const MESSAGE_DRAFT_URL = MESSAGE_URL + '/drafts';
export const MESSAGE_INBOX_URL = MESSAGE_URL + '/inbox';
export const MESSAGE_SENT_URL = MESSAGE_URL + '/sent';
export const MESSAGE_STARRED_URL = MESSAGE_URL + '/starred';
export const MESSAGE_UNREAD_URL = MESSAGE_URL + '/unread';
export const MESSAGE_ARCHIVED_URL = MESSAGE_URL + '/archived';
export const MESSAGE_TRASH_URL = MESSAGE_URL + '/trash';
export const MESSAGE_THREAD_DETAILS_URL = MESSAGE_URL + '/threads/{threadId}';
export const MESSAGE_ATTACHMENT_URL = MESSAGE_URL + '/attachments';
export const MESSAGE_ATTACHMENT_IMAGE_URL = MESSAGE_URL + '/images';
export const MESSAGE_METADATA_URL = MESSAGE_URL + '/metadata';
export const MESSAGE_RECIPIENTS_URL = MESSAGE_URL + '/recipients';
export const MESSAGE_ATTACHMENT_DETAILS_URL = MESSAGE_ATTACHMENT_URL + '/{attachmentId}';
export const ISP_DELETE_SPORT = BASE_URL + '/isp/{profileID}/sport/{sportID}';

export const CONTACT_SSP = BASE_URL + '/contactssp/{nickname}/{sportID}';
export const LOCATION_LOOKUP_URL = BASE_URL + '/geo-ip';
export const POPULAR_SPORTS = BASE_URL + '/popular-sports?sports=5&popularSports=3&page=2';

export const UPDATE_POPULAR_SPORT = BASE_URL + '/sports-searched';

export const NEARBY_LOCATION_URL = BASE_URL + '/nearbylocations/{locationValue}'; // LocationValue can be loaction name or lat,lng

export const FETCH_DISCOUNT_RATES = BASE_URL + '/discount-rates';

export const SHOPPING_CART_ITEMS_URL = BASE_URL + '/shopping-cart/{cartId}';
export const FETCH_SHOPPING_CART_TAX_SUMMARY = BASE_URL + '/tax-summary/{cartId}';
export const SHOPPING_CART_CHECKOUT = BASE_URL + '/check-out';
export const CREATE_SHOPPING_CART = BASE_URL + '/shopping-cart';

export const SIGN_UP = BASE_URL + '/signup';
export const LOGIN = BASE_URL + '/login';
export const VERIFY_OTP = BASE_URL + '/verify-otp';
export const RESEND_EMAIL_VERIFICATION_OTP = BASE_URL + '/resend-otp';
export const CHECK_EMAIL_AVAILABILITY = BASE_URL + '/has-email';

export const FETCH_TOS = BASE_URL + '/tos';
export const FETCH_BASIC_USER_INFO = BASE_URL + '/user';
export const DASHBOARD_SPORTS = config.dashboardUrl + '/#/dashboard/isp/service-profiles';

export const ACTIVATE_SPORT_URL = BASE_URL + '/isp/profile/{profileID}/sport/{sportID}/activate';
export const ACTIVATE_SPORT_AND_PROFILE_URL = BASE_URL + '/isp/profile/{profileID}/sport/{sportID}/activate-both';

export const REGISTER_SERVICE_PROVIDERS_AVAILABILITY = BASE_URL + '/search/noresult/register';
export const FETCH_AVAILABLE_SPORTS_LIST = BASE_URL + '/search/noresult/all-sport-list';
export const POST_SEND_SERVICE_PROVIDER_COUPON = BASE_URL + '/search/noresult/send-coupon';
