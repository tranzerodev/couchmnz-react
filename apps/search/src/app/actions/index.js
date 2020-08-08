import * as types from '../constants/ActionTypes';
import {parseUrlTemplate} from '../utils/urlHelper';
import config from '../config';
import axios from '../../auth/AxiosInstance';
import * as WebConstants from '../constants/WebConstants';
import axiosInstance from 'axios';
import {getAuthHeader, isJwtTokenExists} from '../../auth/auth';
import {FETCH_ELASTIC_SEARCH_DATA_SORTED} from '../constants/ActionTypes';

const axios2 = axiosInstance.create();

const header = {
  auth: {
    username: config.esUserName,
    password: config.esPassword
  }
};

const mockHeader = {
  headers: {
    'x-mock-access': '9344660adcb03305e8a1cf745326d9'
  }
};

const multipart = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

export function addTodo(text) {
  return {type: types.ADD_TODO, text};
}

export function deleteTodo(id) {
  return {type: types.DELETE_TODO, id};
}

export function editTodo(id, text) {
  return {type: types.EDIT_TODO, id, text};
}

export function completeTodo(id) {
  return {type: types.COMPLETE_TODO, id};
}

export function completeAll() {
  return {type: types.COMPLETE_ALL};
}

export function clearCompleted() {
  return {type: types.CLEAR_COMPLETED};
}

export const addUser = user => {
  return {
    type: types.ADD_USER,
    user
  };
};

export const updateUser = user => {
  return {
    type: types.UPDATE_USER,
    user
  };
};

export const updateCoachIDs = coachID => {
  return {
    type: types.UPDATE_COACH_IDS,
    coachID
  };
};

export const updateCampIDs = campID => {
  return {
    type: types.UPDATE_CAMP_IDS,
    campID
  };
};

export const updateFitnessBusinessIDs = fitnessBusinessID => {
  return {
    type: types.UPDATE_FITNESS_BUSINESS_IDS,
    fitnessBusinessID
  };
};

export const updateOtherIDs = otherID => {
  return {
    type: types.UPDATE_OTHER_IDS,
    otherID
  };
};

export const updateAthleteIDs = athleteID => {
  return {
    type: types.UPDATE_ATHLETE_IDS,
    athleteID
  };
};

export const updateParentIDs = parentID => {
  return {
    type: types.UPDATE_PARENT_IDS,
    parentID
  };
};

export const clearUser = () => {
  return {
    type: types.CLEAR_USER
  };
};

export const setCountries = countries => {
  return {
    type: types.SET_COUNTRIES,
    countries
  };
};

export const addCountry = country => {
  return {
    type: types.ADD_COUNTRY,
    country
  };
};

export const clearCountries = () => {
  return {
    type: types.CLEAR_COUNTRY
  };
};

export const updateProfile = profile => {
  return {
    type: types.UPDATE_PROFILE,
    profile
  };
};

export const clearProfile = () => {
  return {
    type: types.CLEAR_PROFILE
  };
};

export const addPicture = (formData, params) => {
  const url = parseUrlTemplate(WebConstants.ISP_UPLOAD_PROFILE_PICTURE, params);
  return {
    type: types.ADD_PICTURE,
    payload: axios.post(url, formData, multipart)
  };
};

export const updatePicture = picture => {
  return {
    type: types.UPDATE_PICTURE,
    picture
  };
};

export const clearPicture = () => {
  return {
    type: types.CLEAR_PICTURE
  };
};

export const setImages = images => {
  return {
    type: types.SET_IMAGES,
    images
  };
};

export const removeImage = index => {
  return {
    type: types.REMOVE_IMAGE,
    index
  };
};

export const addImages = images => {
  return {
    type: types.ADD_IMAGES,
    images
  };
};

export const updateImage = (image, index) => {
  /* Console.log('image', image, 'index', index); */
  return {
    type: types.UPDATE_IMAGE,
    image,
    index
  };
};

export const clearImages = () => {
  return {
    type: types.CLEAR_IMAGES
  };
};

export const updateVideo = (video, index) => {
  return {
    type: types.UPDATE_VIDEO,
    video,
    index
  };
};

export const setVideos = videos => {
  return {
    type: types.SET_VIDEOS,
    videos
  };
};

export const removeVideo = index => {
  return {
    type: types.REMOVE_VIDEO,
    index
  };
};

export const addVideos = videos => {
  return {
    type: types.ADD_VIDEOS,
    videos
  };
};

export const clearVideos = () => {
  return {
    type: types.CLEAR_VIDEOS
  };
};

export const updateSport = profile => {
  return {
    type: types.UPDATE_SPORT,
    profile
  };
};

export const clearSports = () => {
  return {
    type: types.CLEAR_SPORTS
  };
};

export const updateSpecialization = (specialization, index) => {
  return {
    type: types.UPDATE_SPECIALIZATION,
    specialization,
    index
  };
};

export const addNewSport = () => {
  return {
    type: types.ADD_NEW_SPORT
  };
};

export const updateCertification = (profile, index) => {
  // Console.log('profile', profile, 'index', index);
  return {
    type: types.UPDATE_CERTIFICATION,
    profile,
    index
  };
};

export const clearCertifications = index => {
  return {
    type: types.CLEAR_CERTIFICATIONS,
    index
  };
};

export const addNewCertification = () => {
  return {
    type: types.ADD_NEW_CERTIFICATION
  };
};

export const updateDegree = (profile, index) => {
  return {
    type: types.UPDATE_DEGREE,
    profile,
    index
  };
};

export const clearDegrees = () => {
  return {
    type: types.CLEAR_DEGREES
  };
};

export const addNewDegree = () => {
  return {
    type: types.ADD_NEW_DEGREE
  };
};

export const updateSkilllevel = skillLevel => {
  return {
    type: types.UPDATE_SKILLLEVEL,
    skillLevel
  };
};

export const addSkilllevel = skillLevel => {
  return {
    type: types.ADD_SKILLLEVEL,
    skillLevel
  };
};

export const clearSkilllevels = () => {
  return {
    type: types.CLEAR_SKILLLEVELS
  };
};

export const updateGender = gender => {
  return {
    type: types.UPDATE_GENDER,
    gender
  };
};

export const clearGender = () => {
  return {
    type: types.CLEAR_GENDER
  };
};

export const updateTraining = training => {
  return {
    type: types.UPDATE_TRAINING,
    training
  };
};

export const updateService = service => {
  return {
    type: types.UPDATE_SERVICE,
    service
  };
};

export const clearTraining = () => {
  return {
    type: types.CLEAR_TRAINING
  };
};

export const clearService = () => {
  return {
    type: types.CLEAR_SERVICE
  };
};

export const updateAge = age => {
  return {
    type: types.UPDATE_AGE,
    age
  };
};

export const clearAges = () => {
  return {
    type: types.CLEAR_AGES
  };
};

export const updateListing = profile => {
  return {
    type: types.UPDATE_LISTING,
    profile
  };
};

export const clearListing = () => {
  return {
    type: types.CLEAR_LISTING
  };
};

export const addSession = data => {
  const url = parseUrlTemplate(WebConstants.ISP_UPLOAD_PROFILE_PICTURE, data);
  return {
    type: types.ADD_SESSION,
    payload: axios.post(url, {payload: data})
  };
};

export const updateSession = profile => {
  return {
    type: types.UPDATE_SESSION,
    profile
  };
};

export const updateDefaultSession = id => {
  return {
    type: types.UPDATE_DEFAULT_SESSION,
    id
  };
};

export const clearSession = () => {
  return {
    type: types.CLEAR_SESSION
  };
};

export const updateAccount = profile => {
  return {
    type: types.UPDATE_ACCOUNT,
    profile
  };
};

export const clearAccount = () => {
  return {
    type: types.CLEAR_ACCOUNT
  };
};

export const updateBookingPreferences = profile => {
  return {
    type: types.UPDATE_BOOKING_PREFERENCES,
    profile
  };
};

