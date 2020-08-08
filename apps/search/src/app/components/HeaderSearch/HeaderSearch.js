import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import pathToRegExp from 'path-to-regexp';
import Autosuggest from '../AutoSuggetion';
import QueryString from 'query-string';

import appConstants from '../../constants/appConstants';

import {
  fetchSportsSuggestion, fetchLocationsSuggestion, changeSelectedLocation
} from '../../actions';
import {SSP_SEARCH_SPORT_LOCATION, PATH_VARIABLE_SPORT, PATH_VARIABLE_LOCATION, SSP_SEARCH_ONLY_LOCATION} from '../../constants/RouterPaths';
import {textToUrlPathString, urlPathToText, getTrimmedQueryParam} from '../../utils/sspSearchUtils';

const {searchQueryKeys} = appConstants;

function getLocationSuggestionValue(suggestion) {
  return suggestion.replace(/<em>|<\/em>/g, '');
}

function getSportNameSuggestionValue(suggestion) {
  return suggestion.replace(/<em>|<\/em>/g, '');
}

class HeaderSearch extends Component {
  constructor(props) {
    super(props);

    const {match} = this.props;
    const {params} = match;
    const newSportName = params[PATH_VARIABLE_SPORT];
    const newLocationName = params[PATH_VARIABLE_LOCATION];
    let sportName = '';
    if (newSportName) {
      sportName = urlPathToText(newSportName);
    }

    let locationName = '';
    if (newLocationName) {
      locationName = urlPathToText(newLocationName);
    }

    this.state = {
      sportName,
      locationName
    };
    this.renderSportName = this.renderSportName.bind(this);
    this.renderLocationName = this.renderLocationName.bind(this);
    this.handleSportsChange = this.handleSportsChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleOnSelectLocationSuggestion = this.handleOnSelectLocationSuggestion.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {match} = nextProps;
    const oldMatchParams = this.props.match.params;
    const {params} = match;
    const newSportName = params[PATH_VARIABLE_SPORT];
    const newLocationName = params[PATH_VARIABLE_LOCATION];
    const oldSportName = oldMatchParams[PATH_VARIABLE_SPORT];
    const oldLocationName = oldMatchParams[PATH_VARIABLE_LOCATION];
    if ((newSportName !== oldSportName) || (oldLocationName !== newLocationName)) {
      let sportName = '';
      if (newSportName) {
        sportName = urlPathToText(newSportName);
      }

      let locationName = '';
      if (newLocationName) {
        locationName = urlPathToText(newLocationName);
      }

      this.setState({
        sportName,
        locationName
      });
    }
  }

  handleSportsChange(event, {newValue}) {
    this.setState({
      sportName: newValue
    });
    this.props.fetchSportsSuggestion(newValue);
  }

  handleLocationChange(event, {newValue}) {
    this.setState({
      locationName: newValue
    });
    this.props.fetchLocationsSuggestion(newValue);
  }

  handleSearch(event) {
    event.preventDefault();
    const {history, query} = this.props;
    // Const {location} = history;
    // Const {search} = location;

    console.log('Search ::: ', search);
    const updatedFilters = Object.assign({}, query,
      {
        page: undefined
      }
    );

    const search = QueryString.stringify(updatedFilters);
    const sportname = getTrimmedQueryParam(this.state.sportName);
    const locName = getTrimmedQueryParam(this.state.locationName);

    let pathname = null;

    if (sportname) {
      const sportLocationPath = pathToRegExp.compile(SSP_SEARCH_SPORT_LOCATION);
      pathname = sportLocationPath(
        {
          [PATH_VARIABLE_SPORT]: sportname,
          [PATH_VARIABLE_LOCATION]: locName
        }
      );
    } else {
      const sportLocationPath = pathToRegExp.compile(SSP_SEARCH_ONLY_LOCATION);
      pathname = sportLocationPath(
        {
          [PATH_VARIABLE_LOCATION]: locName
        }
      );
    }

    if (pathname) {
      history.push({
        pathname,
        search
      });
    }
  }

  clearHeighlighter(text) {
    return text.replace(/<em>|<\/em>/g, '');
  }

  renderSportName(element, index) {
    return (
      <a key={element + index} value={element} name={element}>
        {this.clearHeighlighter(element)}
      </a>
    );
  }

  renderLocationName(element, index) {
    return (
      <a key={element + index} value={element} name={element}>
        {this.clearHeighlighter(element)}
      </a>
    );
  }

  getLocationNameList(locationList) {
    const locationNames = new Set([]);
    if (locationList) {
      if (locationList.data && locationList.data.hits && locationList.data.hits.hits) {
        const data = locationList.data.hits.hits;
        for (let i = 0; i < data.length; i++) {
          const keys = Object.keys(data[i].highlight).filter(key => key !== 'sports.trainingLocations.area.name');
          console.log('Keys', keys);
          const keyDataArray = data[i].highlight[keys[0]];
          if (keyDataArray && keyDataArray.length > 0) {
            locationNames.add(keyDataArray[0]);
          }
        }
      }
    }
    return [...locationNames];
  }

