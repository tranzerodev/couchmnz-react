import {createHashHistory} from 'history';
import {locationChange} from '../actions';
const history = createHashHistory();
export function configureHistory(store) {
  const {action, location} = history;
  store.dispatch(locationChange({action, location}));
  history.listen((location, action) => {
    store.dispatch(locationChange({action, location}));
  });
  return history;
}

export default history;

