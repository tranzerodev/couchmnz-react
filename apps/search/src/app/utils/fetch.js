import axios from 'axios';

/*
const fetch = (method, url, headers) => {
  return axios({
    method,
    url,
    headers
  })
  .then(response => response)
  .catch(err => err);
};
 */

const fetch = source => {
  return axios(source)
  .then(response => response)
  .catch(err => err);
};

export default fetch;
