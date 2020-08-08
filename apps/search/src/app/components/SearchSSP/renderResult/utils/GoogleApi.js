export const GoogleApi = function (opts) {
  opts = opts || {};

  const apiKey = opts.apiKey;
  const libraries = opts.libraries || [];
  const client = opts.client;
  const URL = 'https://maps.googleapis.com/maps/api/js';

  const googleVersion = '3.22';
  /* Const script = null;
  const google = window.google = null;
  const loading = false; */
  const channel = null;
  const language = null;
  const region = null;

  /* Const onLoadEvents = []; */

  const url = () => {
    const url = URL;
    const params = {
      key: apiKey,
      callback: 'CALLBACK_NAME',
      libraries: libraries.join(','),
      client,
      v: googleVersion,
      channel,
      language,
      region
    };

    const paramStr = Object.keys(params)
      .filter(k => Boolean(params[k]))
      .map(k => `${k}=${params[k]}`).join('&');

    return `${url}?${paramStr}`;
  };

  return url();
};

export default GoogleApi;