  getSportsNamesList(sportsList) {
    const sportsNames = new Set([]);
    if (sportsList) {
      if (sportsList.data && sportsList.data.hits && sportsList.data.hits.hits) {
        const data = sportsList.data.hits.hits;
        for (let i = 0; i < data.length; i++) {
          if (data[i].highlight && data[i].highlight[searchQueryKeys.sportName]) {
            const sportname = data[i].highlight[searchQueryKeys.sportName][0];
            sportsNames.add(sportname);
          }
        }
      }
    }
    return [...sportsNames];
  }

  handleFocus() {
    return true;
  }

  handleOnSelectLocationSuggestion(event, {suggestion}) {
    const selectedLocation = suggestion.description;
    if (selectedLocation) {
      this.props.changeSelectedLocation(selectedLocation);
    }
  }

  render() {
    const {locationList, sportsList} = this.props;
    const {sportName, locationName} = this.state;
    const locationNames = this.getLocationNameList(locationList);
    const sportsNames = this.getSportsNamesList(sportsList);

    const sportNameInputProps = {
      value: (sportName) ? sportName : '',
      onChange: this.handleSportsChange,
      placeholder: 'Sport or service'
    };

    const locNameInputProps = {
      value: (locationName) ? locationName : '',
      onChange: this.handleLocationChange,
      placeholder: 'Your location'
    };

    return (

      <form className="uk-form">
        <fieldset data-uk-margin="">
          <div id="sport-name" className="cl-field-sport">
            <svg className="cl-icon-search" xmlns="http://www.w3.org/2000/svg" viewBox="-4714 1650 31.708 31.707">
              <g data-name="Group 981" transform="translate(-6112 1631)">
                <g data-name="Ellipse 23" className="cl-icon-search-1" transform="translate(1398 19)">
                  <ellipse className="cl-icon-search-2" cx="11.707" cy="11.707" rx="11.707" ry="11.707"/>
                  <ellipse className="cl-icon-search-3" cx="11.707" cy="11.707" rx="10.707" ry="10.707"/>
                </g>
                <line data-name="Line 5" className="cl-icon-search-1" x2="11.707" y2="11.707" transform="translate(1417.293 38.293)"/>
              </g>
            </svg>

            <Autosuggest
              list={sportsNames}
              renderSuggestion={this.renderSportName}
              inputProps={sportNameInputProps}
              getSuggestionValue={getSportNameSuggestionValue}

            />

          </div>
          <div id="sport-place" className="cl-field-location">
            <svg className="cl-icon-location" xmlns="http://www.w3.org/2000/svg" viewBox="-7265 -1121 16 20.633">
              <path data-name="Path 67" className="cl-icon-location-1" d="M4967.559,1353.175c-.309-.32-7.559-7.9-7.559-12.174a8,8,0,1,1,16,0c0,4.278-7.253,11.854-7.561,12.174l-.441.457ZM4961.223,1341c0,2.937,4.54,8.444,6.775,10.859,2.237-2.415,6.777-7.925,6.777-10.859a6.776,6.776,0,1,0-13.553,0Zm2.726-.177a4.051,4.051,0,1,1,4.051,4.051A4.055,4.055,0,0,1,4963.948,1340.824Zm1.223,0A2.828,2.828,0,1,0,4968,1338,2.832,2.832,0,0,0,4965.171,1340.824Z" transform="translate(-12225 -2454)"/>
            </svg>
            <Autosuggest
              list={locationNames}
              renderSuggestion={this.renderLocationName}
              inputProps={locNameInputProps}
              getSuggestionValue={getLocationSuggestionValue}
              onSuggestionSelected={this.handleOnSelectLocationSuggestion}
            />
          </div>
          <div id="search-button" className="cl-serch-go-button">
            <button type="submit" onClick={this.handleSearch}>GO</button>
          </div>
        </fieldset>
      </form>

    );
  }
}

HeaderSearch.propTypes = {
  sportsList: PropTypes.object.isRequired,
  locationList: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  fetchSportsSuggestion: PropTypes.func.isRequired,
  fetchLocationsSuggestion: PropTypes.func.isRequired,
  changeSelectedLocation: PropTypes.func.isRequired
};

HeaderSearch.defultProps = {

};

const mapStateToProps = state => {
  const {router, sportNameSuggestions, locationNameSuggestion} = state;

  return {
    sportsList: sportNameSuggestions,
    locationList: locationNameSuggestion,
    query: router.query
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSportsSuggestion: searchKey => dispatch(fetchSportsSuggestion(searchKey)),
    fetchLocationsSuggestion: locationKey => dispatch(fetchLocationsSuggestion(locationKey)),
    changeSelectedLocation: selectedLocation => dispatch(changeSelectedLocation(selectedLocation))
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderSearch));
