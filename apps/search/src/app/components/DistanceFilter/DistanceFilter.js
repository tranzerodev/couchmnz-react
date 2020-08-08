import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router-dom';
import QueryString from 'query-string';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import InputRange from 'react-input-range';

import appConstants from '../../constants/appConstants';
import {  
  UK_BUTTON_DROPDOWN, UK_DROPDOWN_CLOSE
} from '../../constants/cssConstants'

const {filterQueries} = appConstants;
class DistanceFilter extends Component {
  constructor(props) {
    super(props);
    const {query} = this.props;

    const distance = query[filterQueries.distanceParam];
    const canTravel = query[filterQueries.canTravelParam];

    this.state = {
      distance: (distance) ? parseInt(distance, 10) : appConstants.indexToDistanceMapping[1],
      canTravel: (canTravel) ? canTravel : false,
      dropdownClasses: UK_BUTTON_DROPDOWN
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleCanTravel = this.handleCanTravel.bind(this);
    this.handleResetFilter = this.handleResetFilter.bind(this);
    this.formatDistanceInputRange = this.formatDistanceInputRange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const {query} = newProps;
    const distance = query[filterQueries.distanceParam];
    const canTravel = query[filterQueries.canTravelParam];
    this.setState({
      distance: (distance) ? parseInt(distance, 10) : 0,
      canTravel: ((canTravel && canTravel.toString()) === 'true')
    });
  }

  handleDistanceChange(value) {
    this.setState({
      dropdownClasses: UK_BUTTON_DROPDOWN + ' uk-open'
    })
    const distanceValue = this.getDistanceValueFromIndex(value);
    this.setState({distance: distanceValue});
  }
  handleSearch() {
    this.setState({
      dropdownClasses: UK_BUTTON_DROPDOWN + UK_DROPDOWN_CLOSE
    })
    const {history, query} = this.props;
    const {location} = history;
    const {pathname} = location;
    const {distance, canTravel} = this.state;
    const {distanceParam, canTravelParam} = filterQueries;
    const updatedFilters = Object.assign({}, query,
      {
        [distanceParam]: (distance) ? distance : undefined,
        [canTravelParam]: (canTravel === true) ? canTravel : undefined,
        page: undefined
      }
    );

    const search = QueryString.stringify(updatedFilters);
    history.push({
      pathname,
      search
    });
  }
  handleResetFilter() {
    this.setState({
      dropdownClasses: UK_BUTTON_DROPDOWN + ' uk-open'
    })
    const {query} = this.props;
    const distance = query[filterQueries.distanceParam];
    const canTravel = query[filterQueries.canTravelParam];
    this.setState({
      distance: (distance) ? distance : 0,
      canTravel: (canTravel) ? canTravel : false
    });
  }

  handleCanTravel(e) {
    this.setState({canTravel: e.target.checked});
  }

  getDistanceValueFromIndex(index) {
    if (index === -1) {
      index = 1;
    }
    return appConstants.indexToDistanceMapping[index];
  }

  formatDistanceInputRange(value) {
    const {p} = this.props;
    const distanceValue = this.getDistanceValueFromIndex(value);
    return p.t('DistanceFilter.distanceLabel', {miles: distanceValue});
  }

  render() {
    const {p} = this.props;
    const {distance, canTravel} = this.state;
    const distanceInputRangeValue = appConstants.indexToDistanceMapping.findIndex(value => value === distance);
    return (
      <li className="cl-sr-navbar-link">
        <div className={this.state.dropdownClasses} data-uk-dropdown="{mode:'click'}" aria-haspopup="true" aria-expanded="false">
          <button className="uk-button">{p.t('DistanceFilter.distance')} <i className="fa fa-angle-down"/></button>
          <div className="uk-dropdown uk-dropdown-width-1 uk-dropdown-bottom cl-sr-nav-distance" aria-hidden="false" tabIndex="" style={{top: 45, left: 0, marginTop: 20}}>
            <div className="uk-grid uk-dropdown-grid sr-subnav-borderbottom">
              <div className="uk-width-1">
                <h5>{p.t('DistanceFilter.showSsp', {miles: this.state.distance})}</h5>
              </div>
              <div className="uk-width-1 cl-range-slider">
                <InputRange
                  formatLabel={this.formatDistanceInputRange}
                  steps={1}
                  maxValue={11}
                  minValue={0}
                  value={(distanceInputRangeValue) ? distanceInputRangeValue : 0}
                  onChange={this.handleDistanceChange}
                />
              </div>
            </div>
            {/*             <div className="uk-dropdown-grid sr-subnav-borderbottom">
              <div className="uk-width-1-1 cl-sr-distance-dropdown">
                <div className="cl-sr-distance-left">
                  <p>{p.t('DistanceFilter.showMeSspWillingToTravel')}</p>
                </div>
                <div className="cl-sr-distance-right">
                  <div className="cl-sd-switchOuter">
                    <label className="cl-sd-switch" htmlFor="checkbox5">
                      <input type="checkbox" value={this.state.canTravel} checked={canTravel} id="checkbox5" onChange={this.handleCanTravel}/>
                      <div className="cl-sd-slider cl-sd-round"/>
                    </label>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="uk-dropdown-grid">
              <div className="uk-width-1-1">
                <a className="sr-dd-searchlink" onClick={this.handleSearch}>{p.t('AthleteFilters.btnSearch')}</a>
                <a className="sr-dd-cancellink" onClick={this.handleResetFilter}>{p.t('AthleteFilters.btnReset')}</a>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
DistanceFilter.propTypes = {
  query: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func}).isRequired,
  history: PropTypes.object.isRequired,
  dropdownClasses: UK_BUTTON_DROPDOWN
};

const mapStateToProps = state => {
  const {router} = state;
  return {
    query: router.query
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default withRouter(translate(connect(mapStateToProps, mapDispatchToProps)(DistanceFilter)));

