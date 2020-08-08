import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import QueryString from 'query-string';

import appConstants from '../../../../../constants/appConstants';
import config from '../../../../../config';
import {fetchCountries, fetchStates, fetchCitiesByState, saveTrainingLocations, reverseGeoCoding, fetchGeoLocation} from '../../../../../actions/index';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import validate from '../../../../../validators/ssp/isp/dashboard/travelPreference';
import AutoSuggetion from '../../../../common/AutoSuggetion';
import Map from '../../../../common/Map';
import {notNull} from '../../../../../validators/common/util';
import SaveLink from '../DashboardSaveLink';
import {DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS} from '../../../../../constants/pathConstants';

function getZipcodeValidation(zip) {
  return (zip.required === false || zip.maxLength === false || zip.valid === false);
}

class TravelPreference extends Component {
  constructor(props) {
    super(props);

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this.handleStateSelection = this.handleStateSelection.bind(this);
    this.handleStateHighlightChange = this.handleStateHighlightChange.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.onStateBlur = this.onStateBlur.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.handleCitySelection = this.handleCitySelection.bind(this);
    this.handleCityHighlightChange = this.handleCityHighlightChange.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handlePositionChanged = this.handlePositionChanged.bind(this);
    this.handleChangeTravelPreference = this.handleChangeTravelPreference.bind(this);
    this.handleDistanceUnitChange = this.handleDistanceUnitChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.getWillingToTravel = this.getWillingToTravel.bind(this);
    this.renderWillingTravel = this.renderWillingTravel.bind(this);
    this.renderDistance = this.renderDistance.bind(this);
    this.handleToggleMap = this.handleToggleMap.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.fetchGeoLocation = this.fetchGeoLocation.bind(this);
    this.reverseGeoCoding = this.reverseGeoCoding.bind(this);
    this.getPostalCode = this.getPostalCode.bind(this);
    this.onCityBlur = this.onCityBlur.bind(this);
    this.handleStreetNameBlur = this.handleStreetNameBlur.bind(this);
    const {travelPreferences} = this.props;
    const {willingToTravel, distance, unit, cityID, cityName, stateID, stateName,
      countryID,
      countryName,
      zip,
      location,
      travelAddress} = travelPreferences;

    const position = location.lat ? location : config.defaultPosition;
    const zoom = location.lat ? config.zoomLevels.city : config.defaultZoom;
    this.state = {
      data: {
        willingToTravel,
        distance,
        unit,
        cityID,
        cityName,
        stateID,
        stateName,
        countryID,
        countryName,
        zip,
        location,
        travelAddress
      },
      validation: {
        willingToTravel: false,
        distance: true,
        city: true,
        country: true,
        zip: {
          required: true,
          maxLength: true,
          valid: true
        },
        travelAddress: true,
        valid: false
      },
      map: {
        zoom,
        center: position,
        position
      },
      submitted: false,
      showMap: true
    };
  }

  componentDidMount() {
    const {countries} = this.props;
    if (countries.status !== FULFILLED && countries.status !== PENDING && countries.status !== REJECTED) {
      this.props.fetchCountries();
    }
  }

  onDataChange(newData) {
    const data = Object.assign({}, this.state.data, newData);
    const validation = validate(data);
    this.setState({data, validation});
  }

  handleCountryChange(e) {
    const newData = this.state.data;
    newData.countryID = e.target.value;
    const country = this.props.countries.data.find(country => country.id === newData.countryID);
    newData.countryName = country.name;
    newData.stateName = '';
    newData.stateID = '';
    newData.cityID = '';
    newData.cityName = '';
    this.onDataChange(newData);
    this.fetchGeoLocation(country.name, null, null);
    this.props.fetchStates({countryID: e.target.value});
  }

  onStateChange(e, {newValue}) {
    const newData = this.state.data;
    newData.stateName = newValue;
    newData.stateID = '';
    this.onDataChange(newData);
  }

  handleStateSelection(event, {suggestion}) {
    const newData = this.state.data;
    newData.stateName = suggestion.name;
    newData.stateID = suggestion.id;
    newData.cityID = '';
    newData.cityName = '';
    this.onDataChange(newData);
    this.props.fetchCitiesByState({id: suggestion.id});
  }

  handleStateHighlightChange({suggestion}) {
    if (suggestion) {
      const newData = this.state.data;
      newData.stateName = suggestion.name;
      newData.stateID = suggestion.id;
      newData.cityID = '';
      newData.cityName = '';
      this.onDataChange(newData);
    }
  }