export const clearBookingPreferences = () => {
  return {
    type: types.CLEAR_BOOKING_PREFERENCES
  };
};

export const updatePayoutOption = profile => {
  return {
    type: types.UPDATE_PAYOUT_OPTION,
    profile
  };
};

export const clearPayoutOption = () => {
  return {
    type: types.CLEAR_PAYOUT_OPTION
  };
};

export const updateCurrency = profile => {
  return {
    type: types.UPDATE_CURRENCY,
    profile
  };
};

export const clearCurrency = () => {
  return {
    type: types.CLEAR_CURRENCY
  };
};

export const updateBusinessModel = profile => {
  return {
    type: types.UPDATE_BUSINESS_MODEL,
    profile
  };
};

export const clearBusinessModel = () => {
  return {
    type: types.CLEAR_BUSINESS_MODEL
  };
};

export const updateEvent = profile => {
  return {
    type: types.UPDATE_EVENT,
    profile
  };
};

export const clearEvents = () => {
  return {
    type: types.CLEAR_EVENTS
  };
};

export const addEvents = events => {
  return {
    type: types.ADD_EVENTS,
    events
  };
};

export const updateLocation = profile => {
  return {
    type: types.UPDATE_LOCATION,
    profile
  };
};

export const clearLocations = () => {
  return {
    type: types.CLEAR_LOCATIONS
  };
};

export const addLocation = location => {
  return {
    type: types.ADD_LOCATION,
    location
  };
};

export const updateBankDetails = profile => {
  return {
    type: types.UPDATE_BANK_DETAILS,
    profile
  };
};

export const clearBankDetails = () => {
  return {
    type: types.CLEAR_BANK_DETAILS
  };
};

export const updatePaypalDetails = profile => {
  return {
    type: types.UPDATE_PAYPAL_DETAILS,
    profile
  };
};

export const clearPaypalDetails = () => {
  return {
    type: types.CLEAR_PAYPAL_DETAILS
  };
};

export const updatePrice = profile => {
  return {
    type: types.UPDATE_PRICE,
    profile
  };
};

export const clearPrices = () => {
  return {
    type: types.CLEAR_PRICES
  };
};

export const updateTravelPreferences = profile => {
  return {
    type: types.UPDATE_TRAVEL_PREFERENCES,
    profile
  };
};

export const clearTravelPreferences = () => {
  return {
    type: types.CLEAR_TRAVEL_PREFERENCES
  };
};

export const updateAgesPricing = profile => {
  return {
    type: types.UPDATE_AGES_PRICING,
    profile
  };
};

export const updateSkilllevelsPricing = profile => {
  return {
    type: types.UPDATE_SKILLLEVELS_PRICING,
    profile
  };
};

export const addSkilllevelsPricing = profile => {
  return {
    type: types.ADD_SKILLLEVELS_PRICING,
    profile
  };
};

export const addAgesPricing = profile => {
  return {
    type: types.ADD_AGES_PRICING,
    profile
  };
};

export const addDiscount = profile => {
  return {
    type: types.ADD_DISCOUNT,
    profile
  };
};

export const updateSessionName = profile => {
  // Console.log('profile', profile);
  return {
    type: types.UPDATE_SESSION_NAME,
    profile
  };
};

export const clearSessionName = () => {
  return {
    type: types.CLEAR_SESSION_NAME
  };
};

export const setStates = states => {
  return {
    type: types.SET_STATES,
    states
  };
};

export const addState = state => {
  return {
    type: types.ADD_STATE,
    state
  };
};

export const clearStates = () => {
  return {
    type: types.CLEAR_STATES
  };
};

export const updateBusiness = profile => {
  return {
    type: types.UPDATE_BUSINESS,
    profile
  };
};

export const clearBusiness = () => {
  return {
    type: types.CLEAR_BUSINESS
  };
};

export const updateContact = profile => {
  return {
    type: types.UPDATE_CONTACT,
    profile
  };
};

export const updatePhones = profile => {
  return {
    type: types.UPDATE_PHONES,
    profile
  };
};

export const addPhone = profile => {
  return {
    type: types.ADD_PHONE,
    profile
  };
};

export const clearContact = () => {
  return {
    type: types.CLEAR_CONTACT
  };
};

export const setSessions = profile => {
  return {
    type: types.SET_SESSIONS,
    profile
  };
};

export const removeLocation = profile => {
  return {
    type: types.REMOVE_LOCATION,
    profile
  };
};

export const removeEvent = profile => {
  return {
    type: types.REMOVE_EVENT,
    profile
  };
};

export const removeDiscount = profile => {
  return {
    type: types.REMOVE_DISCOUNT,
    profile
  };
};

export const addMessageLabel = (profileID, label) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_LABEL_URL, {profileID});
  return {
    type: types.ADD_MESSAGE_LABEL,
    payload: axios.post(url, {label})
  };
};

export const sendMessage = (profileID, message) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_URL, {profileID});
  return {
    type: types.SEND_MESSAGE,
    payload: axios.post(url, message)
  };
};

export const saveToDrafts = (profileID, message) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_DRAFT_URL, {profileID});
  return {
    type: types.SAVE_MESSAGE_DRAFTS,
    payload: axios.post(url, message)
  };
};

export const clearSentMessageStatus = () => {
  return {
    type: types.CLEAR_SENT_MESSAGE_STATUS
  };
};

export const clearDraftMessageStatus = () => {
  return {
    type: types.CLEAR_DRAFT_MESSAGE_STATUS
  };
};

export const fetchInboxThreads = (profileID, filters) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_INBOX_URL, {profileID}, filters);
  return {
    type: types.FETCH_MESSAGE_THREADS,
    payload: axios.get(url)
  };
};

export const fetchSentThreads = (profileID, filters) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_SENT_URL, {profileID}, filters);
  return {
    type: types.FETCH_MESSAGE_THREADS,
    payload: axios.get(url)
  };
};

export const fetchStarredThreads = (profileID, filters) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_STARRED_URL, {profileID}, filters);
  return {
    type: types.FETCH_MESSAGE_THREADS,
    payload: axios.get(url)
  };
};

export const fetchUnreadThreads = (profileID, filters) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_UNREAD_URL, {profileID}, filters);
  return {
    type: types.FETCH_MESSAGE_THREADS,
    payload: axios.get(url)
  };
};

export const fetchArchivedThreads = (profileID, filters) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_ARCHIVED_URL, {profileID}, filters);
  return {
    type: types.FETCH_MESSAGE_THREADS,
    payload: axios.get(url)
  };
};

export const fetchTrashedThreads = (profileID, filters) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_TRASH_URL, {profileID}, filters);
  return {
    type: types.FETCH_MESSAGE_THREADS,
    payload: axios.get(url)
  };
};

export const fetchDraftMessages = (profileID, filters) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_DRAFT_URL, {profileID}, filters);
  return {
    type: types.FETCH_DRAFT_MESSAGES,
    payload: axios.get(url)
  };
};

export const changeMessagingProfile = profile => {
  return {
    type: types.CHANGE_MESSAGING_PROFILE,
    profile
  };
};

export const fetchUserProfiles = () => {
  const url = parseUrlTemplate(WebConstants.USER_PROFILES_URL);
  return {
    type: types.FETCH_USER_PROFILES,
    payload: axios.get(url)
  };
};

export const fetchThreadMessages = (profileID, threadId) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_THREAD_DETAILS_URL, {profileID, threadId});
  return {
    type: types.FETCH_SELECTED_THREAD,
    payload: axios.get(url)
  };
};

export const fetchRewards = profileID => {
  const url = parseUrlTemplate(WebConstants.REWARDS, profileID);
  return {
    type: types.FETCH_REWARDS,
    payload: axios.get(url)
  };
};

export const fetchProfile = profileID => {
  const url = parseUrlTemplate(WebConstants.SSP_PROFILE, {profileID});
  return {
    type: types.FETCH_PROFILE,
    payload: axios.get(url)
  };
};

