import {matchPath} from 'react-router';
import QueryString from 'query-string';
import config from '../config';

import * as RouterPaths from '../constants/RouterPaths';
import {fetchLabelledThreads, fetchThreadMessages, fetchInboxThreads, fetchStarredThreads, fetchUnreadThreads, fetchSentThreads, fetchDraftMessages, fetchArchivedThreads, fetchTrashedThreads, updateThreadReadStatus} from '../actions';
import appConstants from '../../app/constants/appConstants';

const messagingConstants = appConstants.messaging;
const {defaultThreadPageLimit, defaultThreadPage} = config.messagingSystem;

const fetchSubMenuThreads = (profileID, store, {subMenu, labelName, search}) => {
  if (subMenu) {
    switch (subMenu) {
      case RouterPaths.MENU_INBOX: {
        store.dispatch(fetchInboxThreads(profileID, search));
        return true;
      }
      case RouterPaths.MENU_STARRED: {
        store.dispatch(fetchStarredThreads(profileID, search));
        return true;
      }
      case RouterPaths.MENU_UNREAD: {
        store.dispatch(fetchUnreadThreads(profileID, search));
        return true;
      }
      case RouterPaths.MENU_SENT: {
        store.dispatch(fetchSentThreads(profileID, search));
        return true;
      }
      case RouterPaths.MENU_DRAFTS: {
        store.dispatch(fetchDraftMessages(profileID, search));
        return true;
      }
      case RouterPaths.MENU_ARCHIVED: {
        store.dispatch(fetchArchivedThreads(profileID, search));
        return true;
      }
      case RouterPaths.MENU_TRASH: {
        store.dispatch(fetchTrashedThreads(profileID, search));
        return true;
      }
      case RouterPaths.MENU_LABELS: {
        if (labelName) {
          store.dispatch(fetchLabelledThreads(profileID, labelName, search));
          return true;
        }
        return false;
      }
      default: {
        return false;
      }
    }
  }
  return false;
};
export const convertMessagingQueryFilterToApi = query => {
  const {apiQueryFilters, queryFilters} = messagingConstants;
  const serverQuery = {
    [apiQueryFilters.messageTypes]: query[queryFilters.messageTypes],
    [apiQueryFilters.search]: query[queryFilters.search],
    [apiQueryFilters.sessionDateTo]: query[queryFilters.sessionDateTo],
    [apiQueryFilters.sessionDateFrom]: query[queryFilters.sessionDateFrom],
    [apiQueryFilters.sessionLocationId]: query[queryFilters.sessionLocationId],
    [apiQueryFilters.sportId]: query[queryFilters.sportId],
    [apiQueryFilters.sessionId]: query[queryFilters.sessionId],
    [apiQueryFilters.limit]: query[apiQueryFilters.limit],
    [apiQueryFilters.page]: query[apiQueryFilters.page]
  };
  console.log('Query===', query);
  console.log('serverQuery', serverQuery);
  return (serverQuery);
};

const appendPaginationQuery = (search, limit = defaultThreadPageLimit, page = defaultThreadPage) => {
  const {apiQueryFilters} = messagingConstants;
  let queryParams = QueryString.parse(search);
  queryParams = Object.assign({}, queryParams, {[apiQueryFilters.limit]: limit, [apiQueryFilters.page]: page});
  queryParams = convertMessagingQueryFilterToApi(queryParams);
  return `?${QueryString.stringify(queryParams)}`;
};

const isMessageSubmenuURL = (profileID, store, location) => {
  const {pathname, search} = location;
  const match = matchPath(pathname, {path: RouterPaths.MESSAGES_GET_SUBMENU_WITH_LABEL_URL, strict: false, exact: true});
  if (match) {
    const {subMenu, labelName} = match.params;
    return fetchSubMenuThreads(profileID, store, {subMenu, labelName, search: appendPaginationQuery(search)});
  }
  return false;
};

