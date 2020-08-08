import * as types from '../../constants/ActionTypes';
import {parseUrlTemplate} from '../../utils/urlHelper';
import axios from '../../../auth/AxiosInstance';
import * as WebConstants from '../../constants/WebConstants';

// API call to subscribe Service provider availability
//
export const registerServiceProviderAvailabilty = data => {
  const url = parseUrlTemplate(WebConstants.REGISTER_SERVICE_PROVIDERS_AVAILABILITY);
  const payload = axios.post(url, data);
  return {
    type: types.REGISTER_SERVICE_PROVIDERS_AVAILABILITY,
    payload
  };
};

export const fetchAvailableSportsList = () => {
  const url = parseUrlTemplate(WebConstants.FETCH_AVAILABLE_SPORTS_LIST);
  const payload = axios.get(url);
  return {
    type: types.AVAILABLE_SPORTS_LIST,
    payload
  };
};

// UserID, sportID, lat, lng
export const postSendServiceProviderCoupon = data => {
  const url = parseUrlTemplate(WebConstants.POST_SEND_SERVICE_PROVIDER_COUPON);
  const payload = axios.post(url, data);
  return {
    type: types.POST_SEND_COUPON,
    payload
  };
};
