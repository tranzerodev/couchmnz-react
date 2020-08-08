import bodybuilder from 'bodybuilder';
import appConstants from '../constants/appConstants';
import QueryString from 'query-string';
import {matchPath} from 'react-router';
import {
  fetchElasticSearchData,
  fetchSportsNameES,
  updateSportHitCount
} from '../actions';
import pathToRegExp from 'path-to-regexp';
import {SSP_SEARCH_SPORT_LOCATION, PATH_VARIABLE_SPORT, PATH_VARIABLE_LOCATION, SSP_SEARCH_ONLY_LOCATION, PATH_VARIABLE_PAGE} from '../constants/RouterPaths';
import {urlPathToText, convertToArray, getTrimmedQueryParam} from '../utils/sspSearchUtils';
import history from '../history/configureHistory';

export default function buildElasticSearchQuery(store, query, pathname) {
  console.log('IN elastic search query builder');
  const {
    locationName,
    sportName,
    athleteGenders,
    athleteSkills,
    athleteAgeGroups,
    yearOfCoachingExperienceRanges,
    yearOfPlayingExperienceRanges,
    sspSubType,
    basePrice,
    minPrice,
    maxPrice,
    sspSubTypeNames,
    certificates,
    isCertified,
    certificatesCategory,
    certificatesSubCategory,
    sspTypes,
    gender,
    canAcceptInstantBooking,
    canTravel,
    trainingLocations,
    trainingLocation,
    distance,
    unit
  } = appConstants.searchQueryKeys;
  const {filterQueries} = appConstants;
  const storeState = store.getState();
  const {latitude, longitude} = storeState.locationLookupData.data;
  const defaultTrainingLocLatLng = (latitude && longitude) ? `${latitude},${longitude}` : null;

  const athleteGendersVal = convertToArray(query[filterQueries.athleteGender]);
  const athleteSkillsVal = convertToArray(query[filterQueries.athleteSkillLevels]);
  const athleteAgeGroupsVal = convertToArray(query[filterQueries.athleteAgeGroups]);
  const yearOfCoachingExperienceRangesVal = convertToArray(query[filterQueries.yearOfTrainingExperienceParam]);
  const yearOfPlayingExperienceRangesVal = convertToArray(query[filterQueries.yearOfPlayingExperienceParam]);
  const sspSubTypeNamesVal = convertToArray(query[filterQueries.sessionTypesParam]);
  const sspTypesVal = convertToArray(query[filterQueries.trainerTypesParam]);
  const genderVal = query[filterQueries.trainerGenderParam];
  const canTravelVal = ((query[filterQueries.canTravelParam] && query[filterQueries.canTravelParam] === 'Y'));
  const canAcceptInstantBookingVal = ((query[filterQueries.instantBookParam] && query[filterQueries.instantBookParam] === 'Y'));
  const isCertifiedVal = ((query[filterQueries.isCertifiedParam] && query[filterQueries.isCertifiedParam] === 'Y'));
  const minPriceVal = query[filterQueries.minPrice] ? query[filterQueries.minPrice] : 0;
  const maxPriceVal = query[filterQueries.maxPrice] ? query[filterQueries.maxPrice] : 0;
  const sortBy = query[filterQueries.sortBy];

  const trainingLocationVal = query[filterQueries.trainingLatLong] ? query[filterQueries.trainingLatLong] : defaultTrainingLocLatLng;
  const distanceVal = query[filterQueries.distanceParam] ? query[filterQueries.distanceParam] : null;
  const unitVal = query[unit] ? query[unit] : 'mi';
  const pageVal = query[filterQueries.page] ? parseInt(query[filterQueries.page], 0) : 0;
  const limitVal = appConstants.defaultLimit;
  const startLimit = pageVal > 0 ? ((pageVal * limitVal)) : 0;

  let bodybuilderQueryObj = bodybuilder();
  let sportsKey = null;

  bodybuilderQueryObj = primaryFilterQuery(bodybuilderQueryObj, pathname).notQuery('missing', 'sports.trainingLocations');
  bodybuilderQueryObj = bodybuilderQueryObj.andQuery('exists', {field: 'nickName'});

  bodybuilderQueryObj = prepareAthleteFilterQuery(bodybuilderQueryObj);
  bodybuilderQueryObj = prepareTrainerFilterQuery(bodybuilderQueryObj);
  if (maxPriceVal > 0 || minPriceVal > 0) {
    bodybuilderQueryObj = preparePriceRangeQuery(bodybuilderQueryObj);
  }

  if (distanceVal && trainingLocationVal) {
    bodybuilderQueryObj = prepareDistanceRangeQuery(bodybuilderQueryObj);
  }

  // If (sortBy) {
  bodybuilderQueryObj = prepareSortingQuery(bodybuilderQueryObj);
  // }

  bodybuilderQueryObj = bodybuilderQueryObj.rawOption('highlight', {
    fields: {
      'sports.name': {},
      'sports.trainingLocations.*': {}
    }
  }).rawOption('size', limitVal).rawOption('from', startLimit);
  bodybuilderQueryObj = bodybuilderQueryObj.rawOption('aggs',
    {
      prices: {
        aggs: {
          minPrice: {
            min: {
              field: 'sports.sspSubType.basePrice',
              missing: 0.0
            }
          },
          maxPrice: {
            max: {
              field: 'sports.sspSubType.basePrice',
              missing: 0.0
            }
          }
        },
        nested: {
          path: 'sports.sspSubType'
        }
      }
    }
  );
  const elasticQuery = bodybuilderQueryObj.build();
  store.dispatch(fetchElasticSearchData(elasticQuery));

  function primaryFilterQuery(bodybuilderObj, pathname) {
    const match = matchPath(pathname, {path: SSP_SEARCH_SPORT_LOCATION, strict: false, exact: true});
    console.log('Match location', match);

    let locationKey = null;
    if (match) {
      sportsKey = match.params[PATH_VARIABLE_SPORT];
      locationKey = match.params[PATH_VARIABLE_LOCATION];
    } else {
      const matchOnlyLocation = matchPath(pathname, {path: SSP_SEARCH_ONLY_LOCATION, strict: false, exact: true});
      if (matchOnlyLocation) {
        locationKey = matchOnlyLocation.params[PATH_VARIABLE_LOCATION];
      }
    }

    if (sportsKey) {
      sportsKey = urlPathToText(sportsKey);
      increaseSportsHitCount(store, sportsKey);
      sportsKey.toLowerCase().split(' ').forEach(sportKeyItem => {
        bodybuilderObj = bodybuilderObj.andQuery('wildcard', sportName, `*${sportKeyItem}*`);
      });
    }
    if (locationKey) {
      locationKey = urlPathToText(locationKey);
      const locKeys = locationKey.toLowerCase().split(' ');
      bodybuilderObj = bodybuilderObj.andQuery('bool', q => {
        let subQuery = q;
        appConstants.primaryLocSearchESFields.forEach(locationFields => {
          locKeys.forEach(locKeyItem => {
            subQuery = subQuery.orQuery('match', locationFields, `${locKeyItem}`);
          });
        });
        return subQuery;
      });
    }
    return bodybuilderObj;
  }

  function prepareAthleteFilterQuery(bodybuilderObj) {
    if (athleteGendersVal.length > 0) {
      bodybuilderObj = bodybuilderObj.andQuery('bool', q => {
        let subQuery = q;
        athleteGendersVal.forEach(athleteGender => {
          subQuery = subQuery.orQuery('match', athleteGenders, athleteGender);
        });

        return subQuery;
      });
    }

    if (athleteSkillsVal.length > 0) {
      bodybuilderObj = bodybuilderObj.andQuery('bool', q => {
        let subQuery = q;

        athleteSkillsVal.forEach(athleteSkill => {
          subQuery = subQuery.orQuery('match', athleteSkills, athleteSkill);
        });

        return subQuery;
      });
    }

    if (athleteAgeGroupsVal.length > 0) {
      bodybuilderObj = bodybuilderObj.andQuery('bool', q => {
        let subQuery = q;
        athleteAgeGroupsVal.forEach(athleteAgeGroup => {
          subQuery = subQuery.orQuery('match', athleteAgeGroups, athleteAgeGroup);
        });

        return subQuery;
      });
    }
    return bodybuilderObj;
  }

  function prepareTrainerFilterQuery(bodybuilderObj) {
    prepareCoachingExperienceQuery(bodybuilderObj);
    preparePlayingExperienceQuery(bodybuilderObj);
    if (sspSubTypeNamesVal.length > 0) {
      bodybuilderObj = bodybuilderObj.andQuery('query', q => {
        const subQuery = q;
        subQuery.query('nested', 'path', sspSubType, p => {
          let nestedSubQuery = p;
          sspSubTypeNamesVal.forEach(sspSubTypeName => {
            nestedSubQuery = nestedSubQuery.orQuery('match', sspSubTypeNames, sspSubTypeName);
          });

          return nestedSubQuery;
        });

        return subQuery;
      });
    }

    if (sspTypesVal.length > 0) {
      bodybuilderObj = bodybuilderObj.andQuery('bool', q => {
        let subQuery = q;
        sspTypesVal.forEach(sspType => {
          subQuery = subQuery.orQuery('match', sspTypes, sspType);
        });

        return subQuery;
      });
    }

    if (genderVal) {
      bodybuilderObj = bodybuilderObj.andQuery('match', gender, genderVal);
    }

    if (canAcceptInstantBookingVal) {
      bodybuilderObj = bodybuilderObj.andQuery('match', canAcceptInstantBooking, canAcceptInstantBookingVal);
    }

    if (canTravelVal) {
      bodybuilderObj = bodybuilderObj.andQuery('match', canTravel, canTravelVal);
    }

    if (isCertifiedVal) {
      bodybuilderObj = bodybuilderObj.andQuery('query', q => {
        const subQuery = q;
        subQuery.query('nested', 'path', certificates, q => {
          let nestedSubQuery = q;

          nestedSubQuery = nestedSubQuery.query('match', certificatesCategory, 'general');
          if (sportsKey && sportsKey.length > 0) {
            nestedSubQuery = nestedSubQuery.andQuery('query', q => {
              let mustSubQuery = q;
              sportsKey.toLowerCase().split(' ').forEach(sportKeyItem => {
                mustSubQuery = mustSubQuery.orQuery('wildcard', certificatesSubCategory, `*${sportKeyItem}*`);
              });
              return mustSubQuery;
            });
          }
          return nestedSubQuery;
        });
        return subQuery;
      });
    }

    return bodybuilderObj;
  }

  function prepareCoachingExperienceQuery(bodybuilderObj) {
    if (yearOfCoachingExperienceRangesVal.length > 0) {
      bodybuilderObj = bodybuilderObj.andQuery('bool', q => {
        let subQuery = q;
        yearOfCoachingExperienceRangesVal.forEach(yearOfCoachingExperienceRange => {
          const experienceRange = {};
          if (yearOfCoachingExperienceRange.includes('<')) {
            const experienceValues = yearOfCoachingExperienceRange.split('<');
            if (experienceValues.length === 2) {
              Object.assign(experienceRange, {lt: `${experienceValues[1]}`});
            }
          } else if (yearOfCoachingExperienceRange.includes('>')) {
            const experienceValues = yearOfCoachingExperienceRange.split('>');

            if (experienceValues.length === 2) {
              Object.assign(experienceRange, {gt: `${experienceValues[1]}`});
            }
          } else if (yearOfCoachingExperienceRange.includes('-')) {
            const experienceValues = yearOfCoachingExperienceRange.split('-');

            if (experienceValues.length === 2) {
              Object.assign(experienceRange, {gte: `${experienceValues[0]}`});
              Object.assign(experienceRange, {lte: `${experienceValues[1]}`});
            }
          }
          console.log('experienceRange', experienceRange);
          subQuery = subQuery.orQuery('range', yearOfCoachingExperienceRanges, experienceRange);
        });

        return subQuery;
      });
    }

    return bodybuilderObj;
  }

  function preparePlayingExperienceQuery(bodybuilderObj) {
    if (yearOfPlayingExperienceRangesVal.length > 0) {
      bodybuilderObj = bodybuilderObj.andQuery('bool', q => {
        let subQuery = q;
        yearOfPlayingExperienceRangesVal.forEach(yearOfPlayingExperienceRange => {
          const experienceRange = {};
          if (yearOfPlayingExperienceRange.includes('<')) {
            const experienceValues = yearOfPlayingExperienceRange.split('<');
            if (experienceValues.length === 2) {
              Object.assign(experienceRange, {lt: `${experienceValues[1]}`});
            }
          } else if (yearOfPlayingExperienceRange.includes('>')) {
            const experienceValues = yearOfPlayingExperienceRange.split('>');

            if (experienceValues.length === 2) {
              Object.assign(experienceRange, {gt: `${experienceValues[1]}`});
            }
          } else if (yearOfPlayingExperienceRange.includes('-')) {
            const experienceValues = yearOfPlayingExperienceRange.split('-');

            if (experienceValues.length === 2) {
              Object.assign(experienceRange, {gte: `${experienceValues[0]}`});
              Object.assign(experienceRange, {lte: `${experienceValues[1]}`});
            }
          }
          console.log('experienceRange', experienceRange);
          subQuery = subQuery.orQuery('range', yearOfPlayingExperienceRanges, experienceRange);
        });

        return subQuery;
      });
    }

    return bodybuilderObj;
  }

  function preparePriceRangeQuery(bodybuilderObj) {
    bodybuilderObj = bodybuilderObj.andQuery('query', q => {
      const subQuery = q;
      subQuery.query('nested', 'path', sspSubType, q => {
        let nestedSubQuery = q;
        let priceMinMaxQueryObj = {gte: minPriceVal, lte: maxPriceVal};
        if (minPriceVal === 0) {
          priceMinMaxQueryObj = {lte: maxPriceVal};
        } else if (maxPriceVal === 0) {
          priceMinMaxQueryObj = {gte: minPriceVal};
        }
        nestedSubQuery = nestedSubQuery.query('range', basePrice, priceMinMaxQueryObj);
        if (sspSubTypeNamesVal && sspSubTypeNamesVal.length > 0) {
          nestedSubQuery = nestedSubQuery.andQuery('query', q => {
            let mustSubQuery = q;
            sspSubTypeNamesVal.forEach(sspSubTypeName => {
              mustSubQuery = mustSubQuery.orQuery('match', sspSubTypeNames, sspSubTypeName);
            });
            return mustSubQuery;
          });
        }

        return nestedSubQuery;
      });
      return subQuery;
    });

    return bodybuilderObj;
  }

  function prepareDistanceRangeQuery(bodybuilderObj) {
    bodybuilderObj = bodybuilderObj.andQuery('query', q => {
      const subQuery = q;
      subQuery.query('nested', 'path', trainingLocations, p => {
        let nestedSubQuery = p;
        nestedSubQuery = nestedSubQuery.orQuery('geo_distance', {[distance]: distanceVal, [unit]: unitVal, [trainingLocation]: trainingLocationVal});
        return nestedSubQuery;
      });

      return subQuery;
    });

    return bodybuilderObj;
  }

  function prepareSortingQuery(bodybuilderObj) {
    bodybuilderObj.rawOption('sort', [{'sports.sspSubType.basePrice': {order: 'asc'}}, {'sports.sspSubType.basePrice': {order: 'acs'}}]);
    switch (sortBy) {
      case appConstants.sortinFilterValues.priceHighToLow: {
        // Return bodybuilderObj.sort(basePrice, 'desc');
        return bodybuilderObj.rawOption('sort', [{'sports.sspSubType.basePrice': {order: 'desc'}}, {'sports.sspSubType.basePrice': {order: 'asc'}}]);
      }
      case appConstants.sortinFilterValues.priceLowToHigh: {
        //        Return bodybuilderObj.sort(basePrice, 'asc');
        return bodybuilderObj.rawOption('sort', [{'sports.sspSubType.basePrice': {order: 'asc'}}, {'sports.sspSubType.basePrice': {order: 'asc'}}]);
      }
      default:return bodybuilderObj;
    }
  }
}