const isThreadViewURL = (profileID, store, location) => {
  const {pathname, search} = location;
  const match = matchPath(pathname, {path: RouterPaths.MESSAGES_THREAD_VIEW_URL, exact: true, strict: false});
  if (match) {
    const {threadId, labelName, subMenu} = match.params;
    if (subMenu) {
      const storeState = store.getState();
      const {threads} = storeState.messages;
      if (threads.data.length === 0) {
        fetchSubMenuThreads(profileID, store, {subMenu, labelName, search: appendPaginationQuery(search)});
      }
    }
    if (threadId) {
      store.dispatch(fetchThreadMessages(profileID, threadId));
      return true;
    }
  }
  return false;
};

export const paginateThreadList = (store, profileID, location, {limit, page}) => {
  const {pathname, search} = location;
  const match = matchPath(pathname, {path: RouterPaths.MESSAGES_GET_SUBMENU_WITH_LABEL_URL, strict: false, exact: false});
  if (match) {
    const {subMenu, labelName} = match.params;
    return fetchSubMenuThreads(profileID, store, {subMenu, labelName, search: appendPaginationQuery(search, limit, page)});
  }
};

export const handleUrlChange = (store, profileID, location) => {
  if (profileID) {
    if (isMessageSubmenuURL(profileID, store, location)) {
      console.log('Message label url');
    } else if (isThreadViewURL(profileID, store, location)) {
      console.log('ThreadView url');
    }
  }
};

export const checkMessageMetadataChange = (store, storeState) => {
  const {messages, router} = storeState;
  const {profile, threads, metadata} = messages;
  const profileID = profile.id;
  const {pathname, search} = router.location;
  const {limit, page} = threads;
  const {prevMetadata} = metadata;
  const match = matchPath(pathname, {path: RouterPaths.MESSAGES_GET_SUBMENU_URL, strict: false, exact: false});
  if (match) {
    const {subMenu} = match.params;
    if (subMenu) {
      const paginatedSearch = appendPaginationQuery(search, limit, page);
      switch (subMenu) {
        case RouterPaths.MENU_INBOX: {
          if (metadata.unread !== prevMetadata.unread) {
            store.dispatch(fetchInboxThreads(profileID, paginatedSearch));
          }
          break;
        }
        case RouterPaths.MENU_STARRED: {
          if (metadata.starred !== prevMetadata.starred) {
            store.dispatch(fetchStarredThreads(profileID, paginatedSearch));
          }
          break;
        }
        case RouterPaths.MENU_UNREAD: {
          if (metadata.unread !== prevMetadata.unread) {
            store.dispatch(fetchUnreadThreads(profileID, paginatedSearch));
          }

          break;
        }
        case RouterPaths.MENU_SENT: {
          if (metadata.sent !== prevMetadata.sent) {
            store.dispatch(fetchSentThreads(profileID, paginatedSearch));
          }

          break;
        }
        case RouterPaths.MENU_DRAFTS: {
          if (metadata.drafts !== prevMetadata.drafts) {
            store.dispatch(fetchDraftMessages(profileID, paginatedSearch));
          }

          break;
        }
        case RouterPaths.MENU_ARCHIVED: {
          if (metadata.archived !== prevMetadata.archived) {
            store.dispatch(fetchArchivedThreads(profileID, paginatedSearch));
          }

          break;
        }
        case RouterPaths.MENU_TRASH: {
          if (metadata.trash !== prevMetadata.trash) {
            store.dispatch(fetchTrashedThreads(profileID, paginatedSearch));
          }
          break;
        }
        default: break;
      }
    }
  }
};

export const sendReadThreadRecipts = (store, profileID, thread) => {
  if (thread) {
    const {unread, id} = thread;
    if (unread === true) {
      store.dispatch(updateThreadReadStatus(profileID, id));
    }
  }
};

export const updateThreadList = (store, profileID, location) => {
  const {pathname, search} = location;
  const match = matchPath(pathname, {path: RouterPaths.MESSAGES_THREAD_VIEW_URL, exact: true, strict: false});
  if (match) {
    const {labelName, subMenu} = match.params;
    if (subMenu) {
      const storeState = store.getState();
      const {threads} = storeState.messages;
      const {limit, page} = threads;
      fetchSubMenuThreads(profileID, store, {subMenu, labelName, search: appendPaginationQuery(search, limit, page)});
    }
  }
};

