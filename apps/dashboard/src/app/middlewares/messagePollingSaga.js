import 'regenerator-runtime/runtime';
import {delay} from 'redux-saga';
import {call, put, race, fork, take} from 'redux-saga/effects';
import {POLL_MESSAGES_METADATA, CANCEL_POLL_MESSAGES_METADATA, CANCEL_SHOPPING_CART_DATA, POLL_SHOPPING_CART_DATA} from '../constants/ActionTypes';
import appConstants from '../constants/appConstants';
import {fetchMessagesMetadata, pollMessageMetadata, pollShoppingCartdata, updateShoppingCartItems} from '../actions';
import config from '../config';

const METADATA_POLL_DELAY = config.messagingSystem.metadataPollDelay;
const SHOPPING_CART_POLL_DELAY = config.messagingSystem.shoppingCartDataPollDelay;

function * pollMessagesMetadata(profileID) {
  yield put(fetchMessagesMetadata(profileID));
  yield call(delay, METADATA_POLL_DELAY);
  yield put(pollMessageMetadata(profileID));
}

function * watchPollData() {
  while (true) {
    const {profileID} = yield take(POLL_MESSAGES_METADATA);
    console.log('saga middleware');
    yield race([
      fork(pollMessagesMetadata, profileID),
      take(CANCEL_POLL_MESSAGES_METADATA)
    ]);
  }
}

function * pollShoppingCartData(profileID) {
  const data = JSON.parse(localStorage.getItem(appConstants.shoppingCart.localStorageKey));
  const canUpdate = localStorage.getItem(appConstants.shoppingCart.canUpdateShoppingCartKey) === appConstants.shoppingCart.canUpdate.Y;
  if (canUpdate) {
    localStorage.setItem(appConstants.shoppingCart.canUpdateShoppingCartKey, appConstants.shoppingCart.canUpdate.N);
    yield put(updateShoppingCartItems(data));
  }

  console.log('saga middleware for shopping cart');
  yield call(delay, SHOPPING_CART_POLL_DELAY);
  yield put(pollShoppingCartdata());
}

function * watchPollShoppingCartData() {
  while (true) {
    const {profileID} = yield take(POLL_SHOPPING_CART_DATA);
    console.log('saga middleware for shopping cart');
    yield race([
      fork(pollShoppingCartData, profileID),
      take(CANCEL_SHOPPING_CART_DATA)
    ]);
  }
}

export default function * root() {
  yield [
    watchPollData(),
    watchPollShoppingCartData()
    // Other watchers here
  ];
}
