/* Router path Menu start */
export const MENU_DASHBOARD = 'dashboard';
export const MENU_MESSAGES = 'messages';
export const MENU_INBOX = 'inbox';
export const MENU_STARRED = 'starred';
export const MENU_DRAFTS = 'drafts';
export const MENU_UNREAD = 'unread';
export const MENU_SENT = 'sent';
export const MENU_LABELS = 'labels';
export const MENU_TRASH = 'trash';
export const MENU_ARCHIVED = 'archived';
export const MENU_THREADS = 'threads';
/* Router path Menu end */

/* Router path variables start */
const VARIABLE_SUBMENU = ':subMenu';
const VARIABLE_LABEL_NAME = ':labelName';
const VARIABLE_THREAD_ID = ':threadId';
/* Router path variables  end */

/* Router path URL's start */
export const MESSAGES_ROUTER_PATH = `/${MENU_DASHBOARD}/${MENU_MESSAGES}`;
export const MESSAGES_INBOX_ROUTER_PATH = MESSAGES_ROUTER_PATH + `/${MENU_INBOX}`;
export const MESSAGES_STARRED_ROUTER_PATH = MESSAGES_ROUTER_PATH + `/${MENU_STARRED}`;
export const MESSAGES_DRAFTS_ROUTER_PATH = MESSAGES_ROUTER_PATH + `/${MENU_DRAFTS}`;
export const MESSAGES_UNREAD_ROUTER_PATH = MESSAGES_ROUTER_PATH + `/${MENU_UNREAD}`;
export const MESSAGES_SENT_ROUTER_PATH = MESSAGES_ROUTER_PATH + `/${MENU_SENT}`;
export const MESSAGES_ARCHIVED_ROUTER_PATH = MESSAGES_ROUTER_PATH + `/${MENU_ARCHIVED}`;
export const MESSAGES_TRASH_ROUTER_PATH = MESSAGES_ROUTER_PATH + `/${MENU_TRASH}`;
export const MESSAGES_LABEL_MENU_ROUTER_PATH = MESSAGES_ROUTER_PATH + `/${MENU_LABELS}`;
export const MESSAGES_LABEL_ROUTER_PATH = MESSAGES_LABEL_MENU_ROUTER_PATH + `/${VARIABLE_LABEL_NAME}`;
const VIEW_THREADS = `/${MENU_THREADS}/${VARIABLE_THREAD_ID}`;
export const MESSAGES_LABEL_THREAD_VIEW_ROUTER_PATH = MESSAGES_LABEL_ROUTER_PATH + VIEW_THREADS;
export const MESSAGES_GET_SUBMENU_URL = MESSAGES_ROUTER_PATH + `/${VARIABLE_SUBMENU}`;
export const MESSAGES_GET_SUBMENU_WITH_LABEL_URL = MESSAGES_GET_SUBMENU_URL + `/${VARIABLE_LABEL_NAME}?`;
export const MESSAGES_THREAD_VIEW_URL = MESSAGES_GET_SUBMENU_WITH_LABEL_URL + VIEW_THREADS;
/* Router path URL's end */

/* For ssp search start */
export const SSP_SEARCH_PAGE_URL = '/search';
export const SSP_SEARCH_SPORTS_PAGE_URL = SSP_SEARCH_PAGE_URL + '/sports';
/* For ssp search end */
// SSP details
export const PATH_VARIABLE_NICKNAME = 'nickname';
export const PATH_VARIABLE_SPORT_ID = 'sportID';

export const SSP_SEARCH_DETAILS = `/ssp/:${PATH_VARIABLE_NICKNAME}/:${PATH_VARIABLE_SPORT_ID}`;

export const PATH_VARIABLE_SPORT = 'sportName';

export const PATH_VARIABLE_LOCATION = 'locationName';

export const SSP_SEARCH_SPORT_LOCATION = SSP_SEARCH_PAGE_URL + `/sport/:${PATH_VARIABLE_SPORT}/:${PATH_VARIABLE_LOCATION}?`;

export const SSP_SEARCH_ONLY_LOCATION = SSP_SEARCH_SPORTS_PAGE_URL + `/:${PATH_VARIABLE_LOCATION}?`;