export const fetchSports = () => {
  return {
    type: types.FETCH_SPORTS,
    payload: axios.get(config.baseURL + config.endpoints.metadata.sports.url, header)
  };
};

export const setLocations = locations => {
  return {
    type: types.SET_LOCATIONS,
    locations
  };
};
export const setTraining = trainings => {
  return {
    type: types.SET_TRAINING,
    trainings
  };
};
export const setService = services => {
  return {
    type: types.SET_SERVICES,
    services
  };
};
export const setGender = genders => {
  return {
    type: types.SET_GENDER,
    genders
  };
};
export const setAges = ages => {
  return {
    type: types.SET_AGES,
    ages
  };
};
export const setSkills = skills => {
  return {
    type: types.SET_SKILLS,
    skills
  };
};
export const setPricing = pricing => {
  return {
    type: types.SET_PRICING,
    pricing
  };
};
export const setSports = sports => {
  return {
    type: types.SET_SPORTS,
    sports
  };
};
export const setCertifications = certifications => {
  return {
    type: types.SET_CERTIFICATIONS,
    certifications
  };
};

export const setCertificationsList = profile => {
  return {
    type: types.SET_CERTIFICATIONS_LIST,
    profile
  };
};

export const setDegree = degree => {
  return {
    type: types.SET_DEGREE,
    degree
  };
};
export const setBusiness = business => {
  return {
    type: types.SET_BUSINESS,
    business
  };
};
export const setListing = listing => {
  return {
    type: types.SET_LISTING,
    listing
  };
};
export const fetchEarningStats = userID => {
  const url = parseUrlTemplate(WebConstants.EARNING_STATS, userID);
  return {
    type: types.FETCH_EARNING_STATS,
    payload: axios.get(url)
  };
};
export const fetchReviewStats = userID => {
  const url = parseUrlTemplate(WebConstants.REVIEW_STATS, userID);
  return {
    type: types.FETCH_REVIEW_STATS,
    payload: axios.get(url)
  };
};
export const fetchSessionStats = userID => {
  const url = parseUrlTemplate(WebConstants.SESSION_STATS, userID);
  return {
    type: types.FETCH_SESSION_STATS,
    payload: axios.get(url)
  };
};
export const fetchRewardsStats = userID => {
  const url = parseUrlTemplate(WebConstants.REWARDS_STATS, userID);
  return {
    type: types.FETCH_REWARDS_STATS,
    payload: axios.get(url)
  };
};

export const fetchMessageLabels = profileID => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_LABEL_URL, {profileID});
  return {
    type: types.FETCH_MESSAGE_LABEL,
    payload: axios.get(url)
  };
};

export const fetchLabelledThreads = (profileID, labelName, filters) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_LABEL_THREADS_URL, {profileID, labelName}, filters);
  return {
    type: types.FETCH_MESSAGE_THREADS,
    payload: axios.get(url)
  };
};

export const locationChange = ({action, location}) => {
  return {
    type: types.LOCATION_URL_CHANGE,
    data: {action, location}
  };
};

export const updateSelectedThread = (profileID, threadId) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_THREAD_DETAILS_URL, {profileID, threadId});
  return {
    type: types.GET_UPDATED_SELECTED_THREAD,
    payload: axios.get(url)
  };
};

export const setMessageThreadStarred = (profileID, threadId, starred) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_THREAD_DETAILS_URL, {profileID, threadId});
  return {
    type: types.STAR_MESSAGE_THREAD,
    payload: axios.post(url, {starred})
  };
};

export const archiveMessageThread = (profileID, threadId, archived) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_THREAD_DETAILS_URL, {profileID, threadId});
  return {
    type: types.ARCHIVE_MESSAGE_THREAD,
    payload: axios.post(url, {archived})
  };
};

export const updateMessageThreadLabels = (profileID, threadId, labels) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_THREAD_DETAILS_URL, {profileID, threadId});
  return {
    type: types.UPDATE_MESSAGE_THREAD_LABELS,
    payload: axios.post(url, {labels})
  };
};

export const trashMessageThread = (profileID, threadId, trash) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_THREAD_DETAILS_URL, {profileID, threadId});
  return {
    type: types.TRASH_MESSAGE_THREAD,
    payload: axios.post(url, {trash})
  };
};
export const inviteUsers = (data, userID) => {
  const url = parseUrlTemplate(WebConstants.INVITE_USERS, userID);
  return {
    type: types.INVITE_USERS,
    payload: axios.post(url, {...header, data})
  };
};
export const fetchRewardsHistory = params => {
  const url = parseUrlTemplate(WebConstants.FETCH_REWARDS_HISTORY, params);
  return {
    type: types.FETCH_REWARDS_HISTORY,
    payload: axios.get(url, header)
  };
};
export const filterChangeRewardHistory = params => {
  const url = parseUrlTemplate(WebConstants.FETCH_REWARDS_HISTORY, params);
  return {
    type: types.FILTER_CHANGE_REWARDS_HISTORY,
    payload: axios.get(url, header)
  };
};

export const postProfile = (data, {profileID}) => {
  const url = parseUrlTemplate(config.baseURL + config.endpoints.user.ssp.set.profile.url, {profileID});
  return {
    type: types.POST_PROFILE,
    payload: axios.post(url, {payload: data})
  };
};

export const pollMessageMetadata = profileID => {
  return {
    type: types.POLL_MESSAGES_METADATA,
    profileID
  };
};

export const fetchMessagesMetadata = profileID => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_METADATA_URL, {profileID});
  return {
    type: types.FETCH_MESSAGES_METADATA,
    payload: axios.get(url, header)
  };
};

export const threadListPageChange = (page, limit) => {
  return {
    type: types.THREAD_LIST_PAGE_CHANGE,
    page,
    limit
  };
};

export const fetchSportsList = () => {
  return {
    type: types.FETCH_SPORTS_LIST,
    payload: axios.get(config.baseURL + config.endpoints.metadata.sports.url, header)
  };
};

export const clearSportsList = () => {
  return {
    type: types.CLEAR_SPORTS_LIST
  };
};

export const fetchDegreesList = () => {
  return {
    type: types.FETCH_DEGREES_LIST,
    payload: axios.get(config.baseURL + config.endpoints.metadata.degrees.url, header)
  };
};

export const clearDegreesList = () => {
  return {
    type: types.CLEAR_DEGREES_LIST
  };
};

export const fetchCertificationsList = sportID => {
  return {
    type: types.FETCH_CERTIFICATIONS_LIST,
    payload: axios.get(config.baseURL + config.endpoints.metadata.certifications.url.replace('{sportID}', sportID), header)
  };
};

export const clearCertificationsList = () => {
  return {
    type: types.CLEAR_CERTIFICATIONS_LIST
  };
};

export const fetchInstitutionsList = () => {
  return {
    type: types.FETCH_INSTITUTIONS_LIST,
    payload: axios.get(config.baseURL + config.endpoints.metadata.institutions.url, header)
  };
};

export const clearInstitutionsList = () => {
  return {
    type: types.CLEAR_INSTITUTIONS_LIST
  };
};

export const fetchUserIDs = () => {
  const authHeader = getAuthHeader();
  return {
    type: types.FETCH_USER_IDS,
    payload: axios.get(WebConstants.FETCH_USER_IDS, {headers: authHeader})
  };
};

export const fetchCancellationPolicies = () => {
  console.log('fetchCancelationpolicies');
  return {
    type: types.FETCH_CANCELLATION_POLICIES,
    payload: axios.get(config.baseURL + config.endpoints.metadata.cancellationPolicies.url, header)
  };
};

export const fetchSkillsList = () => {
  return {
    type: types.FETCH_SKILLS_LIST,
    payload: axios.get(config.baseURL + config.endpoints.metadata.skills.url, header)
  };
};

export const fetchAgesList = () => {
  return {
    type: types.FETCH_AGES_LIST,
    payload: axios.get(config.baseURL + config.endpoints.metadata.ages.url, header)
  };
};

