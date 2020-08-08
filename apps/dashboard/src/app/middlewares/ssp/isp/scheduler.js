import {matchPath} from 'react-router';
import QueryString from 'query-string';
import moment from 'moment';

import appConstants from '../../../constants/appConstants';
import {LOCATION_URL_CHANGE, ISP_RESCHEDULE_SESSION, FULFILLED, CREATE_NEW_SCHEDULED_SESSION, ISP_UPDATE_SESSION_BUFFER, ISP_UPDATE_OVERIDE_PRICE, ISP_REMOVE_SCHEDULE, ISP_SCHEDULES_SESSION_CHANGE_LOCATION, ISP_UPDATE_SESSION_GROUP_SIZE, ISP_UPDATE_SESSION_TOTAL_SLOTS, ISP_CANCEL_SCHEDULED_SESSION, ISP_SAVE_WORKING_DAYS} from '../../../constants/ActionTypes';
import {DASHBOARD_SCHEDULE_SESSION, DASHBOARD_MANAGE_BOOKING, DASHBOARD_SESSION_HISTORY, DASHBOARD_SESSION_DETAILS, PATH_VARIABLE_PACKAGE_ID, PATH_VARIABLE_ATHLETE_ID} from '../../../constants/pathConstants';
import {fetchScheduledSessions, fetchManageBookings, fetchSessionHistory, ispFetchWorkingDays, fetchISPSessionDetails} from '../../../actions';

function checkSessionHistoryUrlChange(store, pathname, query, profileID) {
  const matchSessionHistory = matchPath(pathname, {path: DASHBOARD_SESSION_HISTORY, strict: false, exact: true});
  if (matchSessionHistory) {
    const sessionHistoryQueryFilters = appConstants.ISPSessionHistory.queryFilters;
    const limit = appConstants.ISPSessionHistory.pageLimit;
    const page = query[sessionHistoryQueryFilters.page];
    const noOfDays = query[sessionHistoryQueryFilters.numOfDays];
    let startDate;
    if (noOfDays) {
      startDate = moment().subtract(noOfDays, appConstants.momentJSConstants.DAY).format(appConstants.schedules.ISO_DATE_FORMAT);
    }
    const queryUrlString = QueryString.stringify({
      sportId: query[sessionHistoryQueryFilters.sportId],
      athleteId: query[sessionHistoryQueryFilters.athleteId],
      startDate,
      status: query[sessionHistoryQueryFilters.status],
      sortBy: query[sessionHistoryQueryFilters.sortBy],
      page: (page) ? page : 0,
      limit
    });
    store.dispatch(fetchSessionHistory(profileID, queryUrlString));
  }
  return matchSessionHistory;
}

function checkSessionDetailsUrlChange(store, pathname, query, profileID) {
  const matchSessionDetails = matchPath(pathname, {path: DASHBOARD_SESSION_DETAILS, strict: false, exact: true});
  if (matchSessionDetails && matchSessionDetails.params) {
    const {params} = matchSessionDetails;
    const packageId = params[PATH_VARIABLE_PACKAGE_ID];
    const athleteId = params[PATH_VARIABLE_ATHLETE_ID];
    if (profileID && packageId && athleteId) {
      store.dispatch(fetchISPSessionDetails(profileID, packageId, athleteId));
    }
  }
  return matchSessionDetails;
}

function checkManageBookingUrlChange(store, pathname, query, profileID) {
  const matchManageBooking = matchPath(pathname, {path: DASHBOARD_MANAGE_BOOKING, strict: false, exact: true});
  if (matchManageBooking) {
    const manageBookingQueryFilters = appConstants.manageBookings.queryFilters;
    const limit = appConstants.manageBookings.pageLimit;
    const page = query[manageBookingQueryFilters.page];
    const queryUrlString = QueryString.stringify({
      sportId: query[manageBookingQueryFilters.sportId],
      sessionIds: query[manageBookingQueryFilters.sessionId],
      athleteId: query[manageBookingQueryFilters.athleteId],
      endDate: query[manageBookingQueryFilters.endDate],
      page: (page) ? page : 0,
      limit
    });
    store.dispatch(fetchManageBookings(profileID, queryUrlString));
  }
  return matchManageBooking;
}

function checkScheduleSessionUrlChange(store, pathname, query, profileID) {
  const match = matchPath(pathname, {path: DASHBOARD_SCHEDULE_SESSION, strict: false, exact: true});
  if (match) {
    const queryUrlDateString = query[appConstants.schedules.queryFilters.date];
    const queryDateString = (queryUrlDateString) ? queryUrlDateString : moment().format(appConstants.schedules.ISO_DATE_FORMAT);
    store.dispatch(fetchScheduledSessions(profileID, queryDateString));
  }
  return match;
}

const sspScheduler = store => next => action => {
  next(action);
  switch (action.type) {
    case LOCATION_URL_CHANGE: {
      const {location} = action.data;
      const {pathname, search} = location;
      const storeState = store.getState();
      const {selectedProfile} = storeState.userProfiles;
      if (selectedProfile) {
        const profileID = selectedProfile.id;
        const query = QueryString.parse(search);
        if (checkScheduleSessionUrlChange(store, pathname, query, profileID)) {
          break;
        } else if (checkManageBookingUrlChange(store, pathname, query, profileID)) {
          break;
        } else if (checkSessionHistoryUrlChange(store, pathname, query, profileID)) {
          break;
        } else if (checkSessionDetailsUrlChange(store, pathname, query, profileID)) {
          break;
        }
      }
      break;
    }
    case ISP_RESCHEDULE_SESSION + FULFILLED:
    case ISP_UPDATE_SESSION_BUFFER + FULFILLED:
    case ISP_UPDATE_OVERIDE_PRICE + FULFILLED:
    case CREATE_NEW_SCHEDULED_SESSION + FULFILLED:
    case ISP_SCHEDULES_SESSION_CHANGE_LOCATION + FULFILLED:
    case ISP_UPDATE_SESSION_GROUP_SIZE + FULFILLED:
    case ISP_UPDATE_SESSION_TOTAL_SLOTS + FULFILLED:
    case ISP_CANCEL_SCHEDULED_SESSION + FULFILLED:
    case ISP_REMOVE_SCHEDULE + FULFILLED : {
      const storeState = store.getState();
      const {selectedProfile} = storeState.userProfiles;
      if (selectedProfile) {
        const profileID = selectedProfile.id;
        const {query, location} = storeState.router;
        checkScheduleSessionUrlChange(store, location.pathname, query, profileID);
      }
      break;
    }
    case ISP_SAVE_WORKING_DAYS + FULFILLED: {
      const storeState = store.getState();
      const {selectedProfile} = storeState.userProfiles;
      store.dispatch(ispFetchWorkingDays({profileId: selectedProfile.id}));
      break;
    }
    default:break;
  }
};

export default sspScheduler;
