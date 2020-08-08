import config from '../config';

export const setupShortRegistrationFlow = () => {
  const {auth} = config;
  const {keys} = auth.localStorage;
  localStorage.setItem(keys.registration, auth.localStorage.registration.short);
  localStorage.setItem(keys.shortRegRedirectUrl, window.location.href);
};
