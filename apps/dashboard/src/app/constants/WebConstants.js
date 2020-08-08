
import config from '../config';
export const BASE_URL = config.baseURL;
// Export const BASE_URL = 'https://apimint.com:443/mock/COACHLIST-V1.0/mock/COACHLIST-API-V1/api/v1';
export const BASE_URL2 = 'http://10.1.1.2:3090/coachlist/api/v1';
// Export const BASE_URL = config.baseURL;
export const ISP = '/isp';
export const REWARDS = BASE_URL + '/profile/ssp/{profileID}/rewards/points';
/* Export const SSP_PROFILE = BASE_URL + '/users/ssp/valiadtion/{userID}'; */
export const SSP_PROFILE = BASE_URL + '/isp/profile/{profileID}';
export const CURRENT_SPORT = BASE_URL + '/isp/profile/{profileID}/sport/{sportID}';
export const REWARDS_STATS = BASE_URL + '/users/ssp/{profileID}/rewards/stats';
export const SESSION_STATS = BASE_URL + '/users/ssp/{profileID}/sessions/stats';
export const REVIEW_STATS = BASE_URL + '/users/ssp/{profileID}/reviews/stats';
export const EARNING_STATS = BASE_URL + '/users/ssp/{profileID}/earnings/stats';
export const INVITE_USERS = BASE_URL + '/users/{profileID}/refer/users';
export const FETCH_REWARDS_HISTORY = BASE_URL + '/users/{userID}/rewards/history/{startIndex}/{endIndex}?filter={filter}';
export const FETCH_USER_IDS = BASE_URL + '/user-roles';
export const FETCH_NICKNAMES = BASE_URL + '/nickname/suggestions';
export const VERIFY_NICKNAME = BASE_URL + '/nickname/availability';
export const FETCH_TIMEZONES = BASE_URL + '/master/timezones';
export const FETCH_TIMEZONES_BY_COUNTRY = BASE_URL + '/master/timezones/{countryID}';
export const GET_JWT_TOKEN = BASE_URL + '/getdbauth?token={token}';
export const CREATE_PROFILE = BASE_URL + '/{profileType}/empty-profile';
export const ISP_UPLOAD_PROFILE_PICTURE = BASE_URL + '/isp/profile/{profileID}/profile-picture';
export const ISP_UPLOAD_ACTION_PICTURES = BASE_URL + '/isp/profile/{profileID}/sport/{sportID}/action-pictures';
export const ISP_DELETE_ACTION_PICTURE = BASE_URL + '/isp/profile/{profileID}/sport/{sportID}/action-picture/{pictureID}';
export const ISP_UPLOAD_ACTION_VIDEOS = BASE_URL + '/isp/profile/{profileID}/sport/{sportID}/action-videos';
export const ISP_DELETE_ACTION_VIDEO = BASE_URL + '/isp/profile/{profileID}/sport/{sportID}/action-video/{videoID}';
export const ISP_UPDATE_ACTION_IMAGES = BASE_URL + '/isp/profile/{profileID}/sport/{sportID}/action-pictures/attributes';
export const ISP_UPDATE_ACTION_VIDEOS = BASE_URL + '/isp/profile/{profileID}/sport/{sportID}/action-videos/attributes';

export const ISP_UPDATE_SESSIONS = BASE_URL + '/isp/profile/{profileID}/session';

export const ISP_UPDATE_EVENTS = BASE_URL + '/isp/profile/{profileID}/events';

export const CITY_LIST_COUNTRY = BASE_URL + '/country/{id}/cities';
export const CITY_LIST_STATE = BASE_URL + '/state/{id}/cities';
export const VERIFY_PAYPAL_EMAIL = BASE_URL + '/isp/profile/{profileID}/paypal/verification-email';
export const VERIFY_PAYPAL_PIN = BASE_URL + '/isp/profile/{profileID}/paypal/verification-pin';

