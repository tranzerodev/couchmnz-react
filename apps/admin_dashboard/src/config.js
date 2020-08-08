const configuration = require('./config.json');

const AppConstants = function () {
  this.HEADER = {
    header: {

      'Content-Type': 'application/json',
      'x-mock-access': '213b88a141b0a704287809735cd7db'
    }

  };

  this.baseURL = configuration.baseUrl;

  this.baseURL2 = 'http://10.1.1.2:3090/coachlist/';

  this.PROFILE_IMAGE_PATH = 'img/avatars/default-profile.jpg';
  this.DASHBOARD_LOGIN_URL = configuration.dashboardBaseUrl + '?token=';
  this.SSR_LOGIN_URL = configuration.ssrUrl;
  this.FETCH_JWT_TOKEN = this.baseURL + 'api/v1/admin/user/{userId}/login';
  this.LOGIN_AS = {
    KEY: 'showModal',
    VALUE: 'Y'
  };
  // Const env = process.env;
  // console.log('+++++++++++++++++++++++++++++++++', process);
  // this.baseURL = env.baseURL;

  // Institute
  this.INSTITUTE_URL = this.baseURL + 'api/v1/admin/institution';
  this.SEARCH_INSTITUTE_URL = this.INSTITUTE_URL + '?term=';

  // ORG
  this.ORG_URL = this.baseURL + 'api/v1/admin/organization';

  this.LOGIN_URL = this.baseURL + 'api/v1/admin/login';
  this.REGISTER_URL = this.baseURL + 'api/v1/admin/register';

  // Prog
  this.PROG_URL = this.baseURL + 'api/v1/admin/program';
  this.PROG_FILTER = this.PROG_URL + '/filter';

  this.GET_JWT_TOKEN = '/getdbauth?token={token}';

  // Geo Routes
  //Missing Local Region
  this.GET_MISSING_LOCAL_REGIONS = this.baseURL + 'api/v1/admin/missing-local-region';
  
  // Region
  this.WORLD_REGION_URL = this.baseURL + 'api/v1/admin/world-region';

  // Country
  this.COUNTRY_URL = this.baseURL + 'api/v1/admin/country';

  // State
  this.STATE_URL = this.baseURL + 'api/v1/admin/state';

  // Local region
  this.LOCAL_REGION_URL = this.baseURL + 'api/v1/admin/local-region';
  this.LOCAL_REGION_ID_URL = this.baseURL + 'api/v1/admin/local-region/{id}';

  // City
  this.CITY_URL = this.baseURL + 'api/v1/admin/city';

  // Timezone

  this.TIMEZONE = this.baseURL + 'api/v1/admin/timezone';

  // App-users
  this.APP_USERS = this.baseURL + 'api/v1/admin/users';
  this.APP_USER_PROFILES = this.baseURL + 'api/v1/admin/user/{userId}/profiles';
  this.APP_USER_ACCOUNT_DETAILS = this.baseURL + 'api/v1/admin/user/{userId}/account-details';
  this.DASHBOARD_LOGIN = this.baseURL + 'api/v1/admin/user/{userId}/login';
  this.APP_USER_ROLE_DEACTIVATE = this.baseURL + 'api/v1/admin/user/{userId}/profile/{profileType}/{profileId}/status';
  this.APP_USER_ISP_PROFILE_DISABLE = this.baseURL + 'api/v1/admin/user/{userId}/isp/{profileId}/sport/{sportId}/status';
  this.APP_USER_PARENT_PROFILE_DISABLE = this.baseURL + 'api/v1/admin/user/{userId}/parent/{profileId}/child/{childId}/status';
  this.APP_USER_VERFICATION_EMAIL = this.baseURL + 'api/v1/admin/user/{userId}/resend-verification-email';
  this.APP_USER_GENERATE_PASSWORD = this.baseURL + 'api/v1/admin/user/{userId}/generate-password';
  this.APP_USER_RESET_PASSWORD = this.baseURL + 'api/v1/admin/user/{userId}/force-reset-password';
  this.APP_USER_STATUS = this.baseURL + 'api/v1/admin/user/{userId}/status';
  this.APP_USER_ISP_PROFILE = this.baseURL + 'api/v1/admin/user/{userId}/isp/profile/{profileId}';
  this.APP_USER_ATHLETE_PROFILE = this.baseURL + 'api/v1/admin/user/{userId}/athlete/profile/{profileId}';
  this.APP_USER_PARENT_PROFILE = this.baseURL + 'api/v1/admin/user/{userId}/parent/profile/{profileId}';

  // Manage Sport
  this.GET_SPORTS = this.baseURL + 'api/v1/admin/sport';
  this.ADD_SPORT = this.baseURL + 'api/v1/admin/sport';
  this.EDIT_SPORT = this.baseURL + 'api/v1/admin/sport/{sportId}';
  this.UPDATE_SPORT = this.baseURL + 'api/v1/admin/sport/{sportId}/status';
  this.GET_SPORT = this.baseURL + 'api/v1/admin/sport/{sportId}';

  this.GET_TERMINOLOGIES = this.baseURL + 'api/v1/admin/terminology';
  this.ADD_TERMINOLOGY = this.baseURL + 'api/v1/admin/terminology';
  this.EDIT_TERMINOLOGY = this.baseURL + 'api/v1/admin/terminology/{id}';

  this.GET_STRUCTURES = this.baseURL + 'api/v1/admin/structures';
  this.ADD_STRUCTURE = this.baseURL + 'api/v1/admin/structure';
  this.EDIT_STRUCTURE = this.baseURL + 'api/v1/admin/structure/{id}';

  this.GET_SKILLS = this.baseURL + 'api/v1/admin/skill';
  this.UPDATE_SKILLS = this.baseURL + 'api/v1/admin/skills';
  this.ADD_SKILL = this.baseURL + 'api/v1/admin/skill';
  this.EDIT_SKILL = this.baseURL + 'api/v1/admin/skill/{id}';

  this.FAILED_AUDIT = this.baseURL + 'api/v1/admin/failed-audit-report';
  this.REGENERATE_FAILED_AUDIT = this.baseURL + 'api/v1/admin/failed-audit-report/regenerate';
  this.FLAGGED_SSPS = this.baseURL + 'api/v1/admin/flagged-ssps';
  this.FLAGGED_SSP = this.baseURL + 'api/v1/admin/flagged-ssp/{profileId}';
  this.FILTER_REASONS = this.baseURL + 'api/v1/admin/flagged-ssp/filter-reasons';
  this.FLAGGED_HISTORY = this.baseURL + 'api/v1/admin/flagged-ssp/{profileId}/history';
  this.BLOCKED_PROFILES = this.baseURL + 'api/v1/admin/blocked-profiles';

  this.GET_AGES = this.baseURL + 'api/v1/admin/age';
  this.UPDATE_AGES = this.baseURL + 'api/v1/admin/ages';
  this.ADD_AGE = this.baseURL + 'api/v1/admin/age';
  this.EDIT_AGE = this.baseURL + 'api/v1/admin/age/{id}';

  this.URL_GET_ROLES = this.baseURL + 'api/v1/admin/roles';

  this.USER_LIST_URL = this.baseURL + 'api/v1/admin/administrators';
  this.GET_PAYOUTS = this.baseURL + 'api/v1/admin/payouts';
  this.PAYOUT  = this.GET_PAYOUTS + '/{id}';
  this.PAYOUT_COMPLETE = this.PAYOUT + '/completed';
  this.tokenNameInLocalStorage = 'coachlistAuthToken';
  this.redirectUrl = '/#/login';
  this.tokenQueryStringName = 'token';

  this.DEFAULT_PAGE = 1;
  this.DEFAULT_PAGE_COUNT = 0;
  this.ITEMS_PER_PAGE = 50;
  this.googleApiKey = configuration.googleApiKey;
  this.googleMapUrl = 'https://maps.googleapis.com/maps/api/js?key={key}&libraries=geometry,places';
  this.defaultPosition = {
    lat: 38.68551,
    lng: -96.503906
  };
  this.defaultGeo = {
    address_components: [
      {
        long_name: 'United States',
        short_name: 'US',
        types: ['country', 'political']
      }
    ],
    formatted_address: 'United States',
    geometry: {
      bounds: {
        northeast: {
          lat: 71.5388001,
          lng: -66.885417
        },
        southwest: {
          lat: 18.7763,
          lng: 170.5957
        }
      },
      location: {
        lat: 37.09024,
        lng: -95.712891
      },
      location_type: 'APPROXIMATE',
      viewport: {
        northeast: {
          lat: 49.38,
          lng: -66.94
        },
        southwest: {
          lat: 25.82,
          lng: -124.39
        }
      }
    },
    place_id: 'ChIJCzYy5IS16lQRQrfeQ5K5Oxw',
    types: ['country', 'political']
  };
  this.defaultZoom = 3;
  this.minZoom = 2;
  this.zoomLevels = {
    region: 3,
    country: 4,
    state: 7,
    city: 15
  };
  this.REGION_MANGE = {
    EDIT: 'E',
    ADD: 'A'
  };
  this.REGION_TYPE = {
    WORLD: 'WR'
  };
  this.GOOGLE_MAPS_API = 'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={key}';
  this.GOOGLE_MAPS_API_TIMEZONE = 'https://maps.googleapis.com/maps/api/timezone/json?location={location}&timestamp={timestamp}&key={key}';
  this.DEBOUNCE_TIMEOUT = 500;
  this.ROLE_TYPE = {
    SUPERADMIN: 'SUPERADMIN',
    ADMIN: 'ADMIN',
    EDITOR: 'EDITOR',
    DEFAULT_ROLE: 'ADMIN'
  };
  this.USER_ROUTE = 'Manage Admins';
  this.ALL = 'all';
  this.ATHLETE = 'athlete';
  this.PARENT = 'parent';
  this.ISP = 'isp';
  this.CAMPS = 'camps';
  this.BUSINESS = 'business';
  this.SPORTS = 'sports';
  this.USER_ROLES = ['athlete', 'parent', 'isp'];
  this.ERROR_MSG = 'ERROR!!!Something went wrong.';
  this.SUCCESS_ROLE_DEACTIVATE = 'Role Deactivated Successfully!!';
  this.SUCCESS_ROLE_ACTIVATE = 'Role Activated Successfully!!';
  this.SUCCESS_PROFILE_DISABLE = 'Profile Disabled Successfully!!';
  this.SUCCESS_PROFILE_ENABLE = 'Profile Enabled Successfully!!';
  this.SUCCESS_EMAIL_AUTHORIZE = 'User Email Authorized Successfully!!';
  this.SUCCESS_USER_VERFICATION_EMAIL = 'User Verification Email Sent!!';
  this.SUCCESS_GENERATE_PASSWORD = 'User Password Generated Successfully!!';
  this.SUCCESS_RESET_PASSWORD = 'User Password Reset Successful!!';
  this.SUCCESS_USER_SUSPEND = 'User Suspended Successfully!!';
  this.SUCCESS_USER_ACTIVATE = 'User Activated Successfully!!';
  this.SUCCESS_RESET_EMAIL_VERIFY = 'User Reset Email Verification Successful!!';
  this.SUCCESS_TERMINOLOGY_ENABLED = 'Terminology Enabled!!';
  this.SUCCESS_TERMINOLOGY_DISABLED = 'Terminology Disabled!!';
  this.SUCCESS_SPECIALITY_ENABLED = 'Speciality Enabled!!';
  this.SUCCESS_SPECIALITY_DISABLED = 'Speciality Disabled!!';
  this.SUCCESS_SPORT_ENABLED = 'Sport Enabled!!';
  this.SUCCESS_SPORT_DISABLED = 'Sport Disabled!!';
  this.SUCCESS_SKILL_ENABLED = 'Skill Enabled!!';
  this.SUCCESS_SKILL_DISABLED = 'Skill Disabled!!';
  this.SUCCESS_AGE_ENABLED = 'Age Enabled!!';
  this.SUCCESS_AGE_DISABLED = 'Age Disabled!!';
  this.TOASTTIMEOUT = 3000;
  this.PROG_TYPE = [
    {key: 'certificate', value: 'Certificate'},
    {key: 'course', value: 'Course'},
    {key: 'licence', value: 'Licence'},
    {key: 'recognition', value: 'Recognition'},
    {key: 'module', value: 'Module'},
    {key: 'diploma', value: 'Diploma'}
  ];
  this.GEO_COVERAGES = [
    {key: 'Global', value: 'Global'},
    {key: 'Regional Global', value: 'Regional Global'},
    {key: 'Country', value: 'Country'},
    {key: 'Regional Country', value: 'Regional Country'},
    {key: 'State', value: 'State'},
    {key: 'Regional State', value: 'Regional State'},
    {key: 'certificate', value: 'City'}
  ];
  this.SERVICE_AREA_OPTIONS = [
    {key: 'Global/International', value: 'Global/International'},
    {key: 'National', value: 'National'},
    {key: 'State Level', value: 'State Level'},
    {key: 'Local', value: 'Local'}
  ];
  this.GERDER = [
    'A',
    'M',
    'F',
    'O'
  ];
};

module.exports = new AppConstants();