  onStateBlur() {
    const {stateID, countryName, stateName} = this.state.data;
    if (stateID) {
      this.props.fetchCitiesByState({id: stateID});
    }
    this.fetchGeoLocation(countryName, stateName, null);
  }

  onCityChange(event, {newValue}) {
    const newData = this.state.data;
    newData.cityID = '';
    newData.cityName = newValue;
    this.onDataChange(newData);
  }

  handleCitySelection(event, {suggestion}) {
    const newData = this.state.data;
    newData.cityName = suggestion.name;
    newData.cityID = suggestion.id;
    this.onDataChange(newData);
  }

  handleCityHighlightChange({suggestion}) {
    if (suggestion) {
      const newData = Object.assign({}, this.state.data);
      newData.cityName = suggestion.name;
      newData.cityID = suggestion.id;
      this.onDataChange(newData);
    }
  }

  handleChangeAddress(e) {
    const travelAddress = e.target.value;
    this.onDataChange({travelAddress});
  }

  handleStreetNameBlur() {
    const {stateName, countryName, cityName, travelAddress} = this.state.data;
    this.fetchGeoLocation(countryName, stateName, cityName, travelAddress);
  }

  onCityBlur() {
    const {cityID, cityName} = this.state.data;
    if (cityID) {
      const {stateName, countryName} = this.state.data;
      this.fetchGeoLocation(countryName, stateName, cityName);
    }
  }

  handlePositionChanged(e) {
    const {data} = this.state;
    const mapLocation = {lat: e.latLng.lat(), lng: e.latLng.lng()};
    this.setState({
      data: {
        ...data,
        location: mapLocation
      }
    });
    this.reverseGeoCoding(mapLocation);
  }

  handleZipChange(e) {
    const zip = e.target.value;
    this.onDataChange({zip});
  }

  handleChangeTravelPreference(e) {
    const willingToTravel = e.target.value;
    this.onDataChange({willingToTravel});
  }

  handleDistanceUnitChange(e) {
    const unit = e.target.value;
    this.onDataChange({unit});
  }

  onSubmitForm() {
    this.setState({submitted: true});
    const {validation} = this.state;
    if (validation.valid) {
      return true;
    }
    return false;
  }

  getWillingToTravel() {
    const {willingToTravel} = this.state.data;
    return !(notNull(willingToTravel) ? appConstants.willingToTravelFlags.yes === willingToTravel : false);
  }

  handleToggleMap() {
    this.setState({showMap: !this.state.showMap});
  }

  handleDistanceChange(e) {
    const distance = e.target.value;
    this.onDataChange({distance});
  }

  fetchGeoLocation(countryName, stateName, cityName, street) {
    let searchLocation = countryName;
    let zoomLevel = config.zoomLevels.country;
    if (stateName) {
      searchLocation += '+' + stateName;
      zoomLevel = config.zoomLevels.state;
    }
    if (cityName) {
      searchLocation += '+' + cityName;
      zoomLevel = config.zoomLevels.city;
    }
    if (street) {
      searchLocation += '+' + street;
      zoomLevel = config.zoomLevels.city;
    }
    console.log(searchLocation);
    fetchGeoLocation(searchLocation).payload
      .then(response => {
        console.log('response', response);
        if (response.data.status === 'OK') {
          const position = response.data.results &&
          response.data.results.length ? response.data.results[0].geometry.location : this.state.location.location;

          const data = Object.assign({}, this.state.data, {location: position});
          const validation = validate(data);
          this.setState({
            data,
            map: {
              zoom: zoomLevel,
              center: position,
              position
            },
            validation
          });
        }
      });
  }

  reverseGeoCoding(latLng) {
    const query = {
      latlng: latLng.lat + ',' + latLng.lng,
      key: config.googleApiKey
    };
    const geoQuery = '?' + QueryString.stringify(query);
    reverseGeoCoding(geoQuery).payload
      .then(response => {
        console.log('response', response);
        if (response.data.status === 'OK') {
          if (response.data.results &&
            response.data.results.length) {
            const travelAddress = response.data.results[0].formatted_address ? response.data.results[0].formatted_address : this.state.location.street;
            const zip = this.getPostalCode(response.data.results[0]);
            const data = Object.assign({}, this.state.data, {travelAddress, zip});
            const validation = validate(data);
            this.setState({
              data,
              validation
            });
          }
        }
      });
  }