export const GOOGLE_MAPS_API = 'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={key}';
export const GOOGLE_PLACES_API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&rankby=distance&key={key}';
export const GOOGLE_GEOCODING_API = 'https://maps.googleapis.com/maps/api/geocode/json';
export const GOOGLE_TIMEZONE_API = 'https://maps.googleapis.com/maps/api/timezone/json?location={lat},{lng}&timestamp={timestamp}&key={key}';

export const ADD_NEW_DEGREE_TO_DB = BASE_URL + '/isp/profile/{profileID}/add-degree';
export const ADD_NEW_INSTITUTION_TO_DB = BASE_URL + '/isp/profile/{profileID}/add-institution';

export const CHANGE_PASSWORD_URL = BASE_URL + '/change-password';
export const DEACTIVATE_ACCOUNT = BASE_URL + '/{profileID}/deactivate-account';
export const DEACTIVATE_ATHLETE_ACCOUNT = BASE_URL + '/athlete/{athleteId}/deactivate';
export const DEACTIVATE_PARENT_ACCOUNT = BASE_URL + '/parent/{parentId}/child/{childId}/deactivate';

export const FETCH_GEN_CERTIFICATIONS = BASE_URL + '/master/bio/certificate/sport';
export const ADD_NEW_CERTIFICATION_TO_DB = BASE_URL + '/isp/profile/{profileID}/add-certification';
export const FETCH_GEN_AWARDS = BASE_URL + '/master/bio/award/sport';
export const ADD_NEW_AWARD_TO_DB = BASE_URL + '/isp/profile/{profileID}/add-award';
export const ADD_NEW_TOOL_TO_DB = BASE_URL + '/isp/profile/{profileID}/add-tool';
export const FETCH_GEN_TOOLS = BASE_URL + '/tools';
export const ISP_DELETE_SESSION = '/isp/profile/{profileID}/session/{sessionID}';

export const SPORT_SUB_SSP_TYPES = BASE_URL + '/isp/sport/{sportID}/sub-ssp-types';

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
export const ISP_DELETE_SPORT = BASE_URL + '/isp/profile/{profileID}/sport/{sportID}';

export const ISP_REVIEW_MASTER = BASE_URL + ISP + '/profile/{profileID}/review-master';

export const FETCH_PROFILE_SPORTS_URL = BASE_URL + '/isp/{profileID}/sports';
export const ACTIVATE_SPORT_URL = BASE_URL + '/isp/profile/{profileID}/sport/{sportID}/activate';
export const DEACTIVATE_SPORT_URL = BASE_URL + '/isp/profile/{profileID}/sport/{sportID}/deactivate';

export const PARENT_PROFILE_IMAGE = BASE_URL + '/parent/{parentId}/child/{childId}/profile/image';
export const PARENT_ACCOUNT = BASE_URL + '/parent/account/personal-details';
export const PARENT_PREFERENCES = BASE_URL + '/parent/{parentId}/child/{childId}/sport/{sportId}/skill-preferences';

export const CHILD_UPLOAD_PROFILE_PICTURE = BASE_URL + '/parent/{parentId}/child/{childId}/profile/image';

export const FETCH_PARENT_ORDER_HISTORY = BASE_URL + '/profile/{profileId}/order/history';
export const FETCH_PARENT_ORDER_DETAILS = BASE_URL + '/order/{orderId}/detail';
export const FETCH_ATHLETE_ORDER_HISTORY = BASE_URL + '/profile/{profileId}/order/history';
export const FETCH_ATHLETE_ORDER_DETAILS = BASE_URL + '/order/{orderId}/detail';

export const ATHLETE_PROFILE = BASE_URL + '/athlete/{athleteId}/profile';
export const ATHLETE_PROFILE_IMAGE = BASE_URL + '/athlete/{athleteId}/profile/image';
export const ATHLETE_ACCOUNT = BASE_URL + '/athlete/account/personal-details';
export const ATHLETE_PREFERENCES = BASE_URL + '/athlete/{athleteId}/sport/{sportId}/skill-preferences';
export const NEW_ROLE = BASE_URL + '/role/{type}/profile';

