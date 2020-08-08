import {matchPath} from 'react-router';
import QueryString from 'query-string';
import moment from 'moment';

import appConstants from '../../constants/appConstants';

import {
  DASHBOARD_ATHLETE_SCHEDULER_SCHEDULED,
  DASHBOARD_ATHLETE_SCHEDULER_MANAGE_ORDER_ITEM,
  DASHBOARD_ATHLETE_SCHEDULER_AVAILABLE_SLOTS,
  DASHBOARD_ATHLETE_SCHEDULER_UNSCHEDULED_ORDER_ITEM_ID,
  DASHBOARD_ATHLETE_SCHEDULER_HISTORY
} from '../../constants/pathConstants';

import {
  fetchAthleteScheduledSessions,
  fetchAthletePackage,
  fetchAthleteAvailableSlots,
  fetchAthleteSessionHistory
} from '../../actions/index';

function isScheduled({pathname}) {
  return matchPath(pathname, {path: DASHBOARD_ATHLETE_SCHEDULER_SCHEDULED, exact: true});
}

function isPackage({pathname}) {
  return matchPath(pathname, {path: DASHBOARD_ATHLETE_SCHEDULER_MANAGE_ORDER_ITEM, exact: true});
}

function isReschedule({pathname}) {
  return matchPath(pathname, {path: DASHBOARD_ATHLETE_SCHEDULER_AVAILABLE_SLOTS, exact: true});
}

function isUnschedule({pathname}) {
  return matchPath(pathname, {path: DASHBOARD_ATHLETE_SCHEDULER_UNSCHEDULED_ORDER_ITEM_ID, exact: true});
}

function isSessionHistory({pathname}) {
  return matchPath(pathname, {path: DASHBOARD_ATHLETE_SCHEDULER_HISTORY, exact: true});
}

export function handleSchedulerUrlChange(store, profileId, location, profileType) {
  if (isScheduled(location)) {
    const query = QueryString.parse(location.search);
    const queryUrlDateString = query[appConstants.scheduledSessionQueryFilters.date];
    const queryDateString = (queryUrlDateString) ? queryUrlDateString : '' //moment().format(appConstants.schedules.ISO_DATE_FORMAT);
    store.dispatch(fetchAthleteScheduledSessions({profileId, profileType}, queryDateString));
  } else if (isPackage(location)) {
    const match = isPackage(location);
    const orderId = match.params.orderId;
    const sessionId = match.params.sessionId;
    store.dispatch(fetchAthletePackage({orderId, sessionId, profileId, profileType}, location.search));
  } else if (isReschedule(location)) {
    const match = isReschedule(location);
    const orderItemId = match.params.orderItemId;
    const query = QueryString.parse(location.search);
    const queryUrlDateString = query[appConstants.athleteAvailableQueryFilters.date];
    const queryDateString = (queryUrlDateString) ? queryUrlDateString : '' //moment().format(appConstants.schedules.ISO_DATE_FORMAT);
    store.dispatch(fetchAthleteAvailableSlots({profileId, orderItemId, profileType}, queryDateString));
  } else if (isUnschedule(location)) {
    const match = isUnschedule(location);
    const orderItemId = match.params.orderItemId;
    const query = QueryString.parse(location.search);
    const queryUrlDateString = query[appConstants.athleteAvailableQueryFilters.date];
    const queryDateString = (queryUrlDateString) ? queryUrlDateString : '' //moment().format(appConstants.schedules.ISO_DATE_FORMAT);
    store.dispatch(fetchAthleteAvailableSlots({profileId, orderItemId, profileType}, queryDateString));
  } else if (isSessionHistory(location)) {
    const query = QueryString.parse(location.search);
    const {queryFilters} = appConstants.sessionHistory;
    const queryString = QueryString.stringify({
      page: (query[queryFilters.page]) ? query[queryFilters.page] : 0,
      limit: appConstants.sessionHistory.pageLimit,
      from: query[queryFilters.from],
      to: query[queryFilters.to],
      orderBy: query[queryFilters.order],
      sortBy: query[queryFilters.sortBy]
    });
    store.dispatch(fetchAthleteSessionHistory({profileId, profileType}, queryString));
  }
}

export function getProfileId(selectedProfile) {
  if (selectedProfile.type === appConstants.userProfileTypes.ATHLETE) {
    return selectedProfile.id;
  } else if (selectedProfile.type === appConstants.userProfileTypes.PARENT) {
    return selectedProfile.dependentId;
  }
}
