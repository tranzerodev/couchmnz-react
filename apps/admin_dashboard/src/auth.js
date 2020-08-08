
import config from './config';

export const logout = () => {
  console.log('called logout');
  localStorage.removeItem('cl-adm-token');
  localStorage.removeItem('cl-adm-role');
  window.location = config.redirectUrl;
};

export const auth = () => {
  const token = localStorage.getItem('cl-adm-token');
  if (token) {
    return Promise.resolve(true);
  }
  logout();
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('cl-adm-token');
  const headers = {
    Authorization: 'Token ' + token
  };
  return headers;
};
