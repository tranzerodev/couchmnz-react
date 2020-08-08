import moment from 'moment';
import {FULFILLED, SEND_MESSAGE, SAVE_MESSAGE_DRAFTS, CHANGE_MESSAGING_PROFILE, LOCATION_URL_CHANGE, STAR_MESSAGE_THREAD, ARCHIVE_MESSAGE_THREAD, UPDATE_MESSAGE_THREAD_LABELS, TRASH_MESSAGE_THREAD, THREAD_LIST_PAGE_CHANGE, POLYGLOT_SET_LANGUAGE, FETCH_MESSAGES_METADATA, FETCH_SELECTED_THREAD, ADD_MESSAGE_LABEL, UPDATE_MESSAGE_ATTACHMENT, REJECTED, PROGRESS, CANCEL_UPDATE_MESSAGE_ATTACHMENT} from '../constants/ActionTypes';
import {handleUrlChange, paginateThreadList, checkMessageMetadataChange, sendReadThreadRecipts, updateThreadList} from './messagingMiddlewareUtils';
import {fetchMessageLabels, updateSelectedThread, fetchMessagesMetadata, pollMessageMetadata} from '../actions';
import history from '../history/configureHistory';
import {matchPath} from 'react-router';
import * as RouterPaths from '../constants/RouterPaths';
import axios from '../../auth/AxiosInstance';
import axiosCancel from 'axios-cancel';

axiosCancel(axios, {
  debug: false // Default
});

import config from '../config';

function uploadAttachment(store, url, attachmentFile) {
  const formData = new FormData();
  const reqID = Math.random().toString();
  formData.append(config.messagingSystem.messageAttachment.fileAttachmentName, attachmentFile);
  axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    requestId: reqID,
    onUploadProgress: progressEvent => {
      const uploadPercentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total), 10);
      store.dispatch({
        type: UPDATE_MESSAGE_ATTACHMENT + PROGRESS,
        percentage: uploadPercentage,
        requestId: reqID,
        attachmentFileName: attachmentFile.name
      });
    }
  }).then(response => {
    if (response.data.responseCode === 0) {
      store.dispatch({
        type: UPDATE_MESSAGE_ATTACHMENT + FULFILLED,
        data: response.data.payload.attachment

      });
    } else {
      store.dispatch({
        type: UPDATE_MESSAGE_ATTACHMENT + REJECTED
      });
    }
  })
    .catch(() => {
      store.dispatch({
        type: UPDATE_MESSAGE_ATTACHMENT + REJECTED
      });
    });
}

const messagingMiddleWareFirst = store => next => action => {
  next(action);
  const storeState = store.getState();
  const {messages} = storeState;
  const {profile} = messages;
  const profileID = profile.id;
  switch (action.type) {
    case CHANGE_MESSAGING_PROFILE: {
      store.dispatch(pollMessageMetadata(profileID));
      store.dispatch(fetchMessageLabels(profileID));
      break;
    }
    case ADD_MESSAGE_LABEL + FULFILLED: {
      store.dispatch(fetchMessageLabels(profileID));
      break;
    }
    case SEND_MESSAGE + FULFILLED: {
      store.dispatch(fetchMessagesMetadata(profileID));
      break;
    }
    case SAVE_MESSAGE_DRAFTS + FULFILLED: {
      store.dispatch(fetchMessagesMetadata(profileID));
      break;
    }
    case FETCH_SELECTED_THREAD + FULFILLED : {
      const thread = messages.selectedThread.data;
      sendReadThreadRecipts(store, profileID, thread);
      break;
    }
    case POLYGLOT_SET_LANGUAGE : {
      const {locale} = action.payload;
      moment.locale(locale);
      break;
    }
    case FETCH_MESSAGES_METADATA + FULFILLED: {
      checkMessageMetadataChange(store, storeState);
      break;
    }
    case STAR_MESSAGE_THREAD + FULFILLED:
    case ARCHIVE_MESSAGE_THREAD + FULFILLED:
    case UPDATE_MESSAGE_THREAD_LABELS + FULFILLED:
    case TRASH_MESSAGE_THREAD + FULFILLED: {
      const {selectedThread} = messages;
      const {router} = storeState;
      const {location} = router;
      if (selectedThread) {
        const {data} = selectedThread;
        if (data) {
          const {id} = data;
          store.dispatch(updateSelectedThread(profileID, id));
          updateThreadList(store, profileID, location);
        }
      }
      if (action.type === TRASH_MESSAGE_THREAD + FULFILLED) {
        const {location} = history;
        const match = matchPath(location.pathname, {path: RouterPaths.MESSAGES_GET_SUBMENU_URL, exact: false, strict: false});
        let url = null;
        if (match) {
          const {subMenu} = match.params;
          if (subMenu === RouterPaths.MENU_LABELS) {
            const labelsMatch = matchPath(location.pathname, {path: RouterPaths.MESSAGES_LABEL_ROUTER_PATH, exact: false, strict: false});
            url = labelsMatch.url;
          } else {
            url = match.url;
          }
          history.push(url);
        }
      }
      break;
    }
    default: {
      break;
    }
  }
};

const messagingMiddleWareSecond = store => next => action => {
  next(action);
  const storeState = store.getState();
  const {messages} = storeState;
  const {profile} = messages;
  const profileID = profile.id;
  switch (action.type) {
    case THREAD_LIST_PAGE_CHANGE: {
      const {router} = storeState;
      const {location} = router;
      const {limit, page} = action;
      paginateThreadList(store, profileID, location, {limit, page});
      break;
    }
    case UPDATE_MESSAGE_ATTACHMENT: {
      const {url, attachmentFile} = action;
      uploadAttachment(store, url, attachmentFile);
      break;
    }
    case CANCEL_UPDATE_MESSAGE_ATTACHMENT: {
      axios.cancel(action.requestId);
      break;
    }
    case LOCATION_URL_CHANGE: {
      handleUrlChange(store, profileID, action.data.location);
      break;
    }
    default: {
      break;
    }
  }
};

export default [
  messagingMiddleWareFirst,
  messagingMiddleWareSecond
];
