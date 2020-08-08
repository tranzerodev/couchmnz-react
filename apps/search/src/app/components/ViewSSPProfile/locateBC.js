import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

class LocationBreadCrumbs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySport: 'Golf',
      location: [
        'North America',
        'USA',
        'California',
        'Danville County',
        'Danville'
      ],
      nearbyCounty: 'Oakland',
      nearbyCity: 'San Ramon'
    };
  }
  static get propTypes() {
    return {
      displaySport: PropTypes.string.isRequired,
      displaySportID: PropTypes.string.isRequired,
      continent: PropTypes.string.isRequired,
      continentID: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      countryID: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      stateID: PropTypes.string.isRequired,
      distCounty: PropTypes.string.isRequired,
      distCountyID: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      cityID: PropTypes.string.isRequired,
      nearbySSPCountry: PropTypes.array,
      nearbySSPCity: PropTypes.array
    };
  }
  /* Prevent clicking of a link from calling a page */
  handleNonScriptLink(event) {
    event.preventDefault();
  }
  handleBC(e, eID, isLink, searchParam) {
    if (e === null || e === '') {
      return null;
    }
    const bcArray = [];
    // Const urlTillHash = ((window.location.protocol.indexOf('localhost') >= 0) ? '' : window.location.protocol + '//') + window.location.hostname + ((window.location.port > 0) ? ':' + window.location.port : '');
    let keyC = 0;
    if (isLink) {
      bcArray.push(
        <li key={keyC++}><NavLink key={keyC++} to={'/search?' + searchParam + 'ID=' + eID}>{e}</NavLink>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5417.5 3450 17 32">
            <path id="Path-2" className="cls-1" d="M5,12.5l15.682,15L35,12.5" transform="translate(-5429 3486) rotate(-90)"/>
          </svg>
        </li>);
    } else {
      bcArray.push(<li key={keyC++}>{e}</li>);
    }
    return (bcArray);
  }
  render() {
    return (
      <div className="booking-wrapper">
        <div className="related-links-inside">
          <div className="ft-breadcrumb">
            <ul>
              {this.handleBC(this.props.continent, this.props.continentID, true, 'continent')}
              {this.handleBC(this.props.country, this.props.countryID, true, 'country')}
              {this.handleBC(this.props.state, this.props.stateID, true, 'state')}
              {this.handleBC(this.props.distCounty, this.props.distCountyID, true, 'distCounty')}
              {this.handleBC(this.props.city, this.props.cityID, false, 'continent')}
            </ul>
          </div>
          <div className="ft-links">
            <div className="uk-grid">
              {this.props.nearbySSPCity && this.props.nearbySSPCity.length > 2 &&
              <div className="uk-width-large-1-3 uk-width-medium-3-10 uk-width-1-1 sm-padding-bottom-20">
                <h6>{this.props.displaySport} in nearby cities</h6>
                <ul>
                  <li>
                    <NavLink to={'/search/sport/' + this.props.displaySport + '/' + this.props.nearbySSPCity[0].name}>{this.props.displaySport} in {this.props.nearbySSPCity[0].name}</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/search/sport/' + this.props.displaySport + '/' + this.props.nearbySSPCity[1].name}>{this.props.displaySport} in {this.props.nearbySSPCity[1].name}</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/search/sport/' + this.props.displaySport + '/' + this.props.nearbySSPCity[2].name}>{this.props.displaySport} in {this.props.nearbySSPCity[2].name}</NavLink>
                  </li>
                </ul>
              </div>
              }
              {this.props.nearbySSPCountry && this.props.nearbySSPCountry.length > 2 &&
              <div className="uk-width-large-1-3 uk-width-medium-3-10 uk-width-1-1 sm-padding-bottom-20">
                <h6>{this.props.displaySport} in nearby countries</h6>
                <ul>
                  <li>
                    <NavLink to={'/search/sport/' + this.props.displaySport + '/' + this.props.nearbySSPCountry[0].name}>{this.props.displaySport} in {this.props.nearbySSPCountry[0].name}</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/search/sport/' + this.props.displaySport + '/' + this.props.nearbySSPCountry[1].name}>{this.props.displaySport} in {this.props.nearbySSPCountry[1].name}</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/search/sport/' + this.props.displaySport + '/' + this.props.nearbySSPCountry[2].name}>{this.props.displaySport} in {this.props.nearbySSPCountry[2].name}</NavLink>
                  </li>
                </ul>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LocationBreadCrumbs.defaultProps = {
  nearbySSPCountry: [],
  nearbySSPCity: []
};

export default LocationBreadCrumbs;
