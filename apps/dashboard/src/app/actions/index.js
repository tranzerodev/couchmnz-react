import * as types from '../constants/ActionTypes';
import {parseUrlTemplate} from '../utils/urlHelper';
import config from '../config';
import axios from '../../auth/AxiosInstance';
import * as WebConstants from '../constants/WebConstants';
import axiosInstance from 'axios';
import appConstants from '../constants/appConstants';
const axios2 = axiosInstance.create();

const header = {
  headers: {

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

export const updateListing = (profile, updateType) => {
  return {
    type: types.UPDATE_LISTING,
    profile,
    updateType
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

export const updateLocation = (profile, updateType) => {
  return {
    type: types.UPDATE_LOCATION,
    profile,
    updateType
  };
};

export const clearLocations = () => {
  return {
    type: types.CLEAR_LOCATIONS
  };
};

export const addLocation = (location, updateType) => {
  return {
    type: types.ADD_LOCATION,
    location,
    updateType
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

export const updatePaypalDetails = (profile, updateType) => {
  return {
    type: types.UPDATE_PAYPAL_DETAILS,
    profile,
    updateType
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

export const updateTravelPreferences = (profile, updateType) => {
  return {
    type: types.UPDATE_TRAVEL_PREFERENCES,
    profile,
    updateType
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

export const removeLocation = ({profileId, sportId, traininglocationId}) => {
  const url = parseUrlTemplate(WebConstants.ISP_DELETE_TRAINING_LOCATION, {profileId, sportId, traininglocationId});

  return {
    type: types.REMOVE_LOCATION,
    payload: axios.delete(url)
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

export const fetchProfile = ({profileID}) => {
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
export const setServices = services => {
  return {
    type: types.SET_SERVICE,
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

export const pollShoppingCartdata = data => {
  return {
    type: types.POLL_SHOPPING_CART_DATA,
    data
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
    payload: axios.get(config.baseURL + config.endpoints.metadata.degrees.url.replace('/{sportID}', ''), header)
  };
};

export const fetchSportsDegreesList = sportID => {
  return {
    type: types.FETCH_SPORTS_DEGREES_LIST,
    payload: axios.get(parseUrlTemplate(config.baseURL + config.endpoints.metadata.degrees.url, {sportID}))
  };
};

export const clearDegreesList = () => {
  return {
    type: types.CLEAR_DEGREES_LIST
  };
};

export const fetchCertificationsList = () => {
  return {
    type: types.FETCH_CERTIFICATIONS_LIST,
    payload: axios.get(config.baseURL + config.endpoints.metadata.certifications.url.replace('/{sportID}', ''), header)
  };
};

export const fetchSportsCertificationsList = sportID => {
  return {
    type: types.FETCH_SPORTS_CERTIFICATIONS_LIST,
    payload: axios.get(parseUrlTemplate(config.baseURL + config.endpoints.metadata.certifications.url, {sportID}))
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
  return {
    type: types.FETCH_USER_IDS,
    payload: axios.get(WebConstants.FETCH_USER_IDS, header)
  };
};
export const fetchCancellationPolicies = () => {
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

export const fetchNewSessions = ({profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SSP_FETCH_NEW_SESSION, {profileID, sportID});
  return {
    type: types.FETCH_SESSIONS_NEW,
    payload: axios.get(url)
  };
};

export const fetchReasons = event => {
  const url = parseUrlTemplate(WebConstants.FETCH_REASONS, event);
  return {
    type: types.FETCH_REASONS,
    payload: axios.get(url, header)
  };
};

export const ispFetchLocations = profileID => {
  const url = parseUrlTemplate(WebConstants.ISP_FETCH_LOCATION_LIST, {profileID});
  return {
    type: types.ISP_FETCH_LOCATION,
    payload: axios.get(url, header)
  };
};

export const updateScheduleSettings = (profileID, sportId, data) => {
  const url = parseUrlTemplate(WebConstants.ISP_SCHEDULES_SETTINGS_URL, {profileID, sportId});
  return {
    type: types.UPDATE_ISP_SCHEDULE_SETTINGS,
    payload: axios.post(url, data)
  };
};

export const fetchScheduleSettings = profileID => {
  const url = parseUrlTemplate(WebConstants.ISP_SCHEDULES_SETTINGS_URL, {profileID});
  return {
    type: types.FETCH_ISP_SCHEDULE_SETTINGS,
    payload: axios.get(url)
  };
};

export const createNewSession = (profileID, sessionID, {date, startTime, endTime, overridePricing, totalSlots}) => {
  const url = parseUrlTemplate(WebConstants.ISP_CREATE_SESSION, {profileID, sessionID});
  return {
    type: types.CREATE_NEW_SCHEDULED_SESSION,
    payload: axios.post(url, {date, startTime, endTime, overridePricing, totalSlots})
  };
};

export const ssRescheduleSession = (params, data) => {
  const url = parseUrlTemplate(WebConstants.SSP_RE_SCHEDULE_SESSION, params);
  return {
    type: types.RE_SCHEDULE_SESSION,
    payload: axios.post(url, {payload: data})
  };
};

export const ispInviteAthelete = (profileID, scheduledSessionId, data) => {
  const url = parseUrlTemplate(WebConstants.ISP_INVITE_ATHLETE_URL, {profileID, scheduledSessionId});
  return {
    type: types.ISP_INVITE_ATHLETE,
    payload: axios.post(url, data)
  };
};

export const ispChangeScheduledSessionLocation = (profileID, scheduledSessionId, trainingLocationId) => {
  const url = parseUrlTemplate(WebConstants.ISP_SCHEDULED_SESSION_CHANGE_LOCATION_URL, {profileID, scheduledSessionId});
  return {
    type: types.ISP_SCHEDULES_SESSION_CHANGE_LOCATION,
    payload: axios.post(url, {trainingLocationId})
  };
};

export const ispAddSessionNotes = (profileID, scheduledSessionId, notes) => {
  const url = parseUrlTemplate(WebConstants.ISP_SESSION_ADD_NOTES, {profileID, scheduledSessionId});
  return {
    type: types.ISS_ADD_SESSION_NOTES,
    payload: axios.post(url, {notes})
  };
};

export const ispUpdateSessionOveridePrice = (profileID, scheduledSessionId, overridePrice, priceUnit) => {
  const url = parseUrlTemplate(WebConstants.ISP_OVERIDE_PRICE, {profileID, scheduledSessionId});
  return {
    type: types.ISP_UPDATE_OVERIDE_PRICE,
    payload: axios.post(url, {priceUnit, price: overridePrice})
  };
};

export const removeScheduledSession = eventID => {
  const url = parseUrlTemplate(WebConstants.SSP_REMOVE_SESSION, {eventID});
  return {
    type: types.ISP_REMOVE_SCHEDULE,
    payload: axios.delete(url)
  };
};

export const ispUpdateSessionBuffer = (profileID, scheduledSessionId, sessionBuffer) => {
  const url = parseUrlTemplate(WebConstants.ISP_SESSION_BUFFER_URL, {profileID, scheduledSessionId});
  return {
    type: types.ISP_UPDATE_SESSION_BUFFER,
    payload: axios.post(url, {minutes: sessionBuffer})
  };
};

export const ispUpdateOpenPositions = (profileID, scheduledSessionId, totalSlots) => {
  const url = parseUrlTemplate(WebConstants.ISP_OVERIDE_TOTAL_SLOTS_URL, {profileID, scheduledSessionId});
  return {
    type: types.ISP_UPDATE_TOTAL_SLOTS,
    payload: axios.post(url, {totalSlots})
  };
};

export const ispRepeatSession = (profileID, scheduledSessionId, data) => {
  const url = parseUrlTemplate(WebConstants.ISP_REPEAT_SESSION, {profileID, scheduledSessionId});
  return {
    type: types.ISP_REPEAT_SESSION,
    payload: axios.post(url, data)
  };
};

export const ispCancelScheduledSession = (profileID, scheduledSessionId, {reasonId, message}) => {
  const url = parseUrlTemplate(WebConstants.ISP_CANCEL_SCHEDULED_SESSION_URL, {profileID, scheduledSessionId});
  return {
    type: types.ISP_CANCEL_SCHEDULED_SESSION,
    payload: axios.post(url, {reasonId, message})
  };
};

export const fetchScheduledSessions = (profileID, dateString) => {
  const url = parseUrlTemplate(WebConstants.ISP_SCHEDULED_SESSIONS_URL, {profileID, dateString});

  return {
    type: types.FETCH_SCHEDULE_SESSIONS,
    payload: axios.get(url, header)
  };
};

export const fetchManageBookings = (profileID, filters) => {
  const url = parseUrlTemplate(WebConstants.ISP_MANAGE_BOOKINGS_URL, {profileID}, `?${filters}`);
  return {
    type: types.FETCH_MANAGE_BOOKINGS,
    payload: axios.get(url, header)
  };
};

export const fetchSessionHistory = (profileID, filters) => {
  const url = parseUrlTemplate(WebConstants.ISP_SESSION_HISTORY_URL, {profileID}, `?${filters}`);
  return {
    type: types.FETCH_SESSION_HISTORY,
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

export const verifyNickname = nickname => {
  return {
    type: types.VERIFY_NICKNAME,
    payload: axios.post(WebConstants.VERIFY_NICKNAME, {payload: {nickname}})
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
  const url = parseUrlTemplate(WebConstants.FETCH_TIMEZONES, {}, params);
  // Const url = parseUrlTemplate(WebConstants.FETCH_TIMEZONES_BY_COUNTRY, params);
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
  const url = parseUrlTemplate(config.baseURL + config.endpoints.user.ssp.activate.url, params);
  return {
    type: types.ACTIVATE_NEW_PROFILE,
    payload: axios.post(url)
  };
};

export const activateAthleteProfile = params => {
  const url = parseUrlTemplate(WebConstants.ACTIVATE_PROFILE, params);
  return {
    type: types.ACTIVATE_NEW_PROFILE,
    payload: axios.post(url)
  };
};

export const activateParentProfile = params => {
  const url = parseUrlTemplate(WebConstants.ACTIVATE_PARENT_PROFILE, params);
  return {
    type: types.ACTIVATE_NEW_PROFILE,
    payload: axios.post(url)
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

export const changeUploadActionPictureStatus = status => {
  return {
    type: types.CHANGE_UPLOAD_ACTION_PICTURE_STATUS,
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
export const postActionImages = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.ISP_UPDATE_ACTION_IMAGES, {profileID, sportID});
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
  const url = parseUrlTemplate(WebConstants.CHANGE_PASSWORD_URL)
  const data = {
    currentPassword: btoa(currentPassword),
    newPassword: btoa(newPassword)
  };
  return {
    type: types.CHANGE_PASSWORD,
    payload: axios.post(url, data)
  };
};

export const deactivateAccount = profileID => {
  const url = parseUrlTemplate(WebConstants.DEACTIVATE_ACCOUNT, {profileID});
  return {
    type: types.DEACTIVATE_ACCOUNT,
    payload: axios.post(url)
  };
};

export const deactivateAthleteAccount = athleteId => {
  const url = parseUrlTemplate(WebConstants.DEACTIVATE_ATHLETE_ACCOUNT, {athleteId});
  return {
    type: types.DEACTIVATE_ATHLETE_ACCOUNT,
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

export const validateNewTool = data => {
  return {
    type: types.NEW_TOOL_VALIDATION,
    data
  };
};

export const submitNewTool = data => {
  return {
    type: types.NEW_TOOL_SUBMIT,
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

export const fetchGenAwardsList = sportID => {
  const id = (sportID === undefined) ? '' : '/' + sportID;
  return {
    type: types.FETCH_GEN_AWARDS_LIST,
    payload: axios.get(config.baseURL + config.endpoints.metadata.awards.url.replace('/{sportID}', id), header)
  };
};

export const fetchSportsAwardsList = ({sportID}) => {
  const url = parseUrlTemplate(config.baseURL + config.endpoints.metadata.awards.url, {sportID});
  return {
    type: types.FETCH_SPORTS_AWARDS_LIST,
    payload: axios.get(url, header)
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

export const fetchAffiliationsList = () => {
  return {
    type: types.FETCH_AFFILIATION_LIST,
    payload: axios.get(config.baseURL + config.endpoints.metadata.affiliations.url.replace('/{sportID}', ''), header)
  };
};

export const fetchSportsAffiliationsList = sportID => {
  return {
    type: types.FETCH_SPORTS_AFFILIATION_LIST,
    payload: axios.get(config.baseURL + config.endpoints.metadata.affiliations.url.replace('{sportID}', sportID), header)
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

export const setGenAwards = data => {
  return {
    type: types.SET_GEN_AWARDS,
    data
  };
};

export const fetchToolsList = () => {
  return {
    type: types.FETCH_TOOLS_LIST,
    payload: axios.get(config.baseURL + config.endpoints.metadata.tools.url.replace('/{sportID}', ''), header)
  };
};

export const fetchSportsToolsList = sportID => {
  return {
    type: types.FETCH_SPORTS_TOOLS_LIST,
    payload: axios.get(parseUrlTemplate(config.baseURL + config.endpoints.metadata.tools.url, {sportID}))
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
    type: types.CLEAR_NEW_TOOL_VALIDATION
  };
};

export const updateNewSportsTool = updatedData => {
  return {
    type: types.UPDATE_NEW_SPORTS_TOOLS,
    updatedData
  };
};

export const submitNewSportsTool = updatedData => {
  return {
    type: types.NEW_SPORTS_TOOL_SUBMIT,
    updatedData
  };
};
export const clearNewSportsTool = () => {
  return {
    type: types.CLEAR_NEW_SPORTS_TOOL_VALIDATION
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
export const setGenTools = data => {
  return {
    type: types.SET_GEN_TOOLS,
    data
  };
};
export const setSportsTools = data => {
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
    payload: axios.get(config.baseURL + config.endpoints.metadata.tools.url.replace('/{sportID}', ''), header)
  };
};

export const setSportsDegrees = data => {
  return {
    type: types.SET_SPORTS_DEGREE,
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

export const deleteDiscount = ({profileID, sportID, subSSPTypeID, discountID}) => {
  // Export const deleteDiscount = ({profileID, discountID, sportID}) => {
  // const url = parseUrlTemplate(config.baseURL + config.endpoints.user.ssp.delete.discount.url, {profileID, discountID, sportID});
  const url = parseUrlTemplate(config.baseURL + config.endpoints.user.ssp.delete.discount.url, {profileID, sportID, subSSPTypeID, discountID});
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

export const saveTrainingPreferences = ({skillLevels, ages, genders, trainings, services}, updateType) => {
  return {
    type: types.SAVE_TRINING_PREFERENCES,
    skillLevels,
    ages,
    genders,
    trainings,
    services,
    updateType
  };
};

export const savePrice = ({price}, updateType) => {
  return {
    type: types.SAVE_PRICE,
    price,
    updateType
  };
};

export const saveBuildProfile = ({id, name, specializations, coachingExperience, offerTerminology, playingExperience}, updateType) => {
  return {
    type: types.SAVE_BUILD_PROFILE,
    id,
    name,
    specializations,
    coachingExperience,
    offerTerminology,
    playingExperience,
    updateType
  };
};

export const saveTrainingLocations = (data, updateType) => {
  return {
    type: types.SAVE_TRAINING_LOCATIONS,
    data,
    updateType
  };
};

export const saveBiography = (data, updateType) => {
  return {
    type: types.SAVE_BIOGRAPHY,
    updateType,
    data
  };
};

export const saveBusinessModel = (businessModel, updateType) => {
  return {
    type: types.SAVE_BUSINESS_MODEL,
    businessModel,
    updateType
  };
};

export const saveBookingPreference = ({bookingPreferences, cancellationPolicy, bookingCutOffTime}, updateType) => {
  return {
    type: types.SAVE_BOOKING_PREFERENCE,
    bookingPreferences,
    cancellationPolicy,
    bookingCutOffTime,
    updateType
  };
};

export const saveAccountDetails = ({contact, nickname}, updateType) => {
  return {
    type: types.SAVE_ACCOUNT_DETAILS,
    contact,
    nickname,
    updateType
  };
};

export const saveBankPayoutDetails = (bankDetails, updateType) => {
  return {
    type: types.SAVE_BANK_PAYOUT_DETAILS,
    bankDetails,
    updateType
  };
};

export const savePayoutOption = ({currency, payoutOption}, updateType) => {
  return {
    type: types.SAVE_PAYOUT_OPTION,
    currency,
    payoutOption,
    updateType
  };
};

export const addMaterData = (data, params) => {
  const url = parseUrlTemplate(WebConstants.ISP_REVIEW_MASTER, params);
  return {
    type: types.ISP_REVIEW_MASTER,
    payload: axios.post(url, {payload: data})
  };
};

export const setPageStatus = status => {
  return {
    type: types.SET_PAGE_STATUS,
    status
  };
};

export const clearSportsRelatedStores = () => {
  return {
    type: types.CLEAR_SPORTS_RELATED_STORES
  };
};

export const fetchProfileSportsMapping = profileID => {
  const url = parseUrlTemplate(WebConstants.FETCH_PROFILE_SPORTS_URL, {profileID});
  return {
    type: types.FETCH_PROFILE_SPORTS_MAPPING,
    payload: axios.get(url)
  };
};

export const changeCurrentSport = sport => {
  return {
    type: types.CHANGE_CURRENT_SPORT,
    sport
  };
};

export const activateSport = (profileID, sportID) => {
  const url = parseUrlTemplate(WebConstants.ACTIVATE_SPORT_URL, {profileID, sportID});
  return {
    type: types.ACTIVATE_SPORT,
    payload: axios.post(url)
  };
};

export const deactivateSport = (profileID, sportID) => {
  const url = parseUrlTemplate(WebConstants.DEACTIVATE_SPORT_URL, {profileID, sportID});
  return {
    type: types.DEACTIVATE_SPORT,
    payload: axios.post(url)
  };
};

export const saveParentProfile = ({id, parentId, firstName, lastName, gender, dob, country, grade, height, weight}, updateType) => {
  const url = parseUrlTemplate(WebConstants.PARENT_PROFILE, {parentId, childId: id});
  return {
    type: types.SAVE_PARENT_PROFILE,
    payload: axios.post(url, {
      id,
      firstName,
      lastName,
      gender,
      dob,
      country,
      grade,
      height,
      weight
    })
  };
};

export const saveAthleteProfile = ({id, firstName, lastName, gender, dob, country, grade, height, weight}, updateType) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_PROFILE, {athleteId: id});
  return {
    type: types.SAVE_ATHLETE_PROFILE,
    payload: axios.post(url, {
      id,
      firstName,
      lastName,
      gender,
      dob,
      country,
      grade,
      height,
      weight
    })
  };
};

export const saveParentShortProfile = ({profile, sport}) => {
  const url = parseUrlTemplate(WebConstants.POST_PARENT_SHORT_REG_FLOW, {parentId: profile.parentId, childId: profile.id});
  const {firstName, lastName, gender, dob} = profile;
  const data = {
    childFirstName: firstName,
    childLastName: lastName,
    gender,
    dob,
    sport: {
      id: sport.id,
      name: sport.name,
      specializations: sport.specializations
    },
    yearOfExperience: sport.yearOfExperience,
    skillLevel: sport.skillLevel
  };
  return {
    type: types.SAVE_PARENT_SHORT_PROFILE,
    payload: axios.post(url, data)
  };
};

export const saveAthleteShortProfile = ({profile, sport}) => {
  const url = parseUrlTemplate(WebConstants.POST_ATHLETE_SHORT_REG_FLOW, {athleteId: profile.id});
  const data = {
    gender: profile.gender,
    dob: profile.dob,
    sport: {
      id: sport.id,
      name: sport.name,
      specializations: sport.specializations
    },
    yearOfExperience: sport.yearOfExperience,
    skillLevel: sport.skillLevel
  };
  return {
    type: types.SAVE_ATHLETE_SHORT_PROFILE,
    payload: axios.post(url, data)
  };
};

export const saveParentPreferences = ({id, childId, parentId, name, specializations, yearOfExperience, skillLevel, notes, preferences}, updateType) => {
  const url = parseUrlTemplate(WebConstants.PARENT_PREFERENCES, {parentId, childId, sportId: id});
  return {
    type: types.SAVE_PARENT_PREFERENCES,
    payload: axios.post(url, {
      id,
      name,
      specializations,
      yearOfExperience,
      skillLevel,
      notes,
      preferences
    })
  };
};

export const saveAthletePreferences = ({id, name, specializations, yearOfExperience, skillLevel, notes, preferences, athleteId}, updateType) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_PREFERENCES, {athleteId, sportId: id});
  return {
    type: types.SAVE_ATHLETE_PREFERENCES,
    payload: axios.post(url, {
      id,
      name,
      specializations,
      yearOfExperience,
      skillLevel,
      notes,
      preferences
    })
  };
};

export const saveParentAccount = ({firstName, lastName, gender, country, state, city, address, zipCode, timezone, mobile, landLine, canSendReminder, canReceiveMarketingCall}, updateType) => {
  const url = WebConstants.PARENT_ACCOUNT;
  return {
    type: types.SAVE_PARENT_ACCOUNT,
    payload: axios.post(url, {
      firstName,
      lastName,
      gender,
      country,
      state,
      city,
      address,
      zipCode,
      timezone,
      mobile,
      landLine,
      canSendReminder,
      canReceiveMarketingCall
    })
  };
};

export const saveAthleteAccount = ({id, firstName, lastName, country, state, city, address, zipCode, timezone, mobile, landLine, gender, canReceiveMarketingCall, canSendReminder}, updateType) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_ACCOUNT, {athleteId: id});
  return {
    type: types.SAVE_ATHLETE_ACCOUNT,
    payload: axios.post(url, {
      firstName,
      lastName,
      country,
      state,
      city,
      address,
      gender: gender ? gender : null,
      zipCode,
      timezone,
      mobile,
      landLine,
      canReceiveMarketingCall,
      canSendReminder
    })
  };
};

export const fetchParentProfile = ({parentId, childId}) => {
  const url = parseUrlTemplate(WebConstants.PARENT_PROFILE, {parentId, childId});
  return {
    type: types.FETCH_PARENT_PROFILE,
    payload: axios.get(url)
  };
};

export const fetchAthleteOrderHistory = (profileId, query) => {
  const url = parseUrlTemplate(WebConstants.FETCH_ATHLETE_ORDER_HISTORY, {profileId}, query);
  return {
    type: types.FETCH_ATHLETE_ORDER_HISTORY,
    payload: axios.get(url)
  };
};

export const fetchAthleteOrderDetails = orderId => {
  const url = parseUrlTemplate(WebConstants.FETCH_ATHLETE_ORDER_DETAILS, {orderId});
  return {
    type: types.FETCH_ORDER_DETAILS,
    payload: axios.get(url)
  };
};

export const fetchAthleteProfile = ({athleteId}) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_PROFILE, {athleteId});
  return {
    type: types.FETCH_ATHLETE_PROFILE,
    payload: axios.get(url)
    // Payload: axios2.get(url/**/, {headers: {'x-mock-access': '9344660adcb03305e8a1cf745326d9'}}/**/)
  };
};

export const fetchParentPreferences = ({parentId, childId, sportId}) => {
  const url = parseUrlTemplate(WebConstants.PARENT_PREFERENCES, {parentId, childId, sportId});
  return {
    type: types.FETCH_PARENT_PREFERENCES,
    payload: axios.get(url)
  };
};

export const clearParentPreferences = () => {
  return {
    type: types.CLEAR_PARENT_PREFERENCES
  };
};

export const fetchAthletePreferences = ({athleteId, sportId}) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_PREFERENCES, {athleteId, sportId});
  return {
    type: types.FETCH_ATHLETE_PREFERENCES,
    payload: axios.get(url)
  };
};

export const fetchParentAccount = () => {
  const url = WebConstants.PARENT_ACCOUNT;
  return {
    type: types.FETCH_PARENT_ACCOUNT,
    payload: axios.get(url)
  };
};

export const fetchAthleteAccount = () => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_ACCOUNT);
  return {
    type: types.FETCH_ATHLETE_ACCOUNT,
    payload: axios.get(url)
  };
};

export const createNewRole = params => {
  const url = parseUrlTemplate(WebConstants.NEW_ROLE, params);
  return {
    type: types.CREATE_NEW_ROLE,
    payload: axios.post(url)
  };
};

export const addChildPicture = (formData, params) => {
  const url = parseUrlTemplate(WebConstants.CHILD_UPLOAD_PROFILE_PICTURE, params);
  return {
    type: types.ADD_CHILD_PICTURE,
    payload: axios.post(url, formData, multipart)
  };
};

export const addAthletePicture = (formData, params) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_UPLOAD_PROFILE_PICTURE, params);
  return {
    type: types.ADD_ATHLETE_PICTURE,
    payload: axios.post(url, formData, multipart)
  };
};

export const setChildPicture = payload => {
  return {
    type: types.SET_CHILD_PICTURE,
    payload
  };
};

export const setAthletePicture = payload => {
  return {
    type: types.SET_ATHLETE_PICTURE,
    payload
  };
};

export const fetchParentOrderHistory = (profileId, query) => {
  const url = parseUrlTemplate(WebConstants.FETCH_PARENT_ORDER_HISTORY, {profileId}, query);
  return {
    type: types.FETCH_PARENT_ORDER_HISTORY,
    payload: axios.get(url)
  };
};

export const setAthletePreferences = data => {
  return {
    type: types.SET_ATHLETE_PREFERENCES,
    data
  };
};

export const setParentPreferences = data => {
  return {
    type: types.SET_PARENT_PREFERENCES,
    data
  };
};

export const fetchAthleteScheduledSessions = ({profileId, profileType}, dateString) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_FETCH_SCHEDULED_SESSIONS, {profileId, profileType, dateString});
  return {
    type: types.ATHLETE_FETCH_SCHEDULED_SESSIONS,
    payload: axios.get(url)
  };
};

export const fetchAthletePackage = ({profileId, orderId, sessionId, profileType}, query) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_FETCH_ORDER_SESSIONS, {profileId, orderId, profileType, sessionId}, query);
  return {
    type: types.ATHLETE_FETCH_ORDER_SESSIONS,
    payload: axios.get(url)
  };
};

export const fetchAthleteAvailableSlots = ({profileId, orderItemId, profileType}, dateString) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_FETCH_AVAILABLE_SLOTS, {profileId, orderItemId, profileType, dateString});
  return {
    type: types.ATHLETE_FETCH_AVAILABLE_SLOTS,
    payload: axios.get(url)
  };
};

export const athleteScheduleSession = ({profileId, orderItemId, eventId, profileType}) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_SCHEDULE_SESSION, {profileId, orderItemId, profileType});
  return {
    type: types.ATHLETE_SCHEDULE_SESSION,
    payload: axios.post(url, {eventId})
  };
};

export const athleteRescheduleSession = ({profileId, orderItemId, scheduleId, eventId, profileType}) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_RESCHEDULE_SESSION, {profileId, orderItemId, profileType, scheduleId});
  return {
    type: types.ATHLETE_RESCHEDULE_SESSION,
    payload: axios.post(url, {eventId})
  };
};

export const changeProfile = profile => {
  return {
    type: types.CHANGE_PROFILE,
    profile
  };
};

export const fetchAthleteUnscheduledSessions = ({profileId, profileType}) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_FETCH_UNSCHEDULE_SESSION, {profileId, profileType});
  return {
    type: types.ATHLETE_FETCH_UNSCHEDULE_SESSION,
    payload: axios.get(url)
  };
};

export const fetchAthleteSessionHistory = ({profileId, profileType}, filters) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_FETCH_SESSION_HISTORY, {profileId, profileType}, `?${filters}`);
  return {
    type: types.ATHLETE_FETCH_SESSION_HISTORY,
    payload: axios.get(url)
  };
};

export const exportOrderHistory = ({fileType}, query) => {
  const url = parseUrlTemplate(WebConstants.EXPORT_ORDER_HISTORY, {fileType}, query);
  return {
    type: types.EXPORT_ORDER_HISTORY,
    payload: axios.post(url)
  };
};

export const athleteReportInstructor = ({profileId, sspId, profileType}, data) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_REPORT_INSTRUCTOR, {profileId, sspId, profileType});
  return {
    type: types.ATHLETE_REPORT_INSTRUCTOR,
    payload: axios.post(url, data)
  };
};

export const fetchAthleteFutureSessions = ({profileId, orderId, sessionId, profileType}) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_FETCH_FUTURE_SESSIONS, {orderId, sessionId, profileId, profileType});
  return {
    type: types.ATHLETE_FETCH_FUTURE_SESSIONS,
    payload: axios.get(url)
  };
};

export const fetchVolumeDiscounts = ({profileId, sportId, trainingTypeId}) => {
  const url = parseUrlTemplate(WebConstants.FETCH_VOLUME_DISCOUNTS, {profileId, sportId, trainingTypeId});
  return {
    type: types.FETCH_VOLUME_DISCOUNTS,
    payload: axios.get(url)
  };
};

export const athleteCancelFutureSessions = ({profileId, profileType}, data) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_CANCEL_FUTURE_SESSIONS, {profileId, profileType});
  return {
    type: types.ATHLETE_CANCEL_FUTURE_SESSIONS,
    payload: axios.post(url, data)
  };
};