export const fetchTrainingList = sportID => {
  const url = parseUrlTemplate(WebConstants.SPORT_SUB_SSP_TYPES, {sportID});
  return {
    type: types.FETCH_TRAINING_LIST,
    payload: axios.get(url)
  };
};

export const clearCancellationPolicies = () => {
  return {
    type: types.CLEAR_CANCELLATION_POLICIES
  };
};

export const clearSkillsList = () => {
  return {
    type: types.CLEAR_SKILLS_LIST
  };
};

export const clearAgesList = () => {
  return {
    type: types.CLEAR_AGES_LIST
  };
};

export const clearTrainingList = () => {
  return {
    type: types.CLEAR_TRAINING_LIST
  };
};

export const fetchCountries = () => {
  return {
    type: types.FETCH_COUNTRIES,
    payload: axios.get(config.baseURL + config.endpoints.metadata.countries.url, header)
  };
};

export const fetchStates = countryID => {
  const url = parseUrlTemplate(config.baseURL + config.endpoints.metadata.states.url, countryID);
  return {
    type: types.FETCH_STATES,
    payload: axios.get(url, header)
  };
};

export const fetchLocations = profileID => {
  const url = parseUrlTemplate(config.baseURL + config.endpoints.user.ssp.locations.url, profileID);
  console.log('profileID', profileID, 'url', url);
  return {
    type: types.FETCH_LOCATIONS,
    payload: axios.get(url, header)
  };
};

export const fetchSessions = userID => {
  const url = parseUrlTemplate(config.baseURL + config.endpoints.user.ssp.sessions.url, userID);
  return {
    type: types.FETCH_SESSIONS,
    payload: axios.get(url, header)
  };
};

export const fetchEvents = () => {
  // Const url = parseUrlTemplate(config.baseURL + config.endpoints.user.ssp.events.url, userID);
  return {
    type: types.FETCH_EVENTS,
    payload: axios.get(config.baseURL + config.endpoints.user.ssp.events.url, header)
  };
};

export const setRating = averageRating => {
  return {
    type: types.SET_RATING,
    averageRating
  };
};

export const updateOfferTerminology = data => {
  return {
    type: types.UPDATE_OFFER_TERMINOLOGY,
    data
  };
};

export const activateDiscount = profile => {
  return {
    type: types.ACTIVATE_DISCOUNT,
    profile
  };
};

export const updateCancellationPolicy = profile => {
  return {
    type: types.UPDATE_CANCELLATION_POLICY,
    profile
  };
};

export const clearCancellationPolicy = () => {
  return {
    type: types.CLEAR_CANCELLATION_POLICY
  };
};

export const updateThreadReadStatus = (profileID, threadId) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_THREAD_DETAILS_URL, {profileID, threadId});
  return {
    type: types.UPDATE_THREAD_READ_STATUS,
    payload: axios.post(url, {unread: false})
  };
};
export const fetchNicknames = params => {
  const url = parseUrlTemplate(WebConstants.FETCH_NICKNAMES, params);
  return {
    type: types.FETCH_NICKNAMES,
    payload: axios.get(url, header)
  };
};

export const verifyNickname = data => {
  return {
    type: types.VERIFY_NICKNAME,
    payload: axios.post(WebConstants.VERIFY_NICKNAME, {payload: data})
  };
};

export const updateOverrideSessionLength = profile => {
  return {
    type: types.UPDATE_OVERRIDE_SESSION_LENGTH,
    profile
  };
};

export const updateOverrideBufferLength = profile => {
  return {
    type: types.UPDATE_OVERRIDE_BUFFER_LENGTH,
    profile
  };
};

export const fetchTimezones = params => {
  const url = parseUrlTemplate(WebConstants.FETCH_TIMEZONES, params);
  return {
    type: types.FETCH_TIMEZONES,
    payload: axios.get(url, header)
  };
};

export const validateBankPayoutDetails = data => {
  return {
    type: types.VALIDATE_BANK_PAYOUT_DETAILS,
    data
  };
};

export const sspBankPayoutDetailsSubmit = data => {
  return {
    type: types.SSP_BANK_PAYOUT_DETAILS_SUBMIT,
    data
  };
};

export const sspValidateTrainingLocation = data => {
  console.log('sspValidateTrainingLocation', 'data', data);
  return {
    type: types.SSP_VALIDATE_TRAINING_LOCATION,
    data
  };
};

export const sspTrainingLocationSubmit = data => {
  return {
    type: types.SSP_TRAINING_LOCATION_SUBMIT,
    data
  };
};

export const sspValidateTrainingLocations = data => {
  console.log('sspValidateTrainingLocations', 'data', data);
  return {
    type: types.SSP_VALIDATE_TRAINING_LOCATIONS,
    data
  };
};

export const sspTrainingLocationsSubmit = data => {
  return {
    type: types.SSP_TRAINING_LOCATIONS_SUBMIT,
    data
  };
};

export const sspValidatePaypalSettings = data => {
  return {
    type: types.SSP_VALIDATE_PAYPAL_SETTINGS,
    data
  };
};

export const sspPaypalDetailsSubmit = data => {
  return {
    type: types.SSP_PAYPAL_SETTINGS_SUBMIT,
    data
  };
};
export const sspValidatePayoutDetails = data => {
  return {
    type: types.SSP_VALIDATE_PAYOUT_DETAILS,
    data
  };
};

export const sspPayoutDetailsSubmit = data => {
  return {
    type: types.SSP_PAYOUT_DETAILS_SUBMIT,
    data
  };
};
export const sspValidateAccountDetails = data => {
  return {
    type: types.SSP_VALIDATE_ACCOUNT_DETAILS,
    data
  };
};

export const sspPayoutAccountSubmit = data => {
  return {
    type: types.SSP_ACCOUNT_DETAILS_SUBMIT,
    data
  };
};
export const sspValidateBookingPreference = data => {
  return {
    type: types.SSP_VALIDATE_BOOKING_PREFERENCE,
    data
  };
};

export const sspBookingPreferenceSubmit = data => {
  return {
    type: types.SSP_BOOKING_PREFERENCE_SUBMIT,
    data
  };
};

export const searchMessageRecipients = (profileID, search) => {
  const searchParam = `?search=${search}`;
  const url = parseUrlTemplate(WebConstants.MESSAGE_RECIPIENTS_URL, {profileID}, searchParam);
  return {
    type: types.SEARCH_MESSAGE_RECIPIENTS,
    payload: axios.get(url)
  };
};
export const sspValidateBusinessModel = data => {
  return {
    type: types.SSP_VALIDATE_BUSINESS_MODEL,
    data
  };
};

export const sspBusinessModelSubmit = data => {
  return {
    type: types.SSP_BUSINESS_MODEL_SUBMIT,
    data
  };
};

export const sspValidateBuildProfile = data => {
  return {
    type: types.SSP_VALIDATE_BUILD_PROFILE,
    data
  };
};

export const sspBuildProfileSubmit = data => {
  return {
    type: types.SSP_BUILD_PROFILE_SUBMIT,
    data
  };
};
export const sspValidateTrainingPreference = data => {
  return {
    type: types.SSP_VALIDATE_TRAINING_PREFERENCE,
    data
  };
};

export const sspTrainingPreferenceSubmit = data => {
  return {
    type: types.SSP_TRAINING_PREFERENCE_SUBMIT,
    data
  };
};

export const sspValidateTravelPreference = data => {
  return {
    type: types.SSP_VALIDATE_TRAVEL_PREFERENCE,
    data
  };
};

export const sspValidateListing = data => {
  return {
    type: types.SSP_VALIADATE_LISTING,
    data
  };
};

export const sspTravelPreferenceSubmit = data => {
  return {
    type: types.SSP_TRAVEL_PREFERENCE_SUBMIT,
    data
  };
};

export const sspListingSubmit = data => {
  return {
    type: types.SSP_LISTING_SUBMIT,
    data
  };
};

