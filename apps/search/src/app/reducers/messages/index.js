import {combineReducers} from 'redux';

import labels from './labels';
import sent from './sent';
import drafts from './drafts';
import profile from './profile';
import selectedThread from './selectedThread';
import metadata from './metadata';
import threads from './threads';
import threadFilters from './threadFilters';
import recipients from './recipients';

const messageReducer = combineReducers({
  labels,
  sent,
  drafts,
  profile,
  selectedThread,
  metadata,
  threads,
  threadFilters,
  recipients
});

export default messageReducer;
