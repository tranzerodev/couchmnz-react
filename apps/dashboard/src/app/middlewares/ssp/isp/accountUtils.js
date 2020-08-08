import {matchPath} from 'react-router';

import {
  fetchEarningsList,
  fetchPayoutList
} from '../../../actions/index';
import {DASHBOARD_ACCOUNT_PAYOUT_HISTORY_EARNINGS, DASHBOARD_ACCOUNT_PAYOUT_HISTORY_PAYOUTS} from '../../../constants/pathConstants';

function isEarningHistory({pathname}) {
  return matchPath(pathname, {path: DASHBOARD_ACCOUNT_PAYOUT_HISTORY_EARNINGS, exact: true});
}
function isPayoutHistory({pathname}) {
  return matchPath(pathname, {path: DASHBOARD_ACCOUNT_PAYOUT_HISTORY_PAYOUTS, exact: true});
}
export function handleAccountUrlChange(store, profileID, location) {
  console.log('Location :: ', location);
  if (isEarningHistory(location)) {
    console.log('Calling Dispatch for Earning');
    console.log('Search :: ', location.search);
    store.dispatch(fetchEarningsList({profileID}, location.search));
  }
  if (isPayoutHistory(location)) {
    console.log('Calling Dispatch for Payouts');
    console.log('Search :: ', location.search);
    store.dispatch(fetchPayoutList({profileID}, location.search));
  }
}