export const athleteRequestRefund = ({profileId, sessionId, profileType}, data) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_REQUEST_REFUND, {profileId, sessionId, profileType});
  return {
    type: types.ATHLETE_REQUEST_REFUND,
    payload: axios.post(url, data)
  };
};

export const fetchISPTrainedAthletes = profileID => {
  const url = parseUrlTemplate(WebConstants.ISP_TRAINED_ATHLETES_URL, {profileID});
  return {
    type: types.FETCH_ISP_TRAINED_ATHLETES,
    payload: axios.get(url)
  };
};

export const fetchScheduleChanges = ({profileId, profileType}) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_FETCH_SCHEDULE_CHANGES, {profileId, profileType});
  return {
    type: types.ATHLETE_FETCH_SCHEDULE_CHANGES,
    payload: axios.get(url)
  };
};

export const fetchISPSessionDetails = (profileID, packageID, athleteId) => {
  const url = parseUrlTemplate(WebConstants.ISP_SESSION_DETAILS_URL, {profileID, packageID, athleteId});
  return {
    type: types.FETCH_ISP_SESSION_DETAILS,
    payload: axios.get(url)
  };
};

export const athleteCancelSession = ({profileId, sessionId, profileType}, data) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_CANCEL_SESSION, {profileId, sessionId, profileType});
  return {
    type: types.ATHLETE_CANCEL_SESSION,
    payload: axios.post(url, data)
  };
};