  getPostalCode(result) {
    if (result.address_components.length) {
      const address = result.address_components.find(address => {
        const type = address.types.find(type =>
          type === appConstants.google.keyNames.postalCode
        );
        if (type) {
          return address;
        }
        return undefined;
      }
      );
      if (address) {
        return address.short_name;
      }
    }
    return this.state.location.zip;
  }

  renderWillingTravel() {
    const {p} = this.props;
    const {t} = p;
    const {validation, data, submitted} = this.state;
    const {willingToTravel} = data;
    return (
      <div className={validation.willingToTravel === false && submitted ? 'field-holder error' : 'field-holder'}>
        <select
          className="uk-form-controls field-required"
          onChange={this.handleChangeTravelPreference}
          value={willingToTravel}
        >
          <option value="">{t('TravelPreferences.select')}</option>
          <option value={appConstants.willingToTravelFlags.yes}>{this.props.p.t('TravelPreference.yes')}</option>
          <option value={appConstants.willingToTravelFlags.no}>{this.props.p.t('TravelPreference.no')}</option>
        </select>
        <span className="error-text">{t('TravelPreference.validation_messages.willingToTravel')}</span>
      </div>
    );
  }

  renderDistance() {
    const {p} = this.props;
    const {t} = p;
    const {validation, data, submitted} = this.state;
    const {unit, distance} = data;
    const disabledFileds = this.getWillingToTravel();
    return (
      <div className={validation.distance === false && submitted ? 'field-holder error' : 'field-holder'}>
        <input type="number" name="" min={0} value={distance} onChange={this.handleDistanceChange} placeholder={t('TravelPreference.distance_placeholder')} disabled={disabledFileds} className="field-required"/>
        <select className="uk-form-controls" onChange={this.handleDistanceUnitChange} value={unit} disabled={disabledFileds}>
          <option value={appConstants.distanceUnit.miles}>{t('DistanceUnit.' + appConstants.distanceUnit.miles)}</option>
          <option value={appConstants.distanceUnit.km}>{t('DistanceUnit.' + appConstants.distanceUnit.km)}</option>
        </select>
        <span className="error-text">{t('TravelPreference.validation_messages.distance')}</span>
      </div>
    );
  }