export const ATHLETE_UPLOAD_PROFILE_PICTURE = BASE_URL + '/athlete/{athleteId}/profile/image';

export const SSP_FETCH_NEW_SESSION = BASE_URL + '/isp/profile/{profileID}/sport/{sportID}/session-types';
export const ISP_FETCH_LOCATION_LIST = BASE_URL + '/isp/profile/{profileID}/locations';
export const ISP_CREATE_SESSION = BASE_URL + '/isp/profile/{profileID}/session/{sessionID}/schedule';
export const SSP_RE_SCHEDULE_SESSION = BASE_URL + '/isp/profile/{profileID}/scheduled-session/{scheduledSessionId}/rescheduled-sessions';
export const ISP_INVITE_ATHLETE_URL = BASE_URL + '/isp/profile/{profileID}/scheduled-session/{scheduledSessionId}/invite-atheletes';
export const ISP_SCHEDULED_SESSION_CHANGE_LOCATION_URL = BASE_URL + '/isp/profile/{profileID}/scheduled-session/{scheduledSessionId}/change-location';
export const ISP_SESSION_ADD_NOTES = BASE_URL + '/isp/profile/{profileID}/scheduled-session/{scheduledSessionId}/session-notes';
export const ISP_OVERIDE_PRICE = BASE_URL + '/isp/profile/{profileID}/scheduled-session/{scheduledSessionId}/overide-price';
export const ISP_SESSION_BUFFER_URL = BASE_URL + '/isp/profile/{profileID}/scheduled-session/{scheduledSessionId}/session-buffer';
export const ISP_REPEAT_SESSION = BASE_URL + '/isp/profile/{profileID}/scheduled-session/{scheduledSessionId}/repeat-session';
export const ISP_CANCEL_SCHEDULED_SESSION_URL = BASE_URL + '/isp/profile/{profileID}/scheduled-session/{scheduledSessionId}/cancel-session';
export const SSP_FETCH_SCHEDULED_SESSION = BASE_URL + '/isp/profile/{profileID}/scheduled-sessions';
export const SSP_REMOVE_SESSION = BASE_URL + '/ssp/event/{eventID}';
export const ISP_OVERRIDE_SESSION_TOTAL_SLOTS_URL = BASE_URL + '/isp/profile/{profileID}/scheduled-session/{scheduledSessionId}/overide-total-slots';
export const ISP_SESSION_GROUP_SIZE_URL = BASE_URL + '/isp/profile/{profileID}/scheduled-session/{scheduledSessionId}/group-sizes';
export const ISP_SESSION_CHANGE_GROUP_SIZE_URL = BASE_URL + '/isp/profile/{profileID}/scheduled-session/{scheduledSessionId}/change-group-size';
export const ISP_SEARCH_ATHLETE_URL = BASE_URL + '/athletes?searchText={searchText}&limit=5';

export const ATHLETE_FETCH_SCHEDULED_SESSIONS = BASE_URL + '/{profileType}/{profileId}/scheduled-sessions?date={dateString}';
export const ATHLETE_FETCH_ORDER_SESSIONS = BASE_URL + '/{profileType}/{profileId}/order/{orderId}/session/{sessionId}/order-items';
export const ATHLETE_FETCH_AVAILABLE_SLOTS = BASE_URL + '/{profileType}/{profileId}/order/{orderItemId}/available-slots?date={dateString}';
export const ATHLETE_SCHEDULE_SESSION = BASE_URL + '/{profileType}/{profileId}/order/{orderItemId}/schedule';
export const ATHLETE_RESCHEDULE_SESSION = BASE_URL + '/{profileType}/{profileId}/order/{orderItemId}/schedule/{scheduleId}/re-schedule';
export const ATHLETE_FETCH_UNSCHEDULE_SESSION = BASE_URL + '/{profileType}/{profileId}/un-scheduled-sessions';
export const ATHLETE_FETCH_SESSION_HISTORY = BASE_URL + '/{profileType}/{profileId}/session-history';
export const ATHLETE_REPORT_INSTRUCTOR = BASE_URL + '/{profileType}/{profileId}/isp/{sspId}/report';
export const ATHLETE_FETCH_FUTURE_SESSIONS = BASE_URL + '/{profileType}/{profileId}/order/{orderId}/session/{sessionId}/upcoming-sessions';
export const ATHLETE_CANCEL_FUTURE_SESSIONS = BASE_URL + '/{profileType}/{profileId}/cancel-future-sessions';
export const ATHLETE_REQUEST_REFUND = BASE_URL + '/{profileType}/{profileId}/session/{sessionId}/request-refund';
export const ATHLETE_FETCH_SCHEDULE_CHANGES = BASE_URL + '/{profileType}/{profileId}/changed-sessions';
export const ATHLETE_CANCEL_SESSION = BASE_URL + '/{profileType}/{profileId}/session/{sessionId}/cancel-session';
  