export const athleteFetchSessionsCount = ({profileId, profileType}) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_FETCH_SESSIONS_COUNT, {profileId, profileType});
  return {
    type: types.ATHLETE_FETCH_SESSIONS_COUNT,
    payload: axios.get(url)
  };
};

export const fetchParentOrderDetails = orderID => {
  const url = parseUrlTemplate(WebConstants.FETCH_PARENT_ORDER_DETAILS, {orderId: orderID});
  return {
    type: types.FETCH_PARENT_ORDER_DETAILS,
    payload: axios.get(url, header)
  };
};

// FETCH GENERAL BIOGRAPHY

export const fetchGenDegrees = ({profileID}) => {
  const url = parseUrlTemplate(WebConstants.BIOGRAPHY, {profileID, type: WebConstants.ISP_DEGREE});
  return {
    type: types.FETCH_GEN_DEGREES,
    payload: axios.get(url, header)
  };
};

export const fetchGenCertifications = ({profileID}) => {
  const url = parseUrlTemplate(WebConstants.BIOGRAPHY, {profileID, type: WebConstants.ISP_CERTIFICATION});
  return {
    type: types.FETCH_GEN_CERTIFICATIONS,
    payload: axios.get(url, header)
  };
};

export const fetchGenAffiliations = ({profileID}) => {
  const url = parseUrlTemplate(WebConstants.BIOGRAPHY, {profileID, type: WebConstants.ISP_AFFILIATION});
  return {
    type: types.FETCH_GEN_AFFILIATIONS,
    payload: axios.get(url, header)
  };
};

