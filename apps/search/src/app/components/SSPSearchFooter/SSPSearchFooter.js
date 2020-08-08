import React, {Component} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import pathToRegExp from 'path-to-regexp';
import {SSP_SEARCH_SPORT_LOCATION, PATH_VARIABLE_SPORT, PATH_VARIABLE_LOCATION} from '../../constants/RouterPaths';
import {getTrimmedQueryParam} from '../../utils/sspSearchUtils';
export class SSPSearchFooter extends Component {
  constructor(props) {
    super(props);
    this.renderPopularSport = this.renderPopularSport.bind(this);
    this.handleOnBreadCrumLinkClicked = this.handleOnBreadCrumLinkClicked.bind(this);
  }

  handleOnBreadCrumLinkClicked(event) {
    const {sport, city} = event.target.dataset;
    const {history} = this.props;
    const {location} = history;
    const {search} = location;

    const locationName = getTrimmedQueryParam(city);
    const sportName = getTrimmedQueryParam(sport);

    const sportLocationPath = pathToRegExp.compile(SSP_SEARCH_SPORT_LOCATION);
    const pathname = sportLocationPath(
      {
        [PATH_VARIABLE_SPORT]: sportName,
        [PATH_VARIABLE_LOCATION]: locationName
      }
    );
    history.push({
      pathname,
      search
    });
  }

  renderPopularSport(sport, index) {
    const {selectedLocation, p} = this.props;
    const cityname = selectedLocation.split(',')[0];

    const {name} = sport;
    return (
      <li key={index}><a data-sport={name} data-city={cityname} onClick={this.handleOnBreadCrumLinkClicked}>{p.t('SSPSearchFooter.sportInCity', {sportname: name, cityname})}</a></li>
    );
  }
  render() {
    const {selectedLocation, p, popularSports} = this.props;
    const cityname = selectedLocation.split(',')[0];
    return (
      <div className="cl-sr-bottom-listcontent">
        {popularSports && popularSports.length > 0 && cityname &&
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-3 uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-2 uk-width-xsmall-1">
            <p>{p.t('SSPSearchFooter.mostPopularinCity', {cityname})}</p>
            <ul className="cl-sr-list-li">
              {
                popularSports.map(this.renderPopularSport)
              }
            </ul>
          </div>
          <div className="uk-width-xlarge-1-3 uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-2 uk-width-xsmall-1"/>
          <div className="uk-width-xlarge-1-3 uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-2 uk-width-xsmall-1"/>
        </div>
        }
      </div>
    );
  }
}
SSPSearchFooter.propTypes = {
  selectedLocation: PropTypes.string,
  p: PropTypes.shape({t: PropTypes.func}).isRequired,
  popularSports: PropTypes.array,
  history: PropTypes.object.isRequired

};

SSPSearchFooter.defaultProps = {
  selectedLocation: '',
  popularSports: []
};

const mapStateToProps = state => {
  const {selectedLocation, popularSports} = state;
  return {
    selectedLocation,
    popularSports: popularSports.data
  };
};
export default withRouter(translate(connect(mapStateToProps)(SSPSearchFooter)));