export const ATHLETE_HANDLE_BOOKING_CHANGES = BASE_URL + '/profile/{profileType}/{profileId}/booking/{bookingId}/action';

export const ATHLETE_FETCH_SESSIONS_COUNT = BASE_URL + '/{profileType}/{profileId}/session-count ';
export const FETCH_VOLUME_DISCOUNTS = BASE_URL + '/isp/{profileId}/sport/{sportId}/training-type/{trainingTypeId}/discounts';

export const ISP_SCHEDULES_SETTINGS_URL = BASE_URL + '/isp/profile/{profileID}/sport/{sportId}/scheduler-settings';
export const FETCH_REASONS = BASE_URL + '/reasons/{event}';
export const EXPORT_ORDER_HISTORY = BASE_URL + '/profile/order/export/{fileType}?';

export const ISP_SCHEDULED_SESSIONS_URL = BASE_URL + '/isp/profile/{profileID}/scheduled-sessions?date={dateString}';

export const ISP_AVAILABLE_SESSION_SLOTS_URL = BASE_URL + '/isp/profile/{profileID}/scheduled-session/{scheduledSessionId}/sessions-slots?date={date}';

export const ISP_RESCHEDULE_SESSION_URL = BASE_URL + '/isp/profile/{profileID}/scheduled-session/{scheduledSessionId}/reschedule';

export const ISP_MANAGE_BOOKINGS_URL = BASE_URL + '/isp/profile/{profileID}/manage-bookings';

export const ISP_TRAINED_ATHLETES_URL = BASE_URL + '/isp/profile/{profileID}/trained-athletes';
export const ISP_SESSION_HISTORY_URL = BASE_URL + '/isp/profile/{profileID}/session-history';

export const ISP_SESSION_DETAILS_URL = BASE_URL + '/isp/profile/{profileID}/orders/{packageID}/sessions?athleteId={athleteId}';

// Export const BIOGRAPHY = BASE_URL + '/isp/profile/{profileId}/type/{type}/sport';
export const BIOGRAPHY = BASE_URL + '/isp/profile/{profileID}/bio/{type}/sport';
export const DELETE_BIOGRAPHY = BASE_URL + '/isp/profile/{profileID}/bio/{type}/{id}/sport';

// Export const SPORT_BIOGRAPHY = BASE_URL + '/isp/profile/{profileID}/type/{type}/sport/{sportID}';
export const SPORT_BIOGRAPHY = BASE_URL + '/isp/profile/{profileID}/bio/{type}/sport/{sportID}';
export const DELETE_SPORT_BIOGRAPHY = BASE_URL + '/isp/profile/{profileID}/bio/{type}/{id}/sport/{sportID}';
export const PARENT_PROFILE = BASE_URL + '/parent/{parentId}/child/{childId}/profile';