export const fetchGenAwards = ({profileID}) => {
  const url = parseUrlTemplate(WebConstants.BIOGRAPHY, {profileID, type: WebConstants.ISP_AWARD});
  return {
    type: types.FETCH_GEN_AWARDS,
    payload: axios.get(url, header)
  };
};

export const fetchGenTools = ({profileID}) => {
  const url = parseUrlTemplate(WebConstants.BIOGRAPHY, {profileID, type: WebConstants.ISP_TOOL});
  return {
    type: types.FETCH_GEN_TOOLS,
    payload: axios.get(url, header)
  };
};

export const fetchGenAccomplishments = ({profileID}) => {
  const url = parseUrlTemplate(WebConstants.BIOGRAPHY, {profileID, type: WebConstants.ISP_ACCOMPLISHMENT});
  return {
    type: types.FETCH_GEN_ACCOMPLISHMENTS,
    payload: axios.get(url, header)
  };
};

export const fetchGenExperience = ({profileID}) => {
  const url = parseUrlTemplate(WebConstants.BIOGRAPHY, {profileID, type: WebConstants.ISP_EXPERIENCE});
  return {
    type: types.FETCH_GEN_EXPERIENCE,
    payload: axios.get(url, header)
  };
};

export const fetchGenExperienceYear = ({profileID}) => {
  const url = parseUrlTemplate(WebConstants.BIOGRAPHY, {profileID, type: WebConstants.ISP_EXPERIENCE_YEAR});
  return {
    type: types.FETCH_GEN_EXPERIENCE_YEAR,
    payload: axios.get(url, header)
  };
};

