import decode from 'jwt-decode';

import axios from './AxiosInstance';
import config from '../app/config';
import {removeShoppincartId} from '../app/utils/shoppingCart';
import {logout as logoutAction} from '../app/actions';

export const isTokenExpired = decoded => {
  if (decoded.exp < Date.now() / 1000) {
    return true;
  }
  return false;
};

export const setJwtToken = jwtToken => {
  localStorage.setItem(config.jwtTokenNameInLocalStorage, jwtToken);
};
export const isAuthenticated = () => {
  const token = localStorage.getItem(config.jwtTokenNameInLocalStorage);
  if (token) {
    const decoded = decode(token);
    if (!isTokenExpired(decoded)) {
      return true;
    }
  }
  return false;
};

export const isJwtTokenExists = () => {
  const token = localStorage.getItem(config.jwtTokenNameInLocalStorage);
  return (token && (token.trim().length > 0));
};

export const setResponseInterceptor = store => {
  axios.interceptors.response.use(response => {
    if (response.data.responseCode > 0 && response.data.responseCode < 100) {
      store.dispatch(logoutAction());
    }
    if (response.headers.authorization) {
      const token = response.headers.authorization.split(' ')[1];
      const currentToken = localStorage.getItem('coachlistJwtAuthToken');
      if (currentToken !== token) {
        localStorage.setItem('coachlistJwtAuthToken', token);
      }
    }
    return response;
  }, error => {
    return Promise.reject(error);
  });
  return true;
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('coachlistJwtAuthToken');
  const headers = {
    Authorization: 'Bearer ' + token
  };
  return headers;
};

/* Axios request intercepter */

export const setAxiosRequestIntercepter = () => {
  axios.interceptors.request.use(axiosConfig => {
    const token = localStorage.getItem(config.jwtTokenNameInLocalStorage);
    const headers = {
      'Content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    };
    if (token) {
      headers.Authorization = 'Bearer ' + token;
    }
    axiosConfig.headers = headers;
    return axiosConfig;
  }, error => {
    return Promise.reject(error);
  });
};

export const logout = () => {
  localStorage.removeItem(config.jwtTokenNameInLocalStorage);
  removeShoppincartId();
//  window.location = config.redirectUrl;
};

export const decodeUserID = () => {
  const token = localStorage.getItem(config.jwtTokenNameInLocalStorage);
  const userId = decode(token).sub;
  console.log(userId);
  return userId;
};