export const SSP_FETCH_LOCATION_LIST = BASE_URL + '/isp/profile/{profileID}/locations';
export const SSP_CHANGE_LOCATION = BASE_URL + '/isp/profile/{profileID}/scheduled-session/{scheduledSessionId}/change-location';
export const ISP_OVERIDE_TOTAL_SLOTS_URL = BASE_URL + '/isp/profile/{profileID}/scheduled-session/{scheduledSessionId}/overide-total-slots';
export const SSP_CANCEL_SESSION = BASE_URL + '/isp/profile/{profileID}/scheduled-session/{scheduledSessionId}/cancel-session';

export const ISP_DEGREE = 'isp-degree';
export const ISP_INSTITUTION = 'isp-institution';
export const ISP_CERTIFICATION = 'isp-certification';
export const ISP_AFFILIATION = 'isp-affiliation';
export const ISP_AWARD = 'isp-award';
export const ISP_TOOL = 'isp-tool';
export const ISP_ACCOMPLISHMENT = 'isp-accomplishment';
export const ISP_EXPERIENCE = 'isp-experience-desc';
export const ISP_EXPERIENCE_YEAR = 'isp-experience-year';
export const ISP_EXPERIENCE_COACHING = 'isp-experience-coaching-desc';
export const ISP_EXPERIENCE_PLAYING = 'isp-experience-playing-desc';

export const SSP_ORDER_FUND_SUMMARY = BASE_URL2 + '/isp/profile/{profileID}/fund-summary';
export const SSP_ORDER_PAYOUTS = BASE_URL2 + '/isp/profile/{profileID}/payouts';
export const SSP_ORDER_EARNINGS = BASE_URL2 + '/isp/profile/{profileID}/earnings';
export const SSP_FUND_TRANSFER_SETTINGS = BASE_URL2 + '/isp/profile/{profileID}/fund-withdraw-settings';
export const SSP_BANK_ACCOUNTS = BASE_URL2 + '/isp/profile/{profileID}/bank-accounts';
export const SSP_FUND_WITHDRAW_SETTINGS = BASE_URL2 + '/isp/profile/{profileID}/fund-withdraw-settings';

export const FETCH_SHOPPING_CART_TRANSACTION_SUMMARY = BASE_URL + '/payment/txn-summary/{txnId}';
export const INVITE_FRIENDS = '/isp/profile/{profileId}/scheduled-session/{scheduledSessionId}/invite-atheletes';
export const SHOPPING_CART_BILLING_ADDRESS = BASE_URL + '/payment/profile/{type}/billing-address';
export const SHOPPING_CART_SHIPPING_ADDRESS = BASE_URL + '/payment/shipping-address';

export const SHOPPING_CART_ITEMS_URL = BASE_URL + '/shopping-cart/{cartId}';
export const FETCH_SHOPPING_CART_TAX_SUMMARY = BASE_URL + '/tax-summary/{cartId}';
export const SHOPPING_CART_CHECKOUT = BASE_URL + '/check-out';
export const CREATE_SHOPPING_CART = BASE_URL + '/shopping-cart';
export const FETCH_SHOPPING_CART_ITEMS_COUNT = BASE_URL + '/shopping-cart/count';

export const ACTIVATE_PROFILE = BASE_URL + '/{type}/profile/{profileID}/activate';
export const ACTIVATE_PARENT_PROFILE = BASE_URL + '/parent/{parentId}/child/{childId}/activate';
export const MASTER_DATA_DAYS_OF_WEEK_URL = BASE_URL + '/days-of-week';
export const ISP_FETCH_WORKING_DAYS = BASE_URL + '/isp/profile/{profileId}/working-hours';
export const ISP_FETCH_SPORTS_LIST = BASE_URL + '/isp/profile/{profileId}/service-profiles';

export const ISP_SAVE_TRAINING_LOCATION = BASE_URL + '/ssp/training-locations'
export const ISP_UPDATE_TRAINING_LOCATION = BASE_URL + '/ssp/training-locations/{id}'
export const ISP_DELETE_TRAINING_LOCATION = BASE_URL + '/isp/profile/{profileId}/sport/{sportId}/training-location/{traininglocationId}';