// FETCH SPORT BIOGRAPHY

export const fetchSportDegrees = ({profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_DEGREE, sportID});
  return {
    type: types.FETCH_SPORT_DEGREES,
    payload: axios.get(url, header)
  };
};

export const fetchSportCertifications = ({profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_CERTIFICATION, sportID});
  return {
    type: types.FETCH_SPORT_CERTIFICATIONS,
    payload: axios.get(url, header)
  };
};

export const fetchSportAffiliations = ({profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_AFFILIATION, sportID});
  return {
    type: types.FETCH_SPORT_AFFILIATIONS,
    payload: axios.get(url, header)
  };
};

export const fetchSportAwards = ({profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_AWARD, sportID});
  return {
    type: types.FETCH_SPORT_AWARDS,
    payload: axios.get(url, header)
  };
};

export const fetchSportTools = ({profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_TOOL, sportID});
  return {
    type: types.FETCH_SPORT_TOOLS,
    payload: axios.get(url, header)
  };
};

export const fetchSportAccomplishments = ({profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_ACCOMPLISHMENT, sportID});
  return {
    type: types.FETCH_SPORT_ACCOMPLISHMENTS,
    payload: axios.get(url, header)
  };
};

export const fetchSportExperience = ({profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_EXPERIENCE, sportID});
  return {
    type: types.FETCH_SPORT_EXPERIENCE,
    payload: axios.get(url, header)
  };
};

export const fetchSportExperienceYear = ({profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_EXPERIENCE_YEAR, sportID});
  return {
    type: types.FETCH_SPORT_EXPERIENCE_YEAR,
    payload: axios.get(url, header)
  };
};

// SAVE GENERAL BIOGRAPHY

export const saveGenDegree = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.BIOGRAPHY, {profileID, type: WebConstants.ISP_DEGREE});
  return {
    type: types.SAVE_GEN_DEGREE,
    payload: axios.post(url, {payload: data})
  };
};

export const saveGenCertification = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.BIOGRAPHY, {profileID, type: WebConstants.ISP_CERTIFICATION});
  return {
    type: types.SAVE_GEN_CERTIFICATION,
    payload: axios.post(url, {payload: data})
  };
};

export const saveGenAward = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.BIOGRAPHY, {profileID, type: WebConstants.ISP_AWARD});
  return {
    type: types.SAVE_GEN_AWARD,
    payload: axios.post(url, {payload: data})
  };
};

export const saveGenTool = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.BIOGRAPHY, {profileID, type: WebConstants.ISP_TOOL});
  return {
    type: types.SAVE_GEN_TOOL,
    payload: axios.post(url, {payload: data})
  };
};

export const saveGenAccomplishment = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.BIOGRAPHY, {profileID, type: WebConstants.ISP_ACCOMPLISHMENT});
  return {
    type: types.SAVE_GEN_ACCOMPLISHMENT,
    payload: axios.post(url, {payload: data})
  };
};

export const saveGenExperience = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.BIOGRAPHY, {profileID, type: WebConstants.ISP_EXPERIENCE});
  return {
    type: types.SAVE_GEN_EXPERIENCE,
    payload: axios.post(url, {payload: data})
  };
};

export const saveGenExperienceYear = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.BIOGRAPHY, {profileID, type: WebConstants.ISP_EXPERIENCE_YEAR});
  return {
    type: types.SAVE_GEN_EXPERIENCE_YEAR,
    payload: axios.post(url, {payload: data})
  };
};

export const saveGenAffiliation = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.BIOGRAPHY, {profileID, type: WebConstants.ISP_AFFILIATION});
  return {
    type: types.SAVE_GEN_AFFILIATION,
    payload: axios.post(url, {payload: data})
  };
};

// SAVE SPORT BIOGRAPHY

