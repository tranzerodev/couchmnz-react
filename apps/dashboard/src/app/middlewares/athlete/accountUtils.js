import {matchPath} from 'react-router';
import QueryString from 'query-string';

import {
  DASHBOARD_ATHLETE_ACCOUNT_ORDER_HISTORY_LIST
} from '../../constants/pathConstants';

import {
  fetchAthleteOrderHistory
} from '../../actions';
import {getDefaultOrderHistoryFilters} from '../../utils/orderHistory';

function isOrderHistory({pathname}) {
  return matchPath(pathname, {path: DASHBOARD_ATHLETE_ACCOUNT_ORDER_HISTORY_LIST, exact: true});
}

export function handleAccountUrlChange(store, profileID, location) {
  console.log('Location :: ', location);
  if (isOrderHistory(location)) {
    let search = location.search;
    if (!location.search) {
      const filter = getDefaultOrderHistoryFilters();
      search = '?' + QueryString.stringify(filter);
    }
    console.log('Calling Dispatch', 'location.search', search);
    store.dispatch(fetchAthleteOrderHistory(profileID, search));
  }
}

