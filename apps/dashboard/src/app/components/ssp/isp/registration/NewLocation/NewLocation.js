import React, {Component} from 'react';
import {connect} from 'react-redux';

import Map from '../../../../common/Map';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import config from '../../../../../config';
import {FULFILLED, PENDING} from '../../../../../constants/ActionTypes';
import AutoSuggetion from '../../../../common/AutoSuggetion';
import {
  addLocation,
  updateTravelPreferences,
  sspTrainingLocationSubmit,
  fetchCountries,
  fetchStates,
  clearCities,
  clearStates,
  fetchCitiesByState,
  fetchCitiesCountry,
  fetchGeoLocation,
  updateLocation
} from '../../../../../actions';
import validate from '../../../../../validators/ssp/isp/common/trainingLocation';
import appConstants from '../../../../../constants/appConstants';
import {isNonEmptyArray} from '../../../../../validators/common/util';

class NewLocationClass extends Component {
  constructor() {
    super();
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeTag = this.handleChangeTag.bind(this);
    this.handleSaveLocation = this.handleSaveLocation.bind(this);
    this.handlePositionChanged = this.handlePositionChanged.bind(this);
    this.handleSelectCountry = this.handleSelectCountry.bind(this);

    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleStateHighlighted = this.handleStateHighlighted.bind(this);
    this.handleStateSelected = this.handleStateSelected.bind(this);
    this.onStateBlur = this.onStateBlur.bind(this);

    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCityHighlighted = this.handleCityHighlighted.bind(this);
    this.handleCitySelected = this.handleCitySelected.bind(this);
    this.onCityBlur = this.onCityBlur.bind(this);
    this.fetchGeoLocation = this.fetchGeoLocation.bind(this);

    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeNotes = this.handleChangeNotes.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.validateLocation = this.validateLocation.bind(this);
    this.state = {
      location: {
        title: '',
        countryID: '',
        countryName: '',
        street: '',
        notes: null,
        type: appConstants.trainingLocationTypes[0]
      },
      map: '',
      locationValidation: {
        title: false,
        country: false,
        city: false,
        street: false,
        valid: false
      },
      submitted: false
    };
  }

  componentDidUpdate(preProps) {
    if (preProps.sportUpdateStatus === PENDING && this.props.sportUpdateStatus === FULFILLED) {
      this.props.handleEditSave();
    }
  }

  validateLocation() {
    const validation = validate(this.state.location);
    this.setState({locationValidation: validation});
  }

  componentDidMount() {
    if (this.props.countries.status !== FULFILLED && this.props.countries.status !== PENDING) {
      this.props.fetchCountries();
    }
    this.setLocation(this.props);
  }

  setLocation(props) {
    if (props.edit) {
      this.setState({location: props.location}, () => {
        this.validateLocation();
      });
      this.validateLocation();
    }
  }
  handleCountrySearch(countries, id) {
    return countries.findIndex(country => country.id === id);
  }
  handleStateSearch(states, id) {
    return states.findIndex(state => state.id === id);
  }
  handleCitySearch(cities, id) {
    return cities.findIndex(city => city.id === id);
  }
  handlePositionChanged(e) {
    const {location} = this.state;
    const mapLocation = {lat: e.latLng.lat(), lng: e.latLng.lng()};
    this.setState({
      location: {
        ...location,
        location: mapLocation
      }
    });
    this.validateLocation();
  }
  handleChangeName(e) {
    const {location} = this.state;
    this.setState({
      location: {
        ...location,
        title: e.target.value
      }
    }, () => {
      this.validateLocation();
    });
    this.validateLocation();
  }
  handleChangeAddress(e) {
    const {location} = this.state;
    this.setState({
      location: {
        ...location,
        street: e.target.value
      }
    }, () => {
      this.validateLocation();
    });
    this.validateLocation();
  }
  handleChangeTag(e) {
    const {location} = this.state;
    this.setState({
      location: {
        ...location,
        tag: e.target.value
      }
    });
    this.validateLocation();
  }