export const saveSportDegree = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_DEGREE, sportID});
  return {
    type: types.SAVE_SPORT_DEGREE,
    payload: axios.post(url, {payload: data})
  };
};

export const saveSportCertification = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_CERTIFICATION, sportID});
  return {
    type: types.SAVE_SPORT_CERTIFICATION,
    payload: axios.post(url, {payload: data})
  };
};

export const saveSportAward = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_AWARD, sportID});
  return {
    type: types.SAVE_SPORT_AWARD,
    payload: axios.post(url, {payload: data})
  };
};

export const saveSportTool = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_TOOL, sportID});
  return {
    type: types.SAVE_SPORT_TOOL,
    payload: axios.post(url, {payload: data})
  };
};

export const saveSportAccomplishment = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_ACCOMPLISHMENT, sportID});
  return {
    type: types.SAVE_SPORT_ACCOMPLISHMENT,
    payload: axios.post(url, {payload: data})
  };
};

export const saveSportExperience = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_EXPERIENCE, sportID});
  return {
    type: types.SAVE_SPORT_EXPERIENCE,
    payload: axios.post(url, {payload: data})
  };
};

export const saveSportExperienceYear = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_EXPERIENCE_YEAR, sportID});
  return {
    type: types.SAVE_SPORT_EXPERIENCE_YEAR,
    payload: axios.post(url, {payload: data})
  };
};

export const saveSportAffiliation = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_AFFILIATION, sportID});
  return {
    type: types.SAVE_SPORT_AFFILIATION,
    payload: axios.post(url, {payload: data})
  };
};

// DELETE GENERAL BIOGRAPHY

export const deleteGenDegree = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.DELETE_BIOGRAPHY, {profileID, type: WebConstants.ISP_DEGREE, id: data.id});
  return {
    type: types.DELETE_GEN_DEGREE,
    payload: axios.delete(url)
  };
};

export const deleteGenCertification = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.DELETE_BIOGRAPHY, {profileID, type: WebConstants.ISP_CERTIFICATION, id: data.id});
  return {
    type: types.DELETE_GEN_CERTIFICATION,
    payload: axios.delete(url)
  };
};

export const deleteGenAffiliation = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.DELETE_BIOGRAPHY, {profileID, type: WebConstants.ISP_AFFILIATION, id: data.id});
  return {
    type: types.DELETE_GEN_AFFILIATION,
    payload: axios.delete(url)
  };
};

export const deleteGenAward = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.DELETE_BIOGRAPHY, {profileID, type: WebConstants.ISP_AWARD, id: data.id});
  return {
    type: types.DELETE_GEN_AWARD,
    payload: axios.delete(url)
  };
};

export const deleteGenTool = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.DELETE_BIOGRAPHY, {profileID, type: WebConstants.ISP_TOOL, id: data.id});
  return {
    type: types.DELETE_GEN_TOOL,
    payload: axios.delete(url)
  };
};

export const deleteGenAccomplishment = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.DELETE_BIOGRAPHY, {profileID, type: WebConstants.ISP_ACCOMPLISHMENT, id: data.id});
  return {
    type: types.DELETE_GEN_ACCOMPLISHMENT,
    payload: axios.delete(url)
  };
};

export const deleteGenExperience = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.DELETE_BIOGRAPHY, {profileID, type: WebConstants.ISP_EXPERIENCE, id: data.id});
  return {
    type: types.DELETE_GEN_EXPERIENCE,
    payload: axios.delete(url)
  };
};

export const deleteGenExperienceYear = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.DELETE_BIOGRAPHY, {profileID, type: WebConstants.ISP_EXPERIENCE_YEAR, id: data.id});
  return {
    type: types.DELETE_GEN_EXPERIENCE_YEAR,
    payload: axios.delete(url)
  };
};

// DELETE SPORT BIOGRAPHY

export const deleteSportDegree = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.DELETE_SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_DEGREE, sportID, id: data.id});
  return {
    type: types.DELETE_SPORT_DEGREE,
    payload: axios.delete(url)
  };
};

export const deleteSportCertification = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.DELETE_SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_CERTIFICATION, sportID, id: data.id});
  return {
    type: types.DELETE_SPORT_CERTIFICATION,
    payload: axios.delete(url)
  };
};

export const deleteSportAffiliation = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.DELETE_SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_AFFILIATION, sportID, id: data.id});
  return {
    type: types.DELETE_SPORT_AFFILIATION,
    payload: axios.delete(url)
  };
};

export const deleteSportAward = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.DELETE_SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_AWARD, sportID, id: data.id});
  return {
    type: types.DELETE_SPORT_AWARD,
    payload: axios.delete(url)
  };
};

export const deleteSportTool = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.DELETE_SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_TOOL, sportID, id: data.id});
  return {
    type: types.DELETE_SPORT_TOOL,
    payload: axios.delete(url)
  };
};

export const deleteSportAccomplishment = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.DELETE_SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_ACCOMPLISHMENT, sportID, id: data.id});
  return {
    type: types.DELETE_SPORT_ACCOMPLISHMENT,
    payload: axios.delete(url)
  };
};

export const deleteSportExperience = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.DELETE_SPORT_BIOGRAPHY, {profileID, type: data.type === appConstants.sportExperience.coaching ? WebConstants.ISP_EXPERIENCE_COACHING : WebConstants.ISP_EXPERIENCE_PLAYING, sportID, id: data.id});
  return {
    type: types.DELETE_SPORT_EXPERIENCE,
    payload: axios.delete(url)
  };
};

export const deleteSportExperienceYear = (data, {profileID, sportID}) => {
  const url = parseUrlTemplate(WebConstants.DELETE_SPORT_BIOGRAPHY, {profileID, type: WebConstants.ISP_EXPERIENCE_YEAR, sportID, id: data.id});
  return {
    type: types.DELETE_SPORT_EXPERIENCE_YEAR,
    payload: axios.delete(url)
  };
};
export const fetchShoppingCartItems = ({cartId}) => {
  const url = parseUrlTemplate(WebConstants.SHOPPING_CART_ITEMS_URL, {cartId});
  return {
    type: types.FETCH_SHOPPING_CART_ITEMS,
    payload: axios.get(url)
  };
};

export const uploadMessageAttachment = (profileID, attachmentFile) => {
  const url = parseUrlTemplate(WebConstants.MESSAGE_ATTACHMENT_URL, {profileID});
  return {
    url,
    attachmentFile,
    type: types.UPDATE_MESSAGE_ATTACHMENT
  };
};
export const cancelUploadMessageAttachment = requestId => {
  return {
    requestId,
    type: types.CANCEL_UPDATE_MESSAGE_ATTACHMENT
  };
};

export const fetchIspAvailableSessionSlots = (profileID, scheduledSessionId, date) => {
  const url = parseUrlTemplate(WebConstants.ISP_AVAILABLE_SESSION_SLOTS_URL, {profileID, scheduledSessionId, date});
  return {
    type: types.FETCH_ISP_AVAILABLE_SESSION_SLOTS,
    payload: axios.get(url)
  };
};