export const sspSetNickName = data => {
  return {
    type: types.SSP_SET_NICKNAME,
    data
  };
};

export const sspValidatePhotosAndVideos = data => {
  return {
    type: types.SSP_VALIDATE_PHOTOS_AND_VIDEOS,
    data
  };
};

export const sspPhotosAndVideosSubmit = data => {
  return {
    type: types.SSP_PHOTOS_AND_VIDEOS_SUBMIT,
    data
  };
};

export const sspValidateSessionName = data => {
  return {
    type: types.SSP_VALIDATE_SESSION_NAME,
    data
  };
};

export const sspSessionNameSubmit = data => {
  return {
    type: types.SSP_SESSION_NAME_SUBMIT,
    data
  };
};

export const sspValidateSession = data => {
  return {
    type: types.SSP_VALIDATE_SESSION,
    data
  };
};

export const sspSessionSubmit = data => {
  return {
    type: types.SSP_SESSION_SUBMIT,
    data
  };
};

export const sspValidateEvents = data => {
  return {
    type: types.SSP_VALIDATE_EVENTS,
    data
  };
};

export const sspSubmitEvents = data => {
  return {
    type: types.SSP_SUBMIT_EVENTS,
    data
  };
};

export const postSearchFilter = data => {
  return {
    type: types.POST_SEARCH_FILTER, data};
};
export const deleteMessageAttachment = (profileID, attachmentId) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_ATTACHMENT_DETAILS_URL, {profileID, attachmentId});
  return {
    type: types.DELETE_MESSAGE_ATTACHMENT,
    payload: axios.delete(url)
  };
};

export const sspValidateDiscount = data => {
  return {
    type: types.SSP_VALIDATE_DISCOUNT,
    data
  };
};

export const updateFilter = filter => {
  console.log('updateFilter ---> ', filter);
  return {
    type: types.UPDATE_FILTER,
    filter
  };
};

export const clearFilter = () => {
  return {
    type: types.CLEAR_FILTER
  };
};

export const updateAthlete = athlete => {
  return {
    type: types.UPDATE_ATHLETE,
    athlete
  };
};

export const clearAthlete = () => {
  return {
    type: types.CLEAR_ATHLETE
  };
};
export const updateTrainer = trainer => {
  return {
    type: types.UPDATE_TRAINER,
    trainer
  };
};

export const clearTrainer = () => {
  return {
    type: types.CLEAR_TRAINER
  };
};

export const updateFilterPrice = price => {
  return {
    type: types.UPDATE_FILTER_PRICE,
    price
  };
};

export const clearFilterPrice = () => {
  return {
    type: types.CLEAR_FILTER_PRICE
  };
};

export const updateFilterInstantBook = instantBook => {
  return {
    type: types.UPDATE_INSTAND_BOOK,
    instantBook
  };
};

export const clearFilterInstantBook = () => {
  return {
    type: types.CLEAR_INSTAND_BOOK
  };
};

export const updateFilterDistance = distance => {
  return {
    type: types.UPDATE_FILTER_DISTANCE,
    distance
  };
};

export const clearFilterDistance = () => {
  return {
    type: types.CLEAR_FILTER_DISTANCE
  };
};

export const updateFilterSortBy = sortBy => {
  return {
    type: types.UPDATE_FILTER_SORTBY,
    sortBy
  };
};

export const clearFilterSortBy = () => {
  return {
    type: types.CLEAR_FILTER_SORTBY
  };
};

export function onMarkerClick(marker) {
  return {
    type: 'MARKER_CLICK',
    marker
  };
}

export function addMarker(marker) {
  return {
    type: 'ADD_MARKER',
    marker
  };
}

/* For SSP Details Page */
export const fetchSSPSessions = (nickname, sportID, sspSessionQueryString) => {
  const url = parseUrlTemplate(WebConstants.FETCH_SSP_SESSIONS_URL, {nickname, sportID}, sspSessionQueryString);
  console.log(axios.get(url, header));
  return {
    type: types.FETCH_SSP_SESSIONS,
    payload: axios.get(url)};
};
export const fetchSSPProfile = (nickname, sportID) => {
  const urlTemplate = sportID ? WebConstants.FETCH_SSP_PROFILEDATA_SPORT : WebConstants.FETCH_SSP_PROFILEDATA_BASE;
  const url = parseUrlTemplate(urlTemplate, {nickname, sportID});
  const authHeader = getAuthHeader();
  const tokenExists = isJwtTokenExists();
  return {
    type: types.FETCH_SSP_PROFILEDATA,
    payload: tokenExists ? axios.get(url, {headers: authHeader}) : axios.get(url, {headers: authHeader})};
};

export const fetchSSPProfileAuth = (nickname, sportID) => {
  const urlTemplate = sportID ? WebConstants.FETCH_SSP_PROFILEDATA_SPORT : WebConstants.FETCH_SSP_PROFILEDATA_BASE;
  const url = parseUrlTemplate(urlTemplate, {nickname, sportID});
  const authHeader = getAuthHeader();
  return {
    type: types.FETCH_SSP_PROFILEDATA,
    payload: axios.get(url, {headers: authHeader})};
};

/* End of SSP Details Page definitions */

export const updateSelectedResult = data => {
  return {
    type: types.UPDATE_SELECTED_RESULT,
    data
  };
};

export const clearSelectedResult = () => {
  return {
    type: types.CLEAR_SELECTED_RESULT
  };
};

/* End of For SSP Details Page */

export const sspDiscountSubmit = data => {
  return {
    type: types.SSP_DISCOUNT_SUBMIT,
    data
  };
};

export const resetDiscount = () => {
  return {
    type: types.RESET_DISCOUNT
  };
};

export const setNewProfile = newProfileType => {
  return {
    type: types.SET_NEW_PROFILE,
    newProfileType
  };
};

export const postNewProfile = params => {
  const url = parseUrlTemplate(WebConstants.CREATE_PROFILE, params);
  return {
    type: types.CREATE_NEW_PROFILE,
    payload: axios.post(url)
  };
};

export const activateNewProfile = params => {
  const authHeader = getAuthHeader();
  const url = parseUrlTemplate(config.baseURL + '/api/v1' + config.endpoints.user.ssp.activate.url, params);
  return {
    type: types.ACTIVATE_NEW_PROFILE,
    payload: axios.post(url, {headers: authHeader})
  };
};

export const activateSport = (profileID, sportID) => {
  const authHeader = getAuthHeader();
  const url = parseUrlTemplate(WebConstants.ACTIVATE_SPORT_URL, {profileID, sportID});
  return {
    type: types.ACTIVATE_SPORT,
    payload: axios.post(url, {headers: authHeader})
  };
};

export const activateSportAndProfile = (profileID, sportID) => {
  const authHeader = getAuthHeader();
  const url = parseUrlTemplate(WebConstants.ACTIVATE_SPORT_AND_PROFILE_URL, {profileID, sportID});
  return {
    type: types.ACTIVATE_SPORT,
    payload: axios.post(url, {headers: authHeader})
  };
};

export const sspValidatePricing = data => {
  return {
    type: types.SSP_VALIDATE_PRICING,
    data
  };
};

export const sspValidateMultiplePricing = data => {
  return {
    type: types.SSP_VALIDATE_MULTIPLE_PRICING,
    data
  };
};

export const sspPricingSubmit = data => {
  return {
    type: types.SSP_PRICING_SUBMIT,
    data
  };
};

export const changeUpdateProfileStatus = status => {
  return {
    type: types.CHANGE_PROFILE_UPDATE_STATUS,
    status
  };
};

export const changeUpdateSportStatus = status => {
  return {
    type: types.CHANGE_SPORT_UPDATE_STATUS,
    status
  };
};

export const changeProfileActivationStatus = status => {
  return {
    type: types.CHANGE_PROFILE_ACTIVATION_STATUS,
    status
  };
};

export const uploadActionImages = (formData, params) => {
  const url = parseUrlTemplate(WebConstants.ISP_UPLOAD_ACTION_PICTURES, params);
  return {
    type: types.UPLOAD_ACTION_PICTURES,
    payload: axios.post(url, formData, multipart)
  };
};

