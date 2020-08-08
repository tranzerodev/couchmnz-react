import {matchPath} from 'react-router';
import QueryString from 'query-string';

import {
  DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY_LIST
} from '../../constants/pathConstants';

import {
  fetchParentOrderHistory
} from '../../actions/index';
import {getDefaultOrderHistoryFilters} from '../../utils/orderHistory';

function isOrderHistory({pathname}) {
  return matchPath(pathname, {path: DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY_LIST, exact: true});
}

export function handleAccountUrlChange(store, profileID, location) {
  console.log('Location :: ', location);
  let search = location.search;
  if (!location.search) {
    const filter = getDefaultOrderHistoryFilters();
    search = '?' + QueryString.stringify(filter);
  }
  if (isOrderHistory(location)) {
    store.dispatch(fetchParentOrderHistory(profileID, search));
  }
}