  handleChangeType(e) {
    const {location} = this.state;
    this.setState({
      location: {
        ...location,
        type: e.target.value
      }
    });
    this.validateLocation();
  }
  handleChangeNotes(e) {
    const {location} = this.state;
    this.setState({
      location: {
        ...location,
        notes: e.target.value
      }
    });
    this.validateLocation();
  }
  clearMarkers() {

  }
  handleSaveLocation() {
    const {location} = this.state;
    this.setState({submitted: true});
    if (this.state.locationValidation.valid) {
      if (this.props.edit) {
        this.props.updateLocation({
          ...location,
          tag: 'TAG',
          location: location.location ? location.location : config.defaultPosition
        }, appConstants.saveType.sportsSpecific);
      } else {
        this.props.addLocation({
          ...location,
          id: null,
          location: location.location ? location.location : config.defaultPosition,
          tag: 'TAG'
        }, appConstants.saveType.sportsSpecific);
      }
      this.setState({
        location: {
          street: '',
          cityID: '',
          cityName: '',
          stateID: '',
          stateName: '',
          countryID: '',
          countryName: '',
          pincode: '',
          tag: '',
          title: ''
        },
        locationValidation: {
          title: false,
          country: false,
          city: false,
          street: false,
          valid: false
        },
        submitted: false
      });
    }
  }
  handleSelectCountry(e) {
    let data = {
      countryID: '',
      countryName: ''
    };
    if (e.target.value !== '') {
      const countryID = e.target.value;
      data = {
        countryID,
        countryName: this.props.countries.data[this.handleCountrySearch(this.props.countries.data, e.target.value)].name,
        stateID: '',
        stateName: '',
        cityID: '',
        cityName: ''
      };
      this.fetchGeoLocation(data.countryName, null, null);
      this.setState({
        location: {
          ...this.state.location,
          ...data
        }
      });
      this.validateLocation();
      this.props.clearStates();
      this.props.clearCities();
      this.props.fetchStates({countryID});
      return;
    }
    this.setState({
      location: {
        ...this.state.location,
        ...data
      }
    });
    this.validateLocation();
  }

  fetchGeoLocation(countryName, stateName, cityName) {
    let searchLocation = countryName;
    if (stateName) {
      searchLocation += '+' + stateName;
    }
    if (cityName) {
      searchLocation += '+' + cityName;
    }
    this.props.fetchGeoLocation(searchLocation);
    this.validateLocation();
  }

  getRandomArbitrary(min, max) {
    return Math.random() * ((max - min) + min);
  }
  getRandomLocation() {
    return {
      lat: this.getRandomArbitrary(-90, 90),
      lng: this.getRandomArbitrary(-180, 180)
    };
  }

  handleStateChange(e, {newValue}) {
    const {location} = this.state;
    const data = {
      stateID: null,
      stateName: newValue,
      cityID: null,
      cityName: ''
    };

    this.setState({
      location: {
        ...location,
        ...data
      }
    });
    this.validateLocation();
  }

  handleStateSelected(event, {suggestion}) {
    const {id, name} = suggestion;
    const {location} = this.state;
    const {countryName} = location;
    const data = {
      stateID: id,
      stateName: name,
      cityID: null,
      cityName: ''
    };
    this.fetchGeoLocation(countryName, data.stateName, null);
    this.props.fetchCitiesByState({id});
    this.setState({
      location: {
        ...this.state.location,
        ...data
      }
    });
    this.validateLocation();
  }

  handleStateHighlighted({suggestion}) {
    if (suggestion) {
      const {id, name} = suggestion;
      const {location} = this.state;
      const {countryName} = location;
      const data = {
        stateID: id,
        stateName: name,
        cityID: null,
        cityName: ''
      };
      this.fetchGeoLocation(countryName, data.stateName, null);

      this.setState({
        location: {
          ...this.state.location,
          ...data
        }
      });
    }
    this.validateLocation();
  }

  onStateBlur() {
    const {stateID} = this.state.location;
    if (stateID) {
      this.props.fetchCitiesByState({id: stateID});
    }
  }

  handleCityChange(e, {newValue}) {
    const cityName = (newValue) ? newValue : '';

    this.setState({
      location: {
        ...this.state.location,
        cityID: null,
        cityName
      }
    });
    this.validateLocation();
  }

  handleCitySelected(event, {suggestion}) {
    const {id, name} = suggestion;
    this.setState({
      location: {
        ...this.state.location,
        cityID: id,
        cityName: name
      }
    });
    this.validateLocation();
  }

