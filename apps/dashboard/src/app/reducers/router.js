import {LOCATION_URL_CHANGE} from '../constants/ActionTypes';
import QueryString from 'query-string';
const initialState = {
  query: null
};
const router = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_URL_CHANGE : {
      const newRoute = action.data;
      const {search} = newRoute.location;
      const query = QueryString.parse(search);
      const newState = Object.assign({}, newRoute, {query});
      return newState;
    }
    default:
      return state;
  }
};

export default router;