export const ispRescheduleSession = (profileID, scheduledSessionId, data) => {
  const url = parseUrlTemplate(WebConstants.ISP_RESCHEDULE_SESSION_URL, {profileID, scheduledSessionId});
  return {
    type: types.ISP_RESCHEDULE_SESSION,
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

export const fetchOrderSummary = ({profileID}) => {
  const url = parseUrlTemplate(WebConstants.SSP_ORDER_FUND_SUMMARY, {profileID});
  return {
    type: types.FETCH_SSP_ORDER_SUMMARY,
    payload: axios.get(url, header)
  };
};

export const fetchPayoutList = ({profileID}, query) => {
  const url = parseUrlTemplate(WebConstants.SSP_ORDER_PAYOUTS, {profileID}, query);
  return {
    type: types.FETCH_SSP_PAYOUT_LIST,
    payload: axios.get(url, header)
  };
};

export const fetchEarningsList = ({profileID}, query) => {
  const url = parseUrlTemplate(WebConstants.SSP_ORDER_EARNINGS, {profileID}, query);
  return {
    type: types.FETCH_SSP_EARNINGS,
    payload: axios.get(url, header)
  };
};

export const fetchFundTransferSettings = ({profileID}) => {
  const url = parseUrlTemplate(WebConstants.SSP_FUND_WITHDRAW_SETTINGS, {profileID});
  return {
    type: types.FETCH_FUND_WITHDRAW_SETTINGS,
    payload: axios.get(url, header)
  };
};

export const fetchBAnkAccounts = ({profileID}) => {
  const url = parseUrlTemplate(WebConstants.SSP_BANK_ACCOUNTS, {profileID});
  return {
    type: types.FETCH_BANK_ACCOUNTS,
    payload: axios.get(url, header)
  };
};

export const saveFundSettings = (data, {profileID}) => {
  const url = parseUrlTemplate(WebConstants.SSP_FUND_WITHDRAW_SETTINGS, {profileID});
  return {
    type: types.SAVE_FUND_SETTINGS,
    payload: axios.post(url, {payload: data})
  };
};

export const fetchMasterDataDaysOfWeek = () => {
  return {
    type: types.FETCH_MASTER_DATA_DAYS_OF_WEEK,
    payload: axios.get(WebConstants.MASTER_DATA_DAYS_OF_WEEK_URL)
  };
};

export const setBookingCutOffTime = data => {
  return {
    type: types.SET_BOOKING_CUT_OFF_TIME,
    data
  };
};

export const ispUpdateSessionOverideTotalSlots = (profileID, scheduledSessionId, noOfSlots) => {
  const url = parseUrlTemplate(WebConstants.ISP_OVERRIDE_SESSION_TOTAL_SLOTS_URL, {profileID, scheduledSessionId});
  return {
    type: types.ISP_UPDATE_SESSION_TOTAL_SLOTS,
    payload: axios.post(url, {noOfSlots})
  };
};

export const ispFetchSessionGroupSize = (profileID, scheduledSessionId) => {
  const url = parseUrlTemplate(WebConstants.ISP_SESSION_GROUP_SIZE_URL, {profileID, scheduledSessionId});
  return {
    type: types.ISP_FETCH_SESSION_GROUP_SIZE,
    payload: axios.get(url)
  };
};

export const ispUpdateSessionGroupSize = (profileID, scheduledSessionId, {minSize, maxSize, subSSPTypeBaseRateID}) => {
  const url = parseUrlTemplate(WebConstants.ISP_SESSION_CHANGE_GROUP_SIZE_URL, {profileID, scheduledSessionId});
  return {
    type: types.ISP_UPDATE_SESSION_GROUP_SIZE,
    payload: axios.post(url, {minSize, maxSize, subSSPTypeBaseRateID})

  };
};

export const reverseGeoCoding = query => {
  let url = WebConstants.GOOGLE_GEOCODING_API;
  if (query) {
    url += query;
  }
  return {
    type: types.FETCH_GEO_LOCATION,
    payload: axios2({
      method: 'get',
      url,
      headers: {}
    })
  };
};

export const getTimezone = (lat, lng, timestamp, key) => {
  const url = parseUrlTemplate(WebConstants.GOOGLE_TIMEZONE_API, {lat, lng, timestamp, key});
  return {
    type: types.FETCH_TIMEZONE,
    payload: axios2({method: 'get', url, headers: {}})
  };
};

export const ispFetchWorkingDays = ({profileId}) => {
  const url = parseUrlTemplate(WebConstants.ISP_FETCH_WORKING_DAYS, {profileId});
  return {
    type: types.ISP_FETCH_WORKING_DAYS,
    payload: axios.get(url)
  };
};

export const ispSaveWorkingDays = ({profileId}, data) => {
  const url = parseUrlTemplate(WebConstants.ISP_FETCH_WORKING_DAYS, {profileId});
  return {
    type: types.ISP_SAVE_WORKING_DAYS,
    payload: axios.post(url, data)
  };
};

export const ispFetchServiceProfiles = ({profileId}) => {
  const url = parseUrlTemplate(WebConstants.ISP_FETCH_SPORTS_LIST, {profileId});
  return {
    type: types.ISP_FETCH_SPORTS_LIST,
    payload: axios.get(url)

  };
};

export const verifyBusinessEmail = ({profileId}, data) => {
  const url = parseUrlTemplate(WebConstants.ISP_VERIFY_BUSINESS_EMAIL, {profileId});
  return {
    type: types.ISP_VERIFY_BUSINESS_EMAIL,
    payload: axios.post(url, data)
  };
};

export const verifyBusinessEmailOTP = (params, data) => {
  const url = parseUrlTemplate(WebConstants.ISP_VERIFY_BUSINESS_EMAIL_OTP, params);
  return {
    type: types.ISP_VERIFY_BUSINESS_EMAIL_OTP,
    payload: axios.post(url, {payload: data})
  };
};

export const verifyEmail = ({profileId}, data) => {
  const url = parseUrlTemplate(WebConstants.ISP_VERIFY_EMAIL, {profileId});
  return {
    type: types.ISP_VERIFY_EMAIL,
    meta: {
      email: data.email
    },
    payload: axios.post(url, data)
  };
};

export const verifyAthleteEmail = ({profileId}, data) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_VERIFY_EMAIL, {profileId});
  return {
    type: types.ATHLETE_VERIFY_EMAIL,
    meta: {
      email: data.email
    },
    payload: axios.post(url, data)
  };
};

export const verifyEmailOTP = (params, data) => {
  const url = parseUrlTemplate(WebConstants.ISP_VERIFY_EMAIL_OTP, params);
  return {
    type: types.ISP_VERIFY_EMAIL_OTP,
    payload: axios.post(url, {...data})
  };
};

export const verifyAthleteEmailOTP = (params, data) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_VERIFY_EMAIL_OTP, params);
  return {
    type: types.ATHLETE_VERIFY_EMAIL_OTP,
    payload: axios.post(url, {...data})
  };
};

