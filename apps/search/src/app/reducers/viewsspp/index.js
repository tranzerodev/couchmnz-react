import {combineReducers} from 'redux';
import sspSessions from './sspSessions';
import sspData from './sspData';
import contactSSP from './contactSSP';

const viewssp = combineReducers({
  sspSessions,
  sspData,
  contactSSP
});

export default viewssp;
