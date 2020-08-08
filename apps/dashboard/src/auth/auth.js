/* global localStorage */
import axios from './AxiosInstance';
import config from '../app/config';
// Import decode from 'jwt-decode';
import {GET_JWT_TOKEN} from '../app/constants/WebConstants';
import QueryString from 'query-string';
import {parseUrlTemplate} from '../app/utils/urlHelper';
import {removeShoppincartId} from '../app/utils/shoppingCart';

export const isTokenExpired = decoded => {
  if (decoded.exp < Date.now() / 1000) {
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(config.jwtTokenNameInLocalStorage);
  removeShoppincartId();
  window.location = config.redirectUrl + '/logout';
};

export const getReturnUrl = () => {
  return localStorage.getItem(config.returnUrlKeyName);
};

const getTokenQueryString = name => {
  const url = getReturnUrl();
  if (url) {
    name = name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
};

const getJwtToken = token => {
  const url = parseUrlTemplate(GET_JWT_TOKEN, {token});
  return axios.get(url);
};

const setRequestIntercepter = jwtToken => {
  axios.interceptors.request.use(config => {
    const token = jwtToken ? jwtToken : localStorage.getItem('coachlistJwtAuthToken');
    const headers = {
      // 'x-mock-access': '213b88a141b0a704287809735cd7db', // This Token is for Mock API in APIMINT
      Authorization: 'Bearer ' + token,
      'Content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    };
    config.headers = headers;
    return config;
  }, error => {
    return Promise.reject(error);
  });
};

const setJwtToken = queryStringToken => {
  return getJwtToken(queryStringToken)
    .then(response => {
      if (response.data.responseCode && response.data.responseCode === 1) {
        logout();
      }
      localStorage.setItem(config.jwtTokenNameInLocalStorage, response.data.token);
      setRequestIntercepter(response.data.token);
      return true;
    })
    .catch(error => {
      throw error;
    });
};

const setResponseInterceptor = () => {
  axios.interceptors.response.use(response => {
    if (response.data.responseCode > 0 && response.data.responseCode < 100) {
      logout();
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
    if (error.response && error.response.status === 500) {
      logout();
    }
    return Promise.reject(error);
  });
  return true;
};

const removeQueryString = () => {
  history.pushState(null, '', location.href.split('?')[0]);
};

export const saveReturnUrl = () => {
  const urls = location.href.split('#');
  let path = '';
  const baseQuery = urls[0].split('?');
  let query = {};
  if (baseQuery.length > 1) {
    query = Object.assign({}, query, QueryString.parse(baseQuery[1]));
  }
  if (urls.length > 1) {
    const queryUrl = urls[1].split('?');
    if (queryUrl.length > 1) {
      query = Object.assign({}, query, QueryString.parse(queryUrl[1]));
    }
    path = queryUrl[0];
  }
  localStorage.setItem(config.returnUrlKeyName, (path + '?' + QueryString.stringify(query)));
};

export const auth = () => {
  saveReturnUrl();
  // SetRequestIntercepter();
  setResponseInterceptor();
  const jwtToken = localStorage.getItem(config.jwtTokenNameInLocalStorage);
  if (jwtToken) {
    const queryStringToken = getTokenQueryString(config.tokenQueryStringName);
    const modalStatus = getTokenQueryString(config.modalQueryStringName);
    localStorage.setItem(config.showModalLocalStorage, modalStatus);
    if (queryStringToken) {
      return setJwtToken(queryStringToken).then(data => {
        removeQueryString();
        return data;
      }).catch(error => {
        removeQueryString();
        logout();
      });
    }
    setRequestIntercepter(jwtToken);
    removeQueryString();
    return Promise.resolve(true);
  } else if (getTokenQueryString(config.tokenQueryStringName)) {
    return setJwtToken(getTokenQueryString(config.tokenQueryStringName)).then(data => {
      removeQueryString();
      return data;
    }).catch(error => {
      removeQueryString();
      logout();
      throw error;
    });
  }
  removeQueryString();
  logout();
  return Promise.reject(new Error());
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('coachlistJwtAuthToken');
  const headers = {
    Authorization: 'Bearer ' + token
  };
  return headers;
};

export const removeReturnUrl = () => {
  localStorage.removeItem(config.returnUrlKeyName);
};
