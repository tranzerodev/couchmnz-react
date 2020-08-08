import {CHANGE_SELECTED_LOCATION, FETCH_LOCATION_REVERSE_LOOKUP_DATA, FULFILLED, FETCH_ELASTIC_SEARCH_DATA, FETCH_NEARBY_LOCATIONS} from '../constants/ActionTypes';
import appConstant from '../constants/appConstants';

const initialState = '';
export default function selectedLocation(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SELECTED_LOCATION: {
      return action.selectedLocation;
    }
    case FETCH_LOCATION_REVERSE_LOOKUP_DATA + FULFILLED: {
      const data = action.payload.data.payload;
      const {city, regionName, countryName} = data;
      const fullAddress = (city ? (city + ',') : '') + (regionName ? (regionName + ',') : '') + countryName;
      return (state === initialState) ? fullAddress : state;
    }
    case FETCH_ELASTIC_SEARCH_DATA + FULFILLED: {
      const newFullAddress = getTrainingLocationFullAddress(action.payload.data);
      return (newFullAddress) ? newFullAddress : state;
    }
    case FETCH_NEARBY_LOCATIONS + FULFILLED: {
      const data = action.payload.data.payload;
      const {worldRegion, country, localRegion, city} = data;
      let fullAddress = '';
      if (data.city) {
        fullAddress += city;
      }
      if (data.state) {
        fullAddress += `, ${data.state}`;
      }
      if (localRegion && localRegion.length > 0) {
        fullAddress += `, ${localRegion}`;
      }

      fullAddress += `, ${country}, ${worldRegion}`;

      return fullAddress;
    }
    default:
      return state;
  }
}

function getTrainingLocationFullAddress(data) {
  const hits = data.hits.hits[0];

  if (hits) {
    const highighter = hits.highlight;
    if (highighter) {
      const locationhighighters = highighter[appConstant.searchQueryKeys.locationName];
      const sportshighlighter = highighter[appConstant.searchQueryKeys.sportName];

      const cityHighlighter = highighter[appConstant.primaryLocSearchESFields[0]];
      const isCityHighlighterExists = Boolean(cityHighlighter && cityHighlighter.length > 0);

      const stateHighlighter = highighter[appConstant.primaryLocSearchESFields[1]];
      const isStateHighlighterExists = Boolean(stateHighlighter && stateHighlighter.length > 0);

      const countryHighlighter = highighter[appConstant.primaryLocSearchESFields[2]];
      const isCountryHighlighterExists = Boolean(countryHighlighter && countryHighlighter.length > 0);

      const worldRegionHighlighter = highighter[appConstant.primaryLocSearchESFields[4]];
      const isWorldRegionHighlighterExists = Boolean(worldRegionHighlighter && worldRegionHighlighter.length > 0);

      if (locationhighighters && locationhighighters.length > 0) {
        const fullAddress = locationhighighters[0];

        const trimmedAddress = clearHeighlighter(fullAddress);

        let trainingLoc = null;
        const sports = hits._source.sports;
        if (sportshighlighter && sportshighlighter.length > 0) {
          const sportName = clearHeighlighter(sportshighlighter[0]).trim();

          const sport = sports.find(sportItem => (sportItem.name.toLowerCase() === sportName.toLowerCase()));

          if (sport) {
            trainingLoc = getTrainingLocFromSport(sport, trimmedAddress);
          }
        }

        for (let i = 0; ((i < sports.length) && (trainingLoc === null)); i++) {
          const curSport = sports[i];
          trainingLoc = getTrainingLocFromSport(curSport, trimmedAddress);
        }
        if (trainingLoc) {
          let formattedAddress = '';
          if (isCityHighlighterExists === true) {
            formattedAddress = trainingLoc.city.name + ', ' + trainingLoc.state.name + ', ' + trainingLoc.country.name + ', ' + trainingLoc.worldRegion.name;
          } else if (isStateHighlighterExists === true) {
            formattedAddress = trainingLoc.state.name + ', ' + trainingLoc.country.name + ', ' + trainingLoc.worldRegion.name;
          } else if (isCountryHighlighterExists === true) {
            formattedAddress = trainingLoc.country.name + ', ' + trainingLoc.worldRegion.name;
          } else if (isWorldRegionHighlighterExists === true) {
            formattedAddress = trainingLoc.worldRegion.name;
          } else {
            formattedAddress = trainingLoc.city.name + ', ' + trainingLoc.state.name + ', ' + trainingLoc.country.name + ', ' + trainingLoc.worldRegion.name;
          }
          return formattedAddress;
        }
      }
    }
  }
  return null;
}

function getTrainingLocFromSport(sport, locationFullAddr) {
  return sport.trainingLocations.find(trainingLocItem => trainingLocItem.fullAddress.toLowerCase() === locationFullAddr.toLowerCase());
}

function clearHeighlighter(text) {
  return text.replace(/<em>|<\/em>/g, '');
}