export const setActionPictures = images => {
  return {
    type: types.SET_ACTION_PICTURES,
    images
  };
};
export const deleteActionImage = params => {
  const url = parseUrlTemplate(WebConstants.ISP_DELETE_ACTION_PICTURE, params);
  return {
    type: types.DELETE_ACTION_PICTURE,
    payload: axios.delete(url)
  };
};

export const updateActionPicture = (image, index) => {
  /* Console.log('image', image, 'index', index); */
  return {
    type: types.UPDATE_ACTION_PICTURE,
    image,
    index
  };
};

export const uploadActionVideos = (formData, params) => {
  const url = parseUrlTemplate(WebConstants.ISP_UPLOAD_ACTION_VIDEOS, params);
  return {
    type: types.UPLOAD_ACTION_VIDEOS,
    payload: axios.post(url, formData, multipart)
  };
};

export const setActionVideos = videos => {
  return {
    type: types.SET_ACTION_VIDEOS,
    videos
  };
};

export const deleteActionVideo = params => {
  const url = parseUrlTemplate(WebConstants.ISP_DELETE_ACTION_VIDEO, params);
  return {
    type: types.DELETE_ACTION_VIDEO,
    payload: axios.delete(url)
  };
};

export const updateNickname = profile => {
  return {
    type: types.UPDATE_NICKNAME,
    profile
  };
};

export const sspSetPresentNickName = data => {
  return {
    type: types.SSP_SET_PRESENT_NICKNAME,
    data
  };
};
export const setDisplayPicture = data => {
  return {
    type: types.SET_DISPLAY_PICTURE,
    data
  };
};
export const postActionImages = (data, params) => {
  const url = parseUrlTemplate(WebConstants.ISP_UPDATE_ACTION_IMAGES, params);
  return {
    type: types.POST_ACTION_IMAGES,
    payload: axios.post(url, {payload: {media: {images: data.images}}})
  };
};
export const postActionVideos = (data, params) => {
  const url = parseUrlTemplate(WebConstants.ISP_UPDATE_ACTION_VIDEOS, params);
  return {
    type: types.POST_ACTION_VIDEOS,
    payload: axios.post(url, {payload: {media: {videos: data.videos}}})
  };
};

export const fetchCitiesCountry = params => {
  const url = parseUrlTemplate(WebConstants.CITY_LIST_COUNTRY, params);
  return {
    type: types.FETCH_CITIES,
    payload: axios.get(url)
  };
};

export const clearCities = () => {
  return {
    type: types.CLEAR_CITIES
  };
};

export const fetchCitiesByState = params => {
  const url = parseUrlTemplate(WebConstants.CITY_LIST_STATE, params);
  return {
    type: types.FETCH_CITIES,
    payload: axios.get(url)
  };
};

export const setPaypalVerificationStatus = data => {
  return {
    type: types.SET_PAYPAL_VERIFICATION_STATUS,
    data
  };
};

export const verifyPaypalEmail = (params, data) => {
  console.log('PARAMS', params);
  const url = parseUrlTemplate(WebConstants.VERIFY_PAYPAL_EMAIL, params);
  return {
    type: types.VERIFY_PAYAPAL_EMAIL,
    payload: axios.post(url, {payload: data})
  };
};
export const verifyPaypalPin = (params, data) => {
  const url = parseUrlTemplate(WebConstants.VERIFY_PAYPAL_PIN, params);
  return {
    type: types.VERIFY_PAYAPAL_PIN,
    payload: axios.post(url, {payload: data})
  };
};

export const fetchGeoLocation = address => {
  const url = parseUrlTemplate(WebConstants.GOOGLE_MAPS_API, {address, key: config.googleApiKey});
  return {
    type: types.FETCH_GEO_LOCATION,
    payload: axios2({
      method: 'get',
      url,
      headers: {}
    })
  };
};

export const messageUploadImageCallBack = (file, profileID) => {
  const data = new FormData();
  data.append(config.messagingSystem.messageAttachment.imageAttachmentName, file);
  const imgageUploadUrl = parseUrlTemplate(WebConstants.MESSAGE_ATTACHMENT_IMAGE_URL, {profileID});
  return new Promise((resolve, reject) => {
    axios.post(imgageUploadUrl, data).then(response => {
      resolve(response.data.payload);
    }).catch(error => {
      console.log('error', error);
      reject(error);
    });
  });
};

export const postSession = (data, params) => {
  const url = parseUrlTemplate(WebConstants.ISP_UPDATE_SESSIONS, params);
  return {
    type: types.POST_SESSIONS,
    payload: axios.post(url, {payload: data})
  };
};

export const postEvents = data => {
  return {
    type: types.POST_EVENTS,
    payload: axios.post(config.baseURL + config.endpoints.user.ssp.set.event.url, {payload: data})
  };
};

export const updateCurrentTerminology = data => {
  return {
    type: types.UPDATE_CURRENT_TERMINOLOGY,
    data
  };
};

export const updateCurrentSpecializations = (specialization, id) => {
  return {
    type: types.UPDATE_CURRENT_SPECIALIZATIONS,
    specialization,
    id
  };
};

export const updateNewDegree = updatedData => {
  return {
    type: types.UPDATE_UNI_DEGREE,
    updatedData
  };
};

export const clearNewDegree = () => {
  return {
    type: types.CLEAR_UNI_DEGREE
  };
};

export const validateNewDegree = data => {
  return {
    type: types.NEW_DEGREE_VALIDATION,
    data
  };
};

export const submitNewDegree = data => {
  return {
    type: types.NEW_DEGREE_SUBMIT,
    data
  };
};

export const addNewUniDegree = data => {
  return {
    type: types.ADD_DEGREE,
    data
  };
};

export const updateCurrentSport = sport => {
  return {
    type: types.UPDATE_CURRENT_SPORT,
    sport
  };
};

export const clearCurrentSport = () => {
  return {
    type: types.CLEAR_CURRENT_SPORT
  };
};

export const fetchCurrentSport = ({profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.CURRENT_SPORT, {profileID, sportID});
  return {
    type: types.FETCH_CURRENT_SPORT,
    payload: axios.get(url, header)
  };
};

export const addNewDegreeToDb = (data, params) => {
  const url = parseUrlTemplate(WebConstants.ADD_NEW_DEGREE_TO_DB, params);
  return {
    type: types.ADD_NEW_DEGREE_TO_DB,
    payload: axios.post(url, {payload: data})
  };
};

export const deleteSport = params => {
  const url = parseUrlTemplate(WebConstants.ISP_DELETE_SPORT, params);
  return {
    type: types.DELETE_SPORT,
    payload: axios.delete(url)
  };
};

export const postCurrentSport = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(config.baseURL + config.endpoints.user.ssp.set.sports.url, {profileID, sportID});
  return {
    type: types.POST_CURRENT_SPORT,
    payload: axios.post(url, {payload: data})
  };
};

export const addNewInstitutionToDb = (data, params) => {
  const url = parseUrlTemplate(WebConstants.ADD_NEW_INSTITUTION_TO_DB, params);
  return {
    type: types.ADD_NEW_INSTITUTION_TO_DB,
    payload: axios.post(url, {payload: data})
  };
};

export const changePassword = (currentPassword, newPassword) => {
  const data = {
    currentPassword: btoa(currentPassword),
    newPassword: btoa(newPassword)
  };
  return {
    type: types.CHANGE_PASSWORD,
    payload: axios.post(WebConstants.CHANGE_PASSWORD_URL, data)
  };
};

export const deactivateAccount = profileID => {
  const url = parseUrlTemplate(WebConstants.DEACTIVATE_ACCOUNT, {profileID});
  return {
    type: types.DEACTIVATE_ACCOUNT,
    payload: axios.post(url)
  };
};

export const addNewSportsDegree = data => {
  return {
    type: types.ADD_SPORTS_DEGREE,
    data
  };
};

