import bodybuilder from 'bodybuilder';
import {fetchSportsNameES, fetchLocationsNameES} from '../actions';
import {FETCH_SPORT_SUGGESTION, FETCH_LOCATION_SUGGESTION} from '../constants/ActionTypes';
import appConstants from '../constants/appConstants';

export function getSportNameSuggestionQuery(bodybuilderObj, sportName) {
  const sportsKey = sportName.toLowerCase();
  sportsKey.split(' ').forEach(sportKeyItem => {
    bodybuilderObj = bodybuilderObj.query('wildcard', 'sports.name', `*${sportKeyItem}*`);
  });
  bodybuilderObj = bodybuilderObj.rawOption('highlight',
    {
      fields: {
        'sports.name': {}
      }
    }
  );
  return bodybuilderObj;
}

const fetchSuggestionsMiddleware = store => next => action => {
  if (action.type === FETCH_SPORT_SUGGESTION) {
    let bodybuilderObj = bodybuilder();
    bodybuilderObj = getSportNameSuggestionQuery(bodybuilderObj, action.sportsKey);
    const query = bodybuilderObj.build();
    store.dispatch(fetchSportsNameES(query));
  } else if (action.type === FETCH_LOCATION_SUGGESTION) {
    let bodybuilderObj = bodybuilder();

    const locationKey = action.locationKey.toLowerCase();
    const locKeys = locationKey.split(' ');
    appConstants.locationSuggesttionESFields.forEach(fieldItem => {
      bodybuilderObj = bodybuilderObj.orQuery('query', p => {
        let subQuery = p;
        locKeys.forEach(locKeyItem => {
          subQuery = subQuery.query('wildcard', `${fieldItem}.name`, `*${locKeyItem}*`);
        });
        return subQuery;
      });
      bodybuilderObj = bodybuilderObj.orQuery('match', `${fieldItem}.locationS`, locationKey);
    });

    bodybuilderObj = bodybuilderObj.rawOption('highlight',
      {
        fields: {
          '*': {}
        }
      });

    const query = bodybuilderObj.build();
    store.dispatch(fetchLocationsNameES(query));
  }
  next(action);
};

export default fetchSuggestionsMiddleware;
