import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router-dom';
import QueryString from 'query-string';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import InputRange from 'react-input-range';

import appConstants from '../../constants/appConstants';

const {filterQueries} = appConstants;
class DistanceFilter extends Component {
  constructor(props) {
    super(props);
    const {query} = this.props;

    const distance = query[filterQueries.distanceParam];
    const canTravel = query[filterQueries.canTravelParam];

    this.state = {
      distance: (distance) ? parseInt(distance, 10) : appConstants.indexToDistanceMapping[1],
      canTravel: (canTravel) ? canTravel : false
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
      canTravel: (canTravel === true) ? canTravel : false
    });
  }

  handleDistanceChange(value) {
    const distanceValue = this.getDistanceValueFromIndex(value);
    this.setState({distance: distanceValue});
  }
  handleSearch() {
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
    const {distance} = this.state;
    const distanceInputRangeValue = appConstants.indexToDistanceMapping.findIndex(value => value === distance);
    return (
      <div id="cl-sr-distancemenu" className="uk-offcanvas">
        <div className="uk-offcanvas-bar">
          <div className="uk-accordion-content">
            <h3>{p.t('DistanceFilter.distance')}</h3>
            <div className="uk-width-1 cl-sr-leftspace">
              <h5>{p.t('DistanceFilter.showSsp', {miles: this.state.distance})}</h5>
            </div>
            <div className="uk-width-1 cl-sr-leftspace">
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

            {/*   <div className="uk-width-1 sr-subnav-borderbottom cl-sr-leftspace">
              <div className="uk-grid">
                <div className="cl-sr-leftcont">
                  <div className="sr-dd-show">
                    <p>{p.t('DistanceFilter.showMeSspWillingToTravel')}</p>
                  </div>
                </div>
                <div className="cl-sr-rightcont">
                  <div className="cl-sd-switchOuter">
                    <label className="cl-sd-switch" htmlFor="travelselectcheckbox" >
                      <input type="checkbox" id="travelselectcheckbox" value={this.state.canTravel} checked={this.state.canTravel} onChange={this.handleCanTravel}/>
                      <div className="cl-sd-slider cl-sd-round"/>
                    </label>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="uk-width-1-1 sr-subnav-borderbottom">
              <a className="sr-dd-searchlink"onClick={this.handleSearch}>{p.t('AthleteFilters.btnSearch')}</a>
            </div>
            <div className="uk-width-1-1">
              <a className="sr-dd-cancellink"onClick={this.handleResetFilter}>{p.t('AthleteFilters.btnReset')}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
DistanceFilter.propTypes = {
  query: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func}).isRequired,
  history: PropTypes.object.isRequired
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