  render() {
    const {p, countries, states, cities, sportActivationStatus} = this.props;
    const {t} = p;
    const {validation, data, submitted, showMap} = this.state;
    const {stateName, cityName, travelAddress, zip} = data;
    const disabledFileds = this.getWillingToTravel();
    const buttonName = sportActivationStatus ? p.t('SaveButton.save') : p.t('DashboardSaveLink.save_and_continue');
    const saveType = appConstants.saveType.sportsSpecific;

    const stateInputProps = {
      value: stateName,
      placeholder: this.props.p.t('TravelPreference.select_state'),
      onChange: this.onStateChange,
      onBlur: this.onStateBlur,
      disabled: disabledFileds
    };
    const cityInputProps = {
      value: cityName,
      onChange: this.onCityChange,
      placeholder: this.props.p.t('TravelPreference.select_city'),
      disabled: disabledFileds,
      onBlur: this.onCityBlur
    };

    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="trainingLocation">
          <div className="cl-sd-trainingLocationInner service_location cl-sd-travel-preferance-1-2">
            <h1 className="uk-padding-remove">{t('TravelPreference.travel_preference')}</h1>
            <p className="pb20">{t('TravelPreference.willing_to_travel')}</p>
            <div className="uk-grid">
              <div className="uk-width-xlarge-5-10 uk-width-large-5-10 uk-width-medium-1-2  uk-width-small-1-1 ">
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-4   uk-width-small-1-1 ">
                    {this.renderWillingTravel()}
                  </div>
                  <div className="uk-width-xlarge-3-4 uk-width-large-3-4 uk-width-medium-3-4  uk-width-small-1-1 ">
                    <div className="inputmerge mergeinpheight">
                      {this.renderDistance()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                <p className="pb20">{t('TravelPreference.from_which_location')}</p>
              </div>
              <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                <div className={validation.country === false && submitted ? 'field-holder error' : 'field-holder'}>
                  <label>{t('TravelPreference.country')}</label>
                  <select onChange={this.handleCountryChange} selected={this.state.data.countryID} className="field-required" disabled={disabledFileds}>
                    <option value="">{this.props.p.t('TravelPreference.select_country')}</option>
                    {
                      countries.data.map(country => {
                        return <option key={country.id} value={country.id} data-name={country.name}>{country.name}</option>;
                      })
                    }
                  </select>
                  <span className="error-text">{t('TravelPreference.validation_messages.country')}</span>
                </div>
              </div>
              <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                <div className="field-holder">
                  <label>{t('TravelPreference.state')}</label>
                  <div className="uk-autocomplete">
                    <AutoSuggetion
                      inputProps={stateInputProps}
                      list={states.data}
                      onSelectSuggetion={this.handleStateSelection}
                      onSuggestionHighlighted={this.handleStateHighlightChange}
                    />
                  </div>
                </div>
              </div>
              <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                <div className={validation.city === false && submitted ? 'field-holder error' : 'field-holder'}>
                  <label>{t('TravelPreference.city')}</label>
                  <div className="uk-autocomplete cl-sd-cityDropdownhead" data-uk-autocomplete="{source:'../../resources/assets/jsons/city.json'}">
                    <AutoSuggetion
                      inputProps={cityInputProps}
                      list={cities.data}
                      onSelectSuggetion={this.handleCitySelection}
                      onSuggestionHighlighted={this.handleCityHighlightChange}
                    />
                  </div>
                  <span className="error-text">{t('TravelPreference.validation_messages.city')}</span>
                </div>
              </div>
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                <div className={validation.travelAddress === false && submitted ? 'field-holder error' : 'field-holder'}>
                  <label>{t('TravelPreference.address')}</label>
                  <input
                    type="text"
                    onBlur={this.handleStreetNameBlur}
                    className="uk-form-controls field-required"
                    placeholder={this.props.p.t('TravelPreference.addressExample')}
                    onChange={this.handleChangeAddress}
                    value={travelAddress}
                    disabled={disabledFileds}
                  />
                  <span className="error-text">{t('TravelPreference.validation_messages.street')}</span>
                </div>
              </div>
              <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                <div className={getZipcodeValidation(validation.zip) && submitted ? 'field-holder error' : 'field-holder'}>
                  <label>{t('TravelPreference.zip')}</label>
                  <input
                    type="text"
                    onChange={this.handleZipChange}
                    value={zip}
                    className="uk-form-controls field-required"
                    placeholder={t('TravelPreference.zip_placeholder')}
                    disabled={disabledFileds}
                  />
                  <span className="error-text">
                    {
                      validation.zip.required === false ?
                        p.t('TravelPreference.validation_messages.zip.required') :
                        validation.zip.valid === false ?
                          p.t('TravelPreference.validation_messages.zip.valid') :
                          p.t('TravelPreference.validation_messages.zip.maxLength')
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="cl-sd-travel-map-1-2">
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 ">
                <a onClick={this.handleToggleMap} className="cl-sd-hide-map">{showMap ? t('TravelPreference.hide_map') : t('TravelPreference.show_map')}</a>
                <div className="map">
                  {showMap &&
                  <Map
                    isMarkerShown
                    zoom={this.state.map.zoom}
                    center={this.state.map.center}
                    markers={[this.state.map.position]}
                    googleMapURL={config.googleMapUrl.replace('{key}', config.googleApiKey)}
                    loadingElement={<div style={{height: `100%`}}/>}
                    containerElement={<div style={{height: `400px`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                    onDragEnd={this.handlePositionChanged}
                    draggable
                  />
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
              <div className="addanotherBtn">
                <SaveLink
                  valid
                  saveType={saveType}
                  saveData={this.props.saveTrainingLocations}
                  data={this.state.data}
                  submitForm={this.onSubmitForm}
                  buttonName={buttonName}
                  isNewSports={sportActivationStatus}
                  next={DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      countries: PropTypes.object.isRequired,
      fetchCountries: PropTypes.func.isRequired,
      states: PropTypes.object.isRequired,
      fetchStates: PropTypes.func.isRequired,
      cities: PropTypes.object.isRequired,
      fetchCitiesByState: PropTypes.func.isRequired,
      saveTrainingLocations: PropTypes.func.isRequired,
      sportActivationStatus: PropTypes.bool.isRequired,
      travelPreferences: PropTypes.object.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: params => dispatch(fetchStates(params)),
    fetchCitiesByState: params => dispatch(fetchCitiesByState(params)),
    saveTrainingLocations: (data, updateType) => dispatch(saveTrainingLocations(data, updateType))
  };
};

const mapStateToProps = state => {
  const {countries, states, cities, currentSport, travelPreferences} = state;
  return {
    countries,
    states,
    cities,
    sportActivationStatus: (currentSport.data.isActive === appConstants.sportsActiveFlages.active),
    travelPreferences
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(TravelPreference)));