export const removeUniDegree = index => {
  return {
    type: types.REMOVE_UNI_DEGREE,
    index
  };
};

export const removeSportsDegree = index => {
  return {
    type: types.REMOVE_SPORTS_DEGREE,
    index
  };
};

export const fetchGenCertificationList = () => {
  return {
    type: types.FETCH_GEN_CERTIFICATIONS_LIST,
    payload: axios.get(WebConstants.FETCH_GEN_CERTIFICATIONS, header)
  };
};

export const updateNewCertifications = updatedData => {
  return {
    type: types.UPDATE_NEW_CERTIFICATION,
    updatedData
  };
};

export const clearNewCertification = () => {
  return {
    type: types.CLEAR_NEW_CERTIFICATION
  };
};

export const addNewCertificationToDb = (data, params) => {
  const url = parseUrlTemplate(WebConstants.ADD_NEW_CERTIFICATION_TO_DB, params);
  return {
    type: types.ADD_NEW_CERTIFICATION_TO_DB,
    payload: axios.post(url, {payload: data})
  };
};

export const addNewGenCertification = data => {
  return {
    type: types.ADD_NEW_GEN_CERTIFICATION,
    data
  };
};

export const removeGenCertification = index => {
  return {
    type: types.REMOVE_GEN_CERTIFICATION,
    index
  };
};

export const validateNewCertification = data => {
  return {
    type: types.NEW_CERTIFICATION_VALIDATION,
    data
  };
};

export const submitNewCertification = data => {
  return {
    type: types.NEW_CERTIFICATION_SUBMIT,
    data
  };
};

export const addNewSportsCertification = data => {
  return {
    type: types.ADD_NEW_SPORT_CERTIFICATION,
    data
  };
};

export const removeSportsCertification = index => {
  return {
    type: types.REMOVE_SPORT_CERTIFICATION,
    index
  };
};

export const setGenCertifications = certifications => {
  return {
    type: types.SET_GEN_CERTIFICATIONS,
    certifications
  };
};

export const clearNewCertificationValidation = () => {
  return {
    type: types.CLEAR_NEW_CERTIFICATION_VALIDATION
  };
};

export const fetchGenAwardsList = () => {
  return {
    type: types.FETCH_GEN_AWARDS_LIST,
    payload: axios.get(WebConstants.FETCH_GEN_AWARDS, header)
  };
};

export const updateNewAward = updatedData => {
  return {
    type: types.UPDATE_UNI_AWARD,
    updatedData
  };
};

export const clearNewAward = () => {
  return {
    type: types.CLEAR_UNI_AWARD
  };
};

export const validateNewAwards = data => {
  return {
    type: types.NEW_AWARD_VALIDATION,
    data
  };
};

export const submitNewAwards = data => {
  return {
    type: types.NEW_AWARD_SUBMIT,
    data
  };
};
export const clearNewAwardsValidation = () => {
  return {
    type: types.CLEAR_NEW_CERTIFICATION_VALIDATION
  };
};

export const removeGenAward = index => {
  return {
    type: types.REMOVE_GEN_AWARD,
    index
  };
};

export const addNewAward = data => {
  return {
    type: types.ADD_NEW_GEN_AWARD,
    data
  };
};

export const removeSportsAward = index => {
  return {
    type: types.REMOVE_SPORTS_AWARD,
    index
  };
};

export const addNewSportsAward = data => {
  return {
    type: types.ADD_SPORTS_AWARD,
    data
  };
};

export const setSportsAwardsList = data => {
  return {
    type: types.SET_SPORTS_AWARDS_LIST,
    data
  };
};

export const clearSportsAwardsList = data => {
  return {
    type: types.CLEAR_SPORTS_AWARDS_LIST,
    data
  };
};

export const addNewAwardToDb = (data, params) => {
  const url = parseUrlTemplate(WebConstants.ADD_NEW_AWARD_TO_DB, params);
  return {
    type: types.ADD_NEW_AWARD_TO_DB,
    payload: axios.post(url, {payload: data})
  };
};

export const setSportsAffiliations = data => {
  return {
    type: types.SET_SPORTS_AFFILIATION,
    data
  };
};

export const setGenAffiliations = data => {
  return {
    type: types.SET_GEN_AFFILIATION,
    data
  };
};

export const addNewGenAffiliation = data => {
  return {
    type: types.ADD_NEW_GEN_AFFILIATION,
    data
  };
};

export const addNewSportsAffiliation = data => {
  return {
    type: types.ADD_NEW_SPORTS_AFFILIATION,
    data
  };
};

export const removeGenAffiliation = index => {
  return {
    type: types.REMOVE_GEN_AFFILIATION,
    index
  };
};
export const removeSportsAffiliation = index => {
  return {
    type: types.REMOVE_SPORTS_AFFILIATION,
    index
  };
};

export const updateNewAffiliation = updatedData => {
  return {
    type: types.UPDATE_NEW_AFFILIATION,
    updatedData
  };
};
export const clearNewAffiliation = () => {
  return {
    type: types.CLEAR_NEW_AFFILIATION
  };
};

export const updateNewTool = updatedData => {
  return {
    type: types.UPDATE_NEW_TOOLS,
    updatedData
  };
};
export const clearNewTool = () => {
  return {
    type: types.CLEAR_NEW_CERTIFICATION_VALIDATION
  };
};

export const addNewGenTool = data => {
  return {
    type: types.ADD_NEW_GEN_TOOL,
    data
  };
};
export const addNewSportsTool = data => {
  return {
    type: types.ADD_NEW_SPORT_TOOL,
    data
  };
};
export const setGenTool = data => {
  return {
    type: types.SET_GEN_TOOLS,
    data
  };
};
export const setSportsTool = data => {
  return {
    type: types.SET_SPORTS_TOOLS,
    data
  };
};

export const removeGenTool = index => {
  return {
    type: types.REMOVE_GEN_TOOL,
    index
  };
};
export const removeSportsTool = index => {
  return {
    type: types.REMOVE_SPORTS_TOOL,
    index
  };
};

export const addNewToolToDb = (data, params) => {
  const url = parseUrlTemplate(WebConstants.ADD_NEW_TOOL_TO_DB, params);
  return {
    type: types.ADD_NEW_TOOL_TO_DB,
    payload: axios.post(url, {payload: data})
  };
};

export const fetchGenToolsList = () => {
  return {
    type: types.FETCH_GEN_TOOL_LIST,
    payload: axios.get(WebConstants.FETCH_GEN_TOOL_LIST, header)
  };
};

export const setSportsToolList = data => {
  return {
    type: types.SET_SPORTS_TOOL_LIST,
    data
  };
};

export const setSportsDegreesList = data => {
  return {
    type: types.SET_SPORTS_DEGREE_LIST,
    data
  };
};

export const clearSportsDegreesList = data => {
  return {
    type: types.CLEAR_SPORTS_DEGREES_LIST,
    data
  };
};

export const removeSession = params => {
  const url = parseUrlTemplate(config.baseURL + config.endpoints.user.ssp.delete.sessions.url, params);
  return {
    type: types.DELETE_SESSION,
    payload: axios.delete(url)
  };
};

export const deleteDiscount = ({profileID, discountID}) => {
// Export const deleteDiscount = ({profileID, discountID, sportID}) => {
  // const url = parseUrlTemplate(config.baseURL + config.endpoints.user.ssp.delete.discount.url, {profileID, discountID, sportID});
  const url = parseUrlTemplate(config.baseURL + config.endpoints.user.ssp.delete.discount.url, {profileID, discountID});
  return {
    type: types.DELETE_DISCOUNT,
    payload: axios.delete(url)
  };
};

export const deleteEvent = ({eventID}) => {
  const url = parseUrlTemplate(config.baseURL + config.endpoints.user.ssp.delete.event.url, {eventID});
  return {
    type: types.DELETE_EVENT,
    payload: axios.delete(url)
  };
};

