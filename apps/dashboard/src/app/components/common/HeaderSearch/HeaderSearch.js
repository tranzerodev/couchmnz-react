import React, {Component} from 'react';
import pathToRegExp from 'path-to-regexp';
import {SSP_SEARCH_SPORT_LOCATION, PATH_VARIABLE_SPORT, PATH_VARIABLE_LOCATION, SSP_SEARCH_ONLY_LOCATION} from '../../../constants/RouterPaths';
import config from '../../../config';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';

const URL_PATH_WORD_SEPERATOR = '-';
export function textToUrlPathString(text) {
  if (text) {
    return (text.trim().toLowerCase().replace(/\s/g, URL_PATH_WORD_SEPERATOR));
  }
}

export function getTrimmedQueryParam(param) {
  if (param && param.trim().length > 0) {
    return textToUrlPathString(param);
  }
  return undefined;
}

class HeaderSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sportName: '',
      locationName: ''
    };
    this.handleOnChangeSportAndLocationName = this.handleOnChangeSportAndLocationName.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    event.preventDefault();
    const sportName = getTrimmedQueryParam(this.state.sportName);

    const locationName = getTrimmedQueryParam(this.state.locationName);

    let pathname = null;

    if (sportName) {
      const sportLocationPath = pathToRegExp.compile(SSP_SEARCH_SPORT_LOCATION);
      pathname = sportLocationPath(
        {
          [PATH_VARIABLE_SPORT]: sportName,
          [PATH_VARIABLE_LOCATION]: locationName
        }
      );
    } else {
      const sportLocationPath = pathToRegExp.compile(SSP_SEARCH_ONLY_LOCATION);
      pathname = sportLocationPath(
        {
          [PATH_VARIABLE_LOCATION]: locationName
        }
      );
    }
    //window.location.href = config.sspSearchBaseUrl + pathname;
    let uri = ''
    if ( sportName && locationName ) {
      uri = `sports=${sportName}&locations=${locationName}`
    } else if ( locationName )  {
      uri = `locations=${this.state.locationName}`
    } else if ( sportName ) {
      uri = `sports=${sportName}`
    }
    
    window.location.href = `${config.ssrUrl}/search?${uri}`
  }

  handleOnChangeSportAndLocationName(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }
  render() {
    const {sportName, locationName} = this.state;
    return (

      <form className="uk-form" >
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
            <input type="text" value={sportName} name="sportName" placeholder={this.props.p.t('DashboardSearchOptions.sport')} onChange={this.handleOnChangeSportAndLocationName}/>
          </div>
          <div id="sport-place" className="cl-field-location">
            <svg className="cl-icon-location" xmlns="http://www.w3.org/2000/svg" viewBox="-7265 -1121 16 20.633">
              <path data-name="Path 67" className="cl-icon-location-1" d="M4967.559,1353.175c-.309-.32-7.559-7.9-7.559-12.174a8,8,0,1,1,16,0c0,4.278-7.253,11.854-7.561,12.174l-.441.457ZM4961.223,1341c0,2.937,4.54,8.444,6.775,10.859,2.237-2.415,6.777-7.925,6.777-10.859a6.776,6.776,0,1,0-13.553,0Zm2.726-.177a4.051,4.051,0,1,1,4.051,4.051A4.055,4.055,0,0,1,4963.948,1340.824Zm1.223,0A2.828,2.828,0,1,0,4968,1338,2.832,2.832,0,0,0,4965.171,1340.824Z" transform="translate(-12225 -2454)"/>
            </svg>

            <input type="text" value={locationName} name="locationName" placeholder={this.props.p.t('DashboardSearchOptions.location')} onChange={this.handleOnChangeSportAndLocationName}/>

          </div>
          <div id="search-button" className="cl-serch-go-button">
            <button type="submit" onClick={this.handleSearch}>GO</button>
          </div>
        </fieldset>
      </form>

    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}
export default translate(HeaderSearch);
