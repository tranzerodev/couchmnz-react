import QueryString from 'query-string';

import appConstants from '../constants/appConstants';

const {shoppingCart} = appConstants;
const {localStorageKeys, queryString} = shoppingCart;
const {cartId} = queryString;

export function getShoppingCartId() {
  return localStorage.getItem(localStorageKeys.cartId);
}

export function setShoppingCartId(id) {
  return localStorage.setItem(localStorageKeys.cartId, id);
}

export function getShoppingCartIdQueryString() {
  const data = {
    [cartId]: getShoppingCartId()
  };
  return '?' + QueryString.stringify(data);
}

export function saveSchedules(schedules) {
  let flatData = null;
  if (schedules) {
    flatData = JSON.stringify(schedules);
  }
  localStorage.setItem(localStorageKeys.savedSchedules, flatData);
}

export function getSavedSchedules() {
  const flatData = localStorage.getItem(localStorageKeys.savedSchedules);
  let jsonData = null;
  if (flatData) {
    jsonData = JSON.parse(flatData);
  }
  return jsonData;
}

export function removeSavedSchedules() {
  localStorage.removeItem(localStorageKeys.savedSchedules);
}

export function removeShoppincartId() {
  localStorage.removeItem(localStorageKeys.cartId);
}

export function getTotalItems(cartItems) {
  let itemCount = 0;
  if (cartItems && cartItems.length > 0) {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].orderItems.length) {
        itemCount += cartItems[i].orderItems.length;
      }
    }
  }
  return itemCount;
}
