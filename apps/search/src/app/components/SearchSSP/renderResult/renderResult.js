import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SportsList from './SportsList';
import MapContainer from '../../MapContainer';
import translate from 'redux-polyglot/translate';
import BreadCrumbs from './BreadCrumbs';
import SSPSearchFooter from '../../SSPSearchFooter';
import {PulseLoader} from 'react-spinners';
import QueryString from 'query-string';
import {convertToArray, convertFilterArray} from '../../../utils/sspSearchUtils';
import appConstants from '../../../constants/appConstants';
import {withRouter} from 'react-router-dom';
const {filterQueries} = appConstants;
const {filterType} = appConstants;
const {genderType} = appConstants;

import {
  addMarker, onMarkerClick
} from '../../../actions';
import {PENDING, FULFILLED} from '../../../constants/ActionTypes';
import index from '../../../config/index';

export class RenderResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      athleteFilters: [],
      trainerFilters: [],
      athleteFilterQuery: [],
      trainerFilterQuery: [],
      updatedArrFilters: {},
      cloudFilterList: []
    };
    this.handleModifyMetaTitle = this.handleModifyMetaTitle.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.generateFilterList = this.generateFilterList.bind(this);
    this.renderFilterCloud = this.renderFilterCloud.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
    this.getGender = this.getGender.bind(this);
    this.renderCloudFilterList = this.renderCloudFilterList.bind(this);
  }
  handleModifyMetaTitle(changedMetaTitle) {
    this.props.onModifyMetaTitle(changedMetaTitle);
  }

  componentWillReceiveProps(newProps) {
    const {query} = newProps;
    const {p} = newProps;
    const filterArr = [];
    if (query[filterQueries.athleteGender]) {
      const gender = this.getGender(query[filterQueries.athleteGender]);
      filterArr.push({[filterQueries.athleteGender]: p.t('FilterCloud.athlete').toUpperCase() + ': ' + p.t(gender)});
    }
    if (query[filterQueries.athleteAgeGroups]) {
      filterArr.push({[filterQueries.athleteAgeGroups]: convertFilterArray(query[filterQueries.athleteAgeGroups], p.t('AthleteFilters.age').toUpperCase())});
    }
    if (query[filterQueries.athleteSkillLevels]) {
      filterArr.push({[filterQueries.athleteSkillLevels]: convertFilterArray(query[filterQueries.athleteSkillLevels], p.t('AthleteFilters.skillLevel').toUpperCase())});
    }

    if (query[filterQueries.trainerGenderParam]) {
      const gender = this.getGender(query[filterQueries.trainerGenderParam]);
      filterArr.push({[filterQueries.trainerGenderParam]: p.t('FilterCloud.trainer').toUpperCase() + ': ' + p.t(gender)});
    }
    if (query[filterQueries.sessionTypesParam]) {
      filterArr.push({[filterQueries.sessionTypesParam]: convertFilterArray(query[filterQueries.sessionTypesParam], p.t('TrainerFilters.trainingSessionType').toUpperCase())});
    }
    if (query[filterQueries.trainerTypesParam]) {
      filterArr.push({[filterQueries.trainerTypesParam]: convertFilterArray(query[filterQueries.trainerTypesParam], p.t('TrainerFilters.typeOfTrainer').toUpperCase())});
    }
    if (query[filterQueries.yearOfTrainingExperienceParam]) {
      filterArr.push({[filterQueries.yearOfTrainingExperienceParam]: convertFilterArray(query[filterQueries.yearOfTrainingExperienceParam], p.t('TrainerFilters.trainingExperience').toUpperCase())});
    }
    if (query[filterQueries.yearOfPlayingExperienceParam]) {
      filterArr.push({[filterQueries.yearOfPlayingExperienceParam]: convertFilterArray(query[filterQueries.yearOfPlayingExperienceParam], p.t('TrainerFilters.playingExperience').toUpperCase())});
    }
    if (query[filterQueries.instantBookParam]) {
      filterArr.push({[filterQueries.instantBookParam]: p.t('FilterCloud.trainer').toUpperCase() + ':' + p.t('FilterCloud.instantBooking')});
    }
    if (query[filterQueries.isCertifiedParam]) {
      filterArr.push({[filterQueries.isCertifiedParam]: p.t('FilterCloud.trainer').toUpperCase() + ':' + p.t('FilterCloud.certified')});
    }
    if (query[filterQueries.canTravelParam]) {
      filterArr.push({[filterQueries.canTravelParam]: p.t('FilterCloud.trainer').toUpperCase() + ':' + p.t('FilterCloud.canTravel')});
    }
    if (query[filterQueries.minPrice]) {
      filterArr.push({[filterQueries.minPrice]: p.t('FilterCloud.minPrice').toUpperCase() + p.t('FilterCloud.priceUnit') + query[filterQueries.minPrice]});
    }
    if (query[filterQueries.maxPrice]) {
      filterArr.push({[filterQueries.maxPrice]: p.t('FilterCloud.maxPrice').toUpperCase() + p.t('FilterCloud.priceUnit') + query[filterQueries.maxPrice]});
    }
    if (query[filterQueries.distanceParam]) {
      filterArr.push({[filterQueries.distanceParam]: query[filterQueries.distanceParam] + p.t('FilterCloud.miles').toUpperCase()});
    }

    this.setState({filterArr});
    this.generateFilterList(filterArr);
  }

  getGender(type) {
    if (type === genderType.male.key) {
      return genderType.male.value;
    }
    return genderType.female.value;
  }
  handleClearAll() {
    const {history} = this.props;
    const {location} = history;
    const {pathname} = location;
    history.push({
      pathname,
      search: null
    });
  }
  handleFilterChange(e) {
    const {history, query} = this.props;
    const {location} = history;
    const {pathname} = location;
    let value = e.currentTarget.getAttribute('value');
    const check = value.includes(':');
    if (check) {
      value = value.split(':')[1];
    }
    const key = e.currentTarget.getAttribute('data-value');
    const newFilter = this.props.query;
    if (newFilter[key]) {
      if (Array.isArray(newFilter[key])) {
        newFilter[key] = newFilter[key].filter(item => (item !== value.trim()));
      } else {
        newFilter[key] = undefined;
      }
    }
    const queryObj = Object.assign({}, query, newFilter);
    const search = QueryString.stringify(queryObj);
    history.push({
      pathname,
      search
    });
  }
  getClassname(type) {
    let color;
    switch (type) {
      case filterType.athlete.key :
        color = filterType.athlete.value;
        break;
      case filterType.trainer.key :
        color = filterType.trainer.value;
        break;
      case filterType.distance.key :
        color = filterType.distance.value;
        break;
      case filterType.can.key :
        color = filterType.can.value;
        break;
      case filterType.training.key :
        color = filterType.training.value;
        break;
      case filterType.min.key :
        color = filterType.min.value;
        break;
      case filterType.max.key :
        color = filterType.max.value;
        break;
      case filterType.session.key :
        color = filterType.session.value;
        break;
      case filterType.year.key :
        color = filterType.year.value;
        break;
      case filterType.is.key :
        color = filterType.is.value;
        break;
      default:
        color = filterType.athlete.value;
        break;
    }
    return color;
  }
  renderFilterCloud(filter, index) {
    const keyName = Object.keys(filter);
    const keyValue = filter[keyName];
    console.log('KeyValue :: ', keyValue);
    console.log('keyName', keyName);
    console.log('filter', filter);

    const filterType = keyValue.split('_')[0];
    const color = this.getClassname(filterType);
    return (
      <li key={index} className={color}>{keyName}<a onClick={this.handleFilterChange} value={keyName} data-value={keyValue} className="rmovefltr"><i className="fa fa-close"/></a></li>
    );
  }

  generateFilterList(arr) {
    const filterArr = [];
    for (let i = 0; i < arr.length; i++) {
      const keyName = Object.keys(arr[i])[0];
      if (Array.isArray(arr[i][keyName])) {
        const subArr = arr[i][keyName];
        for (let j = 0; j < subArr.length; j++) {
          filterArr.push({[subArr[j]]: keyName});
        }
      } else {
        filterArr.push({[arr[i][keyName]]: keyName});
      }
    }
    this.setState({cloudFilterList: filterArr});
  }

  renderCloudFilterList() {
    const {p} = this.props;
    if (this.state.cloudFilterList.length > 0) {
      return (
        <div className="cl-sr-selected-filters">
          <div className="cl-sr-selected-filters-row">
            <div className="cl-sr-selected-filters-left">
              <ul className="selected_filters">
                {
                  this.state.cloudFilterList.map(this.renderFilterCloud)
                }
                <li className="clearall"><a onClick={this.handleClearAll} className="rmovefltr">{p.t('FilterCloud.clear')}</a></li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const {p} = this.props;
    const locationPayload = this.props.locationLookupData.data;
    let fullAddress = this.props.selectedLocation ? this.props.selectedLocation : locationPayload.city + ',' + locationPayload.regionName + ',' + locationPayload.countryName;
    fullAddress = fullAddress && fullAddress.indexOf('undefined') === -1 ? fullAddress : '';
    const discounts = this.props.discounts.data ? this.props.discounts.data : {};

    const displayLoader = (this.props.status && this.props.status === PENDING) ? 'block' : 'none';

    return (
      <div className="cl-page-search-result-col">
        <div className="cl-sr-boxcontainer">
          {
            this.renderCloudFilterList()
          }

          <div className="cl-search-loader" style={{display: displayLoader}}>
            <div className="cl-lds-roller"><div/><div/><div/><div/><div/><div/><div/><div/></div>
          </div>
          {this.props.searchData.data && this.props.searchData.data.hits.total > 0 && 
          <SportsList {...this.props} discounts={discounts}/>}
          <div className="cl-geo-breadcrumb cl-page-bottom">
            <BreadCrumbs onModifyMetaTitle={this.handleModifyMetaTitle} address={fullAddress}/>
          </div>
          <SSPSearchFooter/>

        </div>
      </div>
    );
  }
}
RenderResult.propTypes = {
  selectedLocation: PropTypes.string,
  status: PropTypes.string,
  markerLocations: PropTypes.array,
  searchData: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  discounts: PropTypes.object,
  history: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func}).isRequired,
  locationLookupData: PropTypes.object.isRequired,
  mapCenter: PropTypes.object.isRequired,
  onModifyMetaTitle: PropTypes.func.isRequired
};
RenderResult.defaultProps = {
  selectedLocation: '',
  status: null,
  markerLocations: null,
  discounts: {}
};

const mapStateToProps = state => {
  const {selectedLocation, searchData, locationLookupData, router, discounts} = state;
  return {
    selectedLocation,
    discounts,
    status: searchData.status,
    searchData,
    locationLookupData,
    query: router.query
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMarker: marker => dispatch(addMarker(marker)),
    onMarkerClick: marker => dispatch(onMarkerClick(marker))
  };
};

const RenderResultContainer = connect(mapStateToProps, mapDispatchToProps)(RenderResult);
export default withRouter(translate(RenderResultContainer));
