import {combineReducers} from 'redux';
import athlete from './athlete.js';
import distance from './distance';
import instantBook from './instantBook';
import price from './price';
import sortBy from './sortBy';
import trainer from './trainer';
import queryBuilder from './queryBuilder';
import searchKey from './searchKey';
import locationKey from './locationKey';
import location from './location';
import renderSearchResult from './renderSearchResult';
import filter from './filter';
import searchLocationList from './locationList';
import searchSportsList from './sportsList';
//import discounts from './discounts';

const searchFilter = combineReducers({
  athlete,
  distance,
  instantBook,
  price,
  sortBy,
  trainer,
  queryBuilder,
  searchKey,
  locationKey,
  renderSearchResult,
  filter,
  location,
  searchLocationList,
  searchSportsList
});

export default searchFilter;