export const setSportsStore = sport => {
  return {
    type: types.SET_SPORTS_STORE,
    sport
  };
};

export const setTravelPreferences = data => {
  return {
    type: types.SET_TRAVEL_PREFERENCES,
    data
  };
};

export const setContact = data => {
  return {
    type: types.SET_CONTACT,
    data
  };
};

export const setBusinessModel = data => {
  return {
    type: types.SET_BUSINESS_MODEL,
    data
  };
};

export const setBookingPreference = data => {
  return {
    type: types.SET_BOOKING_PREFERENCES,
    data
  };
};

export const setCancelationPolicy = data => {
  return {
    type: types.SET_CANCELATION_POLICY,
    data
  };
};

export const setPayoutOption = data => {
  return {
    type: types.SET_PAYOUT_OPTION,
    data
  };
};

export const setCurrency = data => {
  return {
    type: types.SET_CURRENCY,
    data
  };
};

export const setBankDetails = data => {
  return {
    type: types.SET_BANK_DETAILS,
    data
  };
};

export const setPaypalDetails = data => {
  return {
    type: types.SET_PAYPAL_DETAILS,
    data

  };
};

export const saveDataOnNext = (updateType, profile, sport) => {
  return {
    type: types.SAVE_DATA_ON_NEXT,
    updateType,
    data: {sport, profile}
  };
};

export const changeSaveDataOnNextStaus = (updateType, status) => {
  return {
    type: types.SAVE_DATA_ON_NEXT + status,
    updateType
  };
};

export const clearSaveDataOnNextStatus = () => {
  return {
    type: types.CLEAR_SAVE_DATA_ON_NEXT
  };
};

export const sspValidationClearSession = data => {
  return {
    type: types.CLEAR_SESSION_VALIDATION,
    data
  };
};

export const contactSSP = (data, nickname, sportID) => {
  const url = parseUrlTemplate(WebConstants.CONTACT_SSP, {sportID, nickname});
  return {
    type: types.CONTACTSSP_DETAIL,
    payload: axios.post(url, data)
  };
};
export const fetchSportsSuggestion = sportsKey => {
  return {
    type: types.FETCH_SPORT_SUGGESTION,
    sportsKey
  };
};

export const fetchSportsNameES = query => {
  const url = parseUrlTemplate(WebConstants.ELASTIC_SEARCH_URL);
  console.log('searchQuery ', query);
  return {
    type: types.FETCH_SPORT_SUGGESTION_ES,
    payload: axios2.post(url, query, header)
  };
};

export const fetchLocationsSuggestion = locationKey => {
  return {
    type: types.FETCH_LOCATION_SUGGESTION,
    locationKey
  };
};

export const fetchLocationsNameES = query => {
  const url = parseUrlTemplate(WebConstants.ELASTIC_SEARCH_URL);
  console.log('searchQuery ', query);
  return {
    type: types.FETCH_LOCATION_SUGGESTION_ES,
    payload: axios2.post(url, query, header)
  };
};

export const fetchElasticSearchData = query => {
  const url = parseUrlTemplate(WebConstants.ELASTIC_SEARCH_URL);
  console.log('searchQuery ', query);
  return {
    type: types.FETCH_ELASTIC_SEARCH_DATA,
    payload: axios2.post(url, query, header)
  };
};

export const fetchLocationReverseLookupData = () => {
  const url = parseUrlTemplate(WebConstants.LOCATION_LOOKUP_URL);
  return {
    type: types.FETCH_LOCATION_REVERSE_LOOKUP_DATA,
    payload: axios.get(url, mockHeader)
  };
};

export const changeSelectedLocation = selectedLocation => {
  return {
    type: types.CHANGE_SELECTED_LOCATION,
    selectedLocation
  };
};

export const changeSelectedProfile = selectedProfile => {
  return {
    type: types.CHANGE_SELECTED_PROFILE,
    selectedProfile
  };
};

export const fetchPopularSports = () => {
  return {
    type: types.FETCH_POPULAR_SPORTS,
    payload: axios.get(WebConstants.POPULAR_SPORTS)
  };
};

export const updateSportHitCount = sportNames => {
  return {
    type: types.UPDATE_SPORTS_HIT_COUNT,
    payload: axios.post(WebConstants.UPDATE_POPULAR_SPORT, {sports: sportNames})
  };
};

export const updateBrowserGPSPluginData = coords => {
  return {
    type: types.UPDATE_BROWSER_GPS_PLUGIN_DATA,
    coords
  };
};

export const fetchNearByLocations = locationValue => { // LocationValue can be loaction name or lat,lng must be string
  const url = parseUrlTemplate(WebConstants.NEARBY_LOCATION_URL, {locationValue});
  return {
    type: types.FETCH_NEARBY_LOCATIONS,
    payload: axios.get(url, mockHeader)
  };
};

export const fetchDiscountRates = () => {
  const url = parseUrlTemplate(WebConstants.FETCH_DISCOUNT_RATES);
  return {
    type: types.FETCH_DISCOUNT_RATES,
    payload: axios.get(url)
  };
};

export const fetchShoppingCartTaxSummary = cartId => {
  const url = parseUrlTemplate(WebConstants.FETCH_SHOPPING_CART_TAX_SUMMARY, {cartId});
  return {
    type: types.FETCH_SHOPPING_CART_TAX_SUMMARY,
    payload: axios.get(url)
  };
};

export const shoppingCartCheckout = query => {
  const url = parseUrlTemplate(WebConstants.SHOPPING_CART_CHECKOUT, {}, query);
  return {
    type: types.SHOPPING_CART_CHECKOUT,
    payload: axios.post(url)
  };
};

export const createShoppingCart = data => {
  const url = parseUrlTemplate(WebConstants.CREATE_SHOPPING_CART);
  return {
    type: types.CREATE_SHOPPING_CART,
    payload: axios.post(url, data)
  };
};

export const updateShoppingCartItems = ({action, data}, cartId) => {
  const url = parseUrlTemplate(WebConstants.SHOPPING_CART_ITEMS_URL, {cartId});
  return {
    type: types.UPDATE_SHOPPING_CART_ITEMS,
    payload: axios.put(url, {action, data})
  };
};

export const fetchShoppingCartItems = ({cartId}) => {
  const url = parseUrlTemplate(WebConstants.SHOPPING_CART_ITEMS_URL, {cartId});
  return {
    type: types.FETCH_SHOPPING_CART_ITEMS,
    payload: axios.get(url)
  };
};

export const signUp = data => {
  return {
    type: types.SIGN_UP,
    payload: axios.post(WebConstants.SIGN_UP, data),
    meta: data.email
  };
};

export const login = data => {
  return {
    type: types.LOGIN,
    payload: axios.post(WebConstants.LOGIN, data),
    meta: data.email
  };
};

export const verifyOTP = data => {
  return {
    type: types.VERIFY_OTP,
    payload: axios.post(WebConstants.VERIFY_OTP, data)
  };
};

export const resendEmailVerificationOTP = data => {
  return {
    type: types.RESEND_EMAIL_VERIFICATION_OTP,
    payload: axios.post(WebConstants.RESEND_EMAIL_VERIFICATION_OTP, data)
  };
};

export const fetchTOS = () => {
  return {
    type: types.FETCH_TOS,
    payload: axios.get(WebConstants.FETCH_TOS)
  };
};

export const checkEmailAvailability = data => {
  return {
    type: types.CHECK_EMAIL_AVAILABILITY,
    payload: axios.post(WebConstants.CHECK_EMAIL_AVAILABILITY, data)
  };
};

export const fetchUserInfo = () => {
  return {
    type: types.FETCH_BASIC_USER_INFO,
    payload: axios.get(WebConstants.FETCH_BASIC_USER_INFO)
  };
};

export const logout = () => {
  return {
    type: types.LOGOUT
  };
};

export const sortedElasticSearchData = data => {
  return {
    type: FETCH_ELASTIC_SEARCH_DATA_SORTED,
    data
  };
};