export const fetchAvailableSessionTimeSlots = (profileID, sportId, sessionId, date) => {
  const url = parseUrlTemplate(WebConstants.ISP_AVAILABLE_SESSION_TIME_SLOTS_URL, {profileID, sportId, sessionId, date});
  return {
    type: types.ISP_FETCH_AVAILABLE_SESSION_TIME_SLOTS,
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

export const fetchShoppingCartTransactionSummary = txnId => {
  const url = parseUrlTemplate(WebConstants.FETCH_SHOPPING_CART_TRANSACTION_SUMMARY, {txnId});
  return {
    type: types.FETCH_SHOPPING_CART_TRANSACTION_SUMMARY,
    payload: axios.get(url)
  };
};

export const shoppingCartCheckout = () => {
  return {
    type: types.SHOPPING_CART_CHECKOUT,
    payload: axios.post(WebConstants.SHOPPING_CART_CHECKOUT)
  };
};

export const createShoppingCart = data => {
  const url = parseUrlTemplate(WebConstants.CREATE_SHOPPING_CART);
  return {
    type: types.CREATE_SHOPPING_CART,
    payload: axios.post(url, data)
  };
};

export const fetchBillingAddress = type => {
  const url = parseUrlTemplate(WebConstants.SHOPPING_CART_BILLING_ADDRESS, {type});
  return {
    type: types.FETCH_BILLING_ADDRESS,
    payload: axios.get(url)
  };
};

export const updateBillingAddress = (type, data) => {
  const url = parseUrlTemplate(WebConstants.SHOPPING_CART_BILLING_ADDRESS, {type});
  return {
    type: types.UPDATE_BILLING_ADDRESS,
    payload: axios.post(url, data)
  };
};

export const inviteFriends = (data, profileId, scheduledSessionId) => {
  const url = parseUrlTemplate(WebConstants.INVITE_FRIENDS, {profileId, scheduledSessionId});
  return {
    type: types.POST_INVITE_FRIENDS,
    payload: axios.post(url, data)
  };
};

export const fetchShippingAddress = profileId => {
  const url = parseUrlTemplate(WebConstants.SHOPPING_CART_SHIPPING_ADDRESS, {profileId});
  return {
    type: types.FETCH_SHIPPING_ADDRESS,
    payload: axios.get(url)
  };
};

export const updateShippingAddress = (profileId, data) => {
  const url = parseUrlTemplate(WebConstants.SHOPPING_CART_SHIPPING_ADDRESS, {profileId});
  return {
    type: types.UPDATE_SHIPPING_ADDRESS,
    payload: axios.post(url, data)
  };
};

export const ispSearchAthelete = searchText => {
  const url = parseUrlTemplate(WebConstants.ISP_SEARCH_ATHLETE_URL, {searchText});
  return {
    type: types.ISP_SEARCH_ATHLETE,
    payload: axios.get(url)
  };
};

export const postAthleteShortReg = (data, {athleteId}) => {
  const url = parseUrlTemplate(WebConstants.POST_ATHLETE_SHORT_REG_FLOW, {athleteId});
  return {
    type: types.POST_ATHLETE_SHORT_REG_FLOW,
    payload: axios.post(url, data)
  };
};

export const verifyParentEmail = ({profileId}, data) => {
  const url = parseUrlTemplate(WebConstants.PARENT_VERIFY_EMAIL, {profileId});
  return {
    type: types.PARENT_VERIFY_EMAIL,
    meta: {
      email: data.email
    },
    payload: axios.post(url, data)
  };
};

export const verifyParentEmailOTP = (params, data) => {
  const url = parseUrlTemplate(WebConstants.PARENT_VERIFY_EMAIL_OTP, params);
  return {
    type: types.PARENT_VERIFY_EMAIL_OTP,
    payload: axios.post(url, {...data})
  };
};

export const sspBookingAction = (profileType, profileId, bookingId, data) => {
  const url = parseUrlTemplate(WebConstants.SSP_BOOKING_ACTION_URL, {profileType, profileId, bookingId});
  return {
    type: types.SSP_BOOKING_ACTION,
    payload: axios.post(url, data)
  };
};

export const fetchWalletSummary = () => {
  const url = parseUrlTemplate(WebConstants.FETCH_WALLET_SUMMARY);
  return {
    type: types.FETCH_WALLET_SUMMARY,
    payload: axios.get(url)
  };
};

export const updateAthletePaymentMethod = (profileId, data) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_PAYMENT_METHOD, {profileId});
  return {
    type: types.UPDATE_ATHLETE_PAYMENT_METHOD,
    payload: axios.post(url, {...data})
  };
};

export const updateParentPaymentMethod = (profileId, data) => {
  const url = parseUrlTemplate(WebConstants.PARENT_PAYMENT_METHOD, {profileId});
  return {
    type: types.UPDATE_ATHLETE_PAYMENT_METHOD,
    payload: axios.post(url, {...data})
  };
};

export const fetchPaymentDeatils = (type, query) => {
  const url = parseUrlTemplate(WebConstants.FETCH_PAYMENT_DETAILS, {type}, query);
  return {
    type: types.FETCH_PAYMENT_DETAILS,
    payload: axios.get(url)
  };
};

export const chargeCard = (data, profileType) => {
  const url = parseUrlTemplate(WebConstants.CHARGE_CARD, {profileType});
  return {
    type: types.CHARGE_CARD,
    payload: axios.post(url, data)
  };
};

export const fetchISPBookingScheduledSessions = (profileID, bookingId, date) => {
  const url = parseUrlTemplate(WebConstants.ISP_BOOKING_SCHEDULED_SESSIONS_URL, {profileID, bookingId, date});
  return {
    type: types.FETCH_ISP_BOOKING_SCHEDULED_SESSIONS,
    payload: axios.get(url)
  };
};
export const savePaymentSource = (type, sourceId) => {
  const url = parseUrlTemplate(WebConstants.PAYMENT_SOURCE, {type});
  return {
    type: types.SAVE_PAYMENT_SOURCE,
    payload: axios.post(url, {sourceId})
  };
};

export const deletePaymentSource = (type, sourceId) => {
  const url = parseUrlTemplate(WebConstants.PAYMENT_SOURCE_DELETE, {type, sourceId});
  return {
    type: types.DELETE_PAYMENT_SOURCE,
    payload: axios.delete(url)
  };
};

export const fetchShoppingCartItemsCount = () => {
  const url = parseUrlTemplate(WebConstants.FETCH_SHOPPING_CART_ITEMS_COUNT);
  return {
    type: types.FETCH_SHOPPING_CART_ITEMS_COUNT,
    payload: axios.get(url)
  };
};

export const fetchPaymentSummary = transactionId => {
  const url = parseUrlTemplate(WebConstants.FETCH_PAYMENT_SUMMARY, {transactionId});
  return {
    type: types.FETCH_PAYMENT_SUMMARY,
    payload: axios.get(url)
  };
};

export const postAthleteBookingAction = (profileType, profileId, bookingId, data) => {
  const url = parseUrlTemplate(WebConstants.ATHLETE_HANDLE_BOOKING_CHANGES, {profileType, profileId, bookingId});
  return {
    type: types.ATHLETE_HANDLE_BOOKING_CHANGES,
    payload: axios.post(url, data)
  };
};

export const reorder = orderId => {
  const url = parseUrlTemplate(WebConstants.REORDER, {orderId});
  return {
    type: types.REORDER,
    payload: axios.post(url, {})
  };
};

export const fetchIspOrderFutureSessions = (profileID, orderId, athleteId) => {
  const url = parseUrlTemplate(WebConstants.FETCH_ISP_ORDER_FUTURE_SESSIONS_URL, {profileID, orderId, athleteId});
  return {
    type: types.FETCH_ISP_ORDER_UPCOMMING_SESSIONS,
    payload: axios.get(url)
  };
};

export const sspCancelFutureSessions = (profileID, data) => {
  const url = parseUrlTemplate(WebConstants.SSP_CANCEL_FUTURE_SESSION_URL, {profileID});
  return {
    type: types.SSP_CANCEL_FUTURE_SESSIONS,
    payload: axios.post(url, data)
  };
};

export const ispReportAthlete = (profileID, athleteId, data) => {
  const url = parseUrlTemplate(WebConstants.SSP_REPORT_ATHLETE_URL, {profileID, athleteId});
  return {
    type: types.SSP_REPORT_ATHLETE,
    payload: axios.post(url, data)
  };
};

export const postTrainingLocations = props => {
  const url = parseUrlTemplate(WebConstants.ISP_SAVE_TRAINING_LOCATION)
  return {
    type: 'SAVE_TRAINING_LOCATION',
    payload: axios.post(url, props)
  }
}

export const updateTrainingLocations = props => {
  const url = parseUrlTemplate(WebConstants.ISP_UPDATE_TRAINING_LOCATION, {id: props.id})
  delete props.id
  return {
    type: 'UPDATE_TRAINING_LOCATION',
    payload: axios.put(url, props)
  }
}