export const SEARCH_URL = config.ssrUrl + '/search?locations={city}';
export const SEARCH_SPORT_URL = config.ssrUrl + '/sport?sports={sport}';

export const ISP_VERIFY_BUSINESS_EMAIL = BASE_URL + '/isp/profile/{profileId}/business/verify-email';
export const ISP_VERIFY_BUSINESS_EMAIL_OTP = BASE_URL + '/isp/profile/{profileId}/business/verify-otp';

export const ISP_VERIFY_EMAIL = BASE_URL + '/isp/profile/{profileId}/primary/email/verify';
export const ISP_VERIFY_EMAIL_OTP = BASE_URL + '/isp/profile/{profileId}/primary/email/verify-otp';

export const PARENT_VERIFY_EMAIL = BASE_URL + '/parent/{profileId}/primary/email/verify';
export const PARENT_VERIFY_EMAIL_OTP = BASE_URL + '/parent/{profileId}/primary/email/verify-otp';
export const ATHLETE_VERIFY_EMAIL = BASE_URL + '/athlete/profile/{profileId}/primary/email/verify';
export const ATHLETE_VERIFY_EMAIL_OTP = BASE_URL + '/athlete/profile/{profileId}/primary/email/verify-otp';

export const ISP_AVAILABLE_SESSION_TIME_SLOTS_URL = BASE_URL + '/isp/profile/{profileID}/sport/{sportId}/session/{sessionId}/available-slots?date={date}';

export const SSP_BOOKING_ACTION_URL = BASE_URL + '/profile/{profileType}/{profileId}/booking/{bookingId}/action';

export const ISP_BOOKING_SCHEDULED_SESSIONS_URL = BASE_URL + '/isp/profile/{profileID}/booking/{bookingId}/scheduled-sessions?date={date}';
export const POST_ATHLETE_SHORT_REG_FLOW = BASE_URL + '/athlete/{athleteId}/short-profile';
export const POST_PARENT_SHORT_REG_FLOW = BASE_URL + '/parent/{parentId}/child/{childId}/short-profile';

export const FETCH_PAYMENT_DETAILS = BASE_URL + '/payment/profile/{type}/details';
export const CHARGE_CARD = BASE_URL + '/payment/profile/{profileType}/charge';
export const VIEW_SSP_PROFILE = config.ssrUrl + '/instructors/{nickName}?p=1527684316';
export const VIEW_SSP_PROFILE_SPORT = config.ssrUrl + '/instructors/{nickName}/{sportID}?p=1527684316';
export const SEARCH_URL_WITH_SPORT_LOCATION = config.ssrUrl + '/search/sport?sports={sportName}&locations={location}';

export const FETCH_WALLET_SUMMARY = BASE_URL + '/payment/wallet-summary';
export const ATHLETE_PAYMENT_METHOD = BASE_URL + '/athlete/{profileId}/payment/method';
export const PARENT_PAYMENT_METHOD = BASE_URL + '/parent/{profileId}/payment/method';
export const PAYMENT_SOURCE = BASE_URL + '/payment/profile/{type}/save-source';
export const PAYMENT_SOURCE_DELETE = BASE_URL + '/payment/profile/{type}/delete-source/{sourceId}';
export const FETCH_PAYMENT_SUMMARY = BASE_URL + '/transaction/{transactionId}/payment-summary';

export const REORDER = BASE_URL + '/order/{orderId}';
export const FETCH_ISP_ORDER_FUTURE_SESSIONS_URL = BASE_URL + '/isp/profile/{profileID}/order/{orderId}/athlete/{athleteId}/upcoming-sessions';

export const SSP_CANCEL_FUTURE_SESSION_URL = BASE_URL2 + '/isp/profile/{profileID}/cancel-future-sessions';

export const SSP_REPORT_ATHLETE_URL = BASE_URL2 + '/isp/profile/{profileID}/athlete/{athleteId}/report';