  handleCityHighlighted({suggestion}) {
    if (suggestion) {
      const {id, name} = suggestion;
      this.setState({
        location: {
          ...this.state.location,
          cityID: id,
          cityName: name
        }
      });
    }
    this.validateLocation();
  }

  onCityBlur() {
    const {cityID, cityName} = this.state.location;
    if (cityID) {
      const {stateName, countryName} = this.state.location;
      this.fetchGeoLocation(countryName, stateName, cityName);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.geoLocation.status === PENDING && nextProps.geoLocation.status === FULFILLED) {
      const {location} = this.state;
      const newLocation = nextProps.geoLocation.data && isNonEmptyArray(nextProps.geoLocation.data.results) ? nextProps.geoLocation.data.results[0].geometry.location : {...location.location};
      this.setState({location: {...location, location: newLocation}});
    }
    if (this.props.edit && this.state.location.id) {
      return;
    }
    this.setLocation(nextProps);
  }
  render() {
    const {p} = this.props;
    const {title, street, stateName, cityName, type, notes, location, countryID, stateID, cityID} = this.state.location;
    const stateAutoSuggestInputProps = {
      value: (stateName) ? stateName : '',
      onChange: this.handleStateChange,
      onBlur: this.onStateBlur,
      placeholder: p.t('AccountDetails.statePlaceholder')
    };
    const cityAutoSuggestInputProps = {
      value: (cityName) ? cityName : '',
      onChange: this.handleCityChange,
      onBlur: this.onCityBlur,
      placeholder: p.t('AccountDetails.cityPlaceholder')
    };
    const position = location ? {lat: parseFloat(location.lat), lng: parseFloat(location.lng)} : config.defaultPosition;
    const zoomLevel = countryID ? stateID ? cityID ? config.zoomLevels.city : config.zoomLevels.state : config.zoomLevels.country : config.defaultZoom;
    return (
      <div className="newLocation">
        <h3>{p.t('NewLocation.addNewLocation')}</h3>
        <p className="mb30">{p.t('NewLocation.letClientsKnow')}</p>
        <div className="uk-grid ukpb0">
          <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1 ">
            <div className={this.state.locationValidation.country === false && this.state.submitted ? 'field-holder error' : 'field-holder'}>
              <label>{this.props.p.t('AccountDetails.country')}</label>
              <select className="uk-form-controls field-required" onChange={this.handleSelectCountry} value={this.state.location.countryID}>
                <option value="">{this.props.p.t('AccountDetails.select_country')}</option>
                {
                  this.props.countries.data.map((country, i) => <option key={i} value={country.id}>{country.name}</option>)
                }
              </select>
              <span className="error-text">{this.props.p.t('AccountDetails.validation_messages.countryID')}</span>
            </div>
          </div>
          <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1 ">
            <div className="field-holder">
              <label>{p.t('AccountDetails.state')}</label>
              <div className="uk-autocomplete cl-sd-degreeDropdownhead">
                <AutoSuggetion
                  list={this.props.states.data}
                  inputProps={stateAutoSuggestInputProps}
                  onSelectSuggetion={this.handleStateSelected}
                  onSuggestionHighlighted={this.handleStateHighlighted}
                />
              </div>
            </div>
          </div>
          <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1 ">
            <div className={this.state.locationValidation.city === false && this.state.submitted ? 'field-holder error' : 'field-holder'}>
              <label>{p.t('AccountDetails.city')}</label>
              <div className="uk-autocomplete cl-sd-degreeDropdownhead">
                <AutoSuggetion
                  list={this.props.cities.data}
                  inputProps={cityAutoSuggestInputProps}
                  onSelectSuggetion={this.handleCitySelected}
                  onSuggestionHighlighted={this.handleCityHighlighted}
                />
              </div>
              <span className="error-text">{p.t('AccountDetails.validation_messages.cityName')}</span>
            </div>
          </div>
        </div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1 ">
            <div className={this.state.locationValidation.title === false && this.state.submitted ? 'field-holder error' : 'field-holder'}>
              <label>{p.t('NewLocation.locationName')}</label>
              <input type="text" name className="uk-form-controls field-required" placeholder={this.props.p.t('NewLocation.locationNameExample')} onChange={this.handleChangeName} value={title}/>
              <span className="error-text">{this.props.p.t('NewLocation.validation_messages.title')}</span>
            </div>
            <div className="field-holder">
              <label>{p.t('NewLocation.locationType')}</label>
              <select className="uk-form-controls field-required" onChange={this.handleChangeType} value={type}>
                <option value="I">{p.t('NewLocation.locationTypes.I')}</option>
                <option value="O">{p.t('NewLocation.locationTypes.O')}</option>
              </select>
              <span className="error-text">{p.t('NewLocation.validation_messages.locationType')}</span>
            </div>
            <div className={this.state.locationValidation.street === false && this.state.submitted ? 'field-holder error' : 'field-holder'}>
              <label>{this.props.p.t('NewLocation.address')}</label>

              <input type="text" name className="uk-form-controls field-required" placeholder={this.props.p.t('NewLocation.addressExample')} onChange={this.handleChangeAddress} value={street}/>
              <span className="error-text">{this.props.p.t('NewLocation.validation_messages.street')}</span>
            </div>
            <div className="field-holder">
              <label>{p.t('NewLocation.notes')}</label>
              <textarea className="uk-form-controls" rows="4" placeholder={p.t('NewLocation.notesPlaceholder')} value={notes} onChange={this.handleChangeNotes}/>
              <span className="error-text">{p.t('NewLocation.validation_messages.notes')}</span>
            </div>
            <div className="addLocation">
              <a onClick={this.handleSaveLocation}>{p.t('NewLocation.saveTrainingLocation')}</a>
            </div>
          </div>
          <div className="uk-width-xlarge-2-3 uk-width-large-2-3 uk-width-medium-2-3  uk-width-small-1-1 ">
            <h6>{this.props.p.t('NewLocation.locateOnMap')} </h6>
            <p>{this.props.p.t('NewLocation.dropLocationMessage')}</p>
            <div className="map">
              <Map
                isMarkerShown
                zoom={zoomLevel}
                center={position}
                markers={[position]}
                googleMapURL={config.googleMapUrl.replace('{key}', config.googleApiKey)}
                onDragEnd={this.handlePositionChanged}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `400px`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
                draggable
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewLocationClass.defaultProps = {
  countries: [],
  location: {location: config.defaultPosition}
};

NewLocationClass.propTypes = {
  p: PropTypes.shape({t: PropTypes.func}).isRequired,
  countries: PropTypes.object,
  updateLocation: PropTypes.func.isRequired,
  handleEditSave: PropTypes.func.isRequired,
  fetchCountries: PropTypes.func.isRequired,
  addLocation: PropTypes.func.isRequired,
  fetchCitiesByState: PropTypes.func.isRequired,
  fetchGeoLocation: PropTypes.func.isRequired,
  clearStates: PropTypes.func.isRequired,
  fetchStates: PropTypes.func.isRequired,
  cities: PropTypes.object.isRequired,
  geoLocation: PropTypes.object.isRequired,
  states: PropTypes.object.isRequired,
  location: PropTypes.object,
  clearCities: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  sportUpdateStatus: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const {locations, travelPreferences, sspValidation, countries, states, cities, geoLocation, currentSport} = state;
  return {
    travelPreferences,
    locations,
    sspValidation,
    countries,
    states,
    cities,
    geoLocation,
    sportUpdateStatus: currentSport.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLocation: (location, updateType) => dispatch(addLocation(location, updateType)),
    updateTravelPreferences: profile => dispatch(updateTravelPreferences(profile)),
    sspTrainingLocationSubmit: data => dispatch(sspTrainingLocationSubmit(data)),
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: country => dispatch(fetchStates(country)),
    clearCities: () => dispatch(clearCities()),
    clearStates: () => dispatch(clearStates()),
    fetchCitiesByState: params => dispatch(fetchCitiesByState(params)),
    fetchCitiesCountry: params => dispatch(fetchCitiesCountry(params)),
    fetchGeoLocation: address => dispatch(fetchGeoLocation(address)),
    updateLocation: (data, updateType) => dispatch(updateLocation(data, updateType))
  };
};

const NewLocation = connect(mapStateToProps, mapDispatchToProps)(NewLocationClass);
export default translate(NewLocation);
