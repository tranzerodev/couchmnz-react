import appConstants from '../constants/appConstants';
import {sortedElasticSearchData} from '../actions/index';

const sortElasticSearchData = (store, action) => {
  const storeState = store.getState();
  const {filterQueries, sortinFilterValues} = appConstants;
  const {query} = storeState.router;
  const {data} = action.payload;
  const sortBy = query[filterQueries.sortBy];
  data.hits.hits.sort((obj1, obj2) => {
    if (sortBy === sortinFilterValues.priceHighToLow) {
      return obj2.sort[1] - obj1.sort[1];
    } else if (sortBy === sortinFilterValues.priceLowToHigh) {
      return obj1.sort[1] - obj2.sort[1];
    }
    return obj1.sort[1] - obj2.sort[1]; // Default low to high
  });
  store.dispatch(sortedElasticSearchData(data));
};

export default sortElasticSearchData;