function clearHeighlighter(text) {
  return text.replace(/<em>|<\/em>/g, '');
}

/* eslint camelcase:0 */
function generateSporNameSuggestQuery(bodybuilderObj, sportname) {
  bodybuilderObj = bodybuilderObj.rawOption('size', 0)
    .rawOption('suggest', {
      text: sportname,
      simple_phrase: {
        phrase: {
          analyzer: 'standard',
          field: appConstants.searchQueryKeys.sportName,
          real_word_error_likelihood: 0.95,
          max_errors: 0.5,
          size: 1,
          direct_generator: [
            {
              field: appConstants.searchQueryKeys.sportName,
              suggest_mode: 'always',
              min_word_length: 1
            }
          ]
        }

      }
    }
    );
  return bodybuilderObj;
}
/* eslint camelcase:0 */

function increaseSportsHitCount(store, sportName) {
  let bodybuilderObj = bodybuilder();
  bodybuilderObj = generateSporNameSuggestQuery(bodybuilderObj, sportName);
  const query = bodybuilderObj.build();
  fetchSportsNameES(query).payload.then(response => {
    console.log('resposneii', response);
    const sportNames = [];

    const suggestPhrase = response.data.suggest.simple_phrase[0];
    if (suggestPhrase.options[0]) {
      const sportname = suggestPhrase.options[0].text;
      sportNames.push(sportname);
      changeCurrentSportName(history, sportname);
    } else {
      sportNames.push(sportName);
    }

    store.dispatch(updateSportHitCount(sportNames));
  }).catch(error => console.log('Error', error));
}

function changeCurrentSportName(history, sportname) {
  const {location} = history;
  const {pathname, search} = location;

  const match = matchPath(pathname, {path: SSP_SEARCH_SPORT_LOCATION, strict: false, exact: true});
  console.log('Match location', match);

  let locationName = null;
  if (match) {
    locationName = match.params[PATH_VARIABLE_LOCATION];
  } else {
    const matchOnlyLocation = matchPath(pathname, {path: SSP_SEARCH_ONLY_LOCATION, strict: false, exact: true});
    if (matchOnlyLocation) {
      locationName = matchOnlyLocation.params[PATH_VARIABLE_LOCATION];
    }
  }

  const sportLocationPath = pathToRegExp.compile(SSP_SEARCH_SPORT_LOCATION);
  const newPathname = sportLocationPath(
    {
      [PATH_VARIABLE_SPORT]: sportname,
      [PATH_VARIABLE_LOCATION]: (locationName) ? locationName : undefined
    }
  );

  if (newPathname) {
    history.push({
      pathname: newPathname,
      search
    });
  }
}

