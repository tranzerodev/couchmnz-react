import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';

import TrainerFilters from '../TrainerFilters';
import PriceFilter from '../PriceFilter';
import DistanceFilter from '../DistanceFilter';
import {geolocated} from 'react-geolocated';
import RenderResult from './renderResult/renderResult';
import RenderNoResult from './renderResult/RenderNoResult';
import AthleteFilters from '../AthleteFilters';
import MapContainer from '../MapContainer';

import appConstants from '../../constants/appConstants';
import {
  fetchLocationReverseLookupData, fetchPopularSports, updateBrowserGPSPluginData, fetchDiscountRates
} from '../../actions';
import {FULFILLED} from '../../constants/ActionTypes';
import MetaTags from '../../utils/headMetaTagHelper'
import Header from '../Header/Header';

import MobAthleteFilters from '../MobAthleteFilters';
import MobTrainerFilter from '../MobTrainerFilters';
import MobPriceFilter from '../MobPriceFilter';
import MobDistanceFilter from '../MobDistanceFilter/MobDistanceFilter';

class SearchSSP extends Component {
  constructor(props) {
    super(props);
    const {defaultMapCenter} = appConstants;
    this.state = {
      mapCenter: defaultMapCenter,
      metaTitle: this.props.p.t('Metadata.defaultTitle')
    };
    this.handleModifyMetaTitle = this.handleModifyMetaTitle.bind(this);
  }

  componentWillMount() {
    const {positionError} = this.props;
    this.props.fetchPopularSports();
    if (positionError !== null) {
      this.props.fetchLocationReverseLookupData();
    }
    if (this.props.discounts && this.props.discounts.status !== FULFILLED) {
      this.props.fetchDiscountRates();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {coords, isGeolocationEnabled, isGeolocationAvailable, nearbylocation, positionError} = nextProps;
    console.log('coords', coords, 'located', isGeolocationEnabled);

    const prevCoords = this.props.coords;
    const prevPositionError = this.props.positionError;

    if ((isGeolocationAvailable === true) && (prevCoords === null) && (coords !== null) && (isGeolocationEnabled === true)) {
      console.log('Enabled gps');
      const {latitude, longitude} = coords;
      this.setState(
        {
          mapCenter: {
            lat: latitude,
            lng: longitude
          }
        });
      this.props.updateBrowserGPSPluginData({latitude, longitude});
    } else if ((isGeolocationEnabled === false) && (prevPositionError === null) && (positionError !== null)) {
      this.props.fetchLocationReverseLookupData();
    }

    // If (this.props.nearbylocation.status !== FULFILLED && nearbylocation.status === FULFILLED) {
    //   const lat = nearbylocation.data.lat;
    //   const lng = nearbylocation.data.long;
    //   if (lat && lng) {
    //     this.setState({mapCenter:
    //       {
    //         lat,
    //         lng
    //       }
    //     });
    //   }
    // }
  }

  handleModifyMetaTitle(changedMetaTitle) {
    this.setState({metaTitle: changedMetaTitle});
  }

  render() {
    const title = "Find and book sports and fitness training"
    const desc = "Find sports instruction with CoachList. book individual & group training, classes & camps. Local or worldwide virtual athlete training & streaming instruction."
    return (
      <div >
        <section className="cl-secondlevel-navbar">
          <div className="cl-search-page-filters">
            <MetaTags 
              title={title}
              desc={desc}
              path={this.props.location.pathname}
            />
            <div className="cl-sr-topnav">
              <nav className="uk-navbar">
                <ul className="uk-navbar-nav">
                  <AthleteFilters/>
                  <TrainerFilters/>
                  <PriceFilter/>
                  <DistanceFilter/>
                </ul>
              </nav>
            </div>

            <div className="cl-sr-mobileoffmenu">

              <nav className="uk-navbar cl-sr-mobilemenu">
                <ul className="uk-nav uk-nav-dropdown" data-uk-nav="{multiple:true}">
                  <li className="uk-parent"><a href="#">{this.props.p.t('FilterResults')}</a>
                    <ul className="uk-nav-sub">
                      <li data-uk-offcanvas="{target:'#cl-sr-athletemenu', mode:'slide'}">{this.props.p.t('AthleteFilters.filterHeader')}</li>
                      <li data-uk-offcanvas="{target:'#cl-sr-trainermenu', mode:'slide'}">{this.props.p.t('TrainerFilters.filterHeader')}</li>
                      <li data-uk-offcanvas="{target:'#cl-sr-pricemenu', mode:'slide'}">{this.props.p.t('PriceFilter.price')}</li>
                      <li data-uk-offcanvas="{target:'#cl-sr-distancemenu', mode:'slide'}">{this.props.p.t('DistanceFilter.distance')}</li>
                    </ul>
                  </li>
                </ul>

              </nav>

            </div>

          </div>
        </section>
        <MobAthleteFilters/>
        <MobTrainerFilter/>
        <MobPriceFilter/>
        <MobDistanceFilter/>
        {this.props.searchData.data && this.props.searchData.data.hits.total === 0 && 
        <RenderNoResult {...this.props} discounts={this.props.discounts}/>}     
        <section className="cl-page-search-scroll-area">
          <RenderResult onModifyMetaTitle={this.handleModifyMetaTitle} mapCenter={this.state.mapCenter}/>
          <div className="cl-page-search-map-col">
            <div className="cl-sr-map">
              <MapContainer {...this.props} searchData={this.props.searchData} mapCenter={this.state.mapCenter}/>
            </div>
          </div>
        </section>
      </div>
    );
  }
  static get propTypes() {
    return {
      coords: PropTypes.object,
      isGeolocationEnabled: PropTypes.bool,
      fetchLocationReverseLookupData: PropTypes.func.isRequired,
      fetchDiscountRates: PropTypes.func.isRequired,
      discounts: PropTypes.object,
      fetchPopularSports: PropTypes.func.isRequired,
      isGeolocationAvailable: PropTypes.bool,
      nearbylocation: PropTypes.object.isRequired,
      positionError: PropTypes.object,
      updateBrowserGPSPluginData: PropTypes.func.isRequired,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      searchData: PropTypes.object.isRequired
    };
  }
}

SearchSSP.defaultProps = {
  coords: {},
  isGeolocationAvailable: false,
  isGeolocationEnabled: false,
  positionError: null,
  discounts: {}
};

const mapStateToProps = state => {
  const {nearbylocation, discounts, searchData} = state;
  return {
    nearbylocation,
    discounts,
    searchData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLocationReverseLookupData: () => dispatch(fetchLocationReverseLookupData()),
    fetchPopularSports: () => dispatch(fetchPopularSports()),
    updateBrowserGPSPluginData: coords => dispatch(updateBrowserGPSPluginData(coords)),
    fetchDiscountRates: () => dispatch(fetchDiscountRates())
  };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchSSP);

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  userDecisionTimeout: 5000
})(translate(Search));
