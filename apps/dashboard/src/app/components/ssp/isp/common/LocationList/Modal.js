import React, {Component} from 'react';
import ReactModal from 'react-modal';
import Map from '../../../../common/Map';
import {connect} from 'react-redux';
import config from '../../../../../config';
import {PENDING} from '../../../../../constants/ActionTypes';
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
  updateLocation,
  fetchGeoLocation
} from '../../../../../actions';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(69, 69, 69, 0.75)',
    zIndex: 5
  },
  content: {
    position: 'absolute',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  text: {
    width: '255px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    padding: '10px 9px',
    fontFamily: 'ProximaNovaRegular',
    fontSize: '16px',
    background: '#fff',
    boxSizing: 'border-box',
    '-webkit-appearance': 'none'
  }
};

class ModalClass extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDiscount = this.handleDiscount.bind(this);
    this.handleNumberOfSessions = this.handleNumberOfSessions.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeTag = this.handleChangeTag.bind(this);
    this.handleSaveLocation = this.handleSave.bind(this);
    this.handlePositionChanged = this.handlePositionChanged.bind(this);
    this.handleSelectCountry = this.handleSelectCountry.bind(this);
    this.handleSelectState = this.handleSelectState.bind(this);
    this.handleSelectCity = this.handleSelectCity.bind(this);
    const location = this.props.locations.data[this.handleSearchLocation(this.props.locations.data, this.props.id)];
    const position = {lat: parseFloat(location.location.lat), lng: parseFloat(location.location.lng)};
    const map = (
      <Map
        isMarkerShown
        zoom={config.defaultZoom}
        center={position}
        markers={[position]}
        googleMapURL={config.googleMapUrl.replace('{key}', config.googleApiKey)}
        onDragEnd={this.handlePositionChanged}
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div style={{height: `400px`}}/>}
        mapElement={<div style={{height: `100%`}}/>}
      />
    );
    this.state = {
      location: {},
      map
    };
  }
  handleSave() {
    this.closeModal();
  }
  afterOpenModal() {
    // References are now sync'd and can be accessed. this.subtitle.style.color =
    // '#f00';
  }
  componentWillUnmount() {
    this.setState({
      colorPicker: 'none'
    });
  }
  componentDidMount() {
    const location = this.props.locations.data[this.handleSearchLocation(this.props.locations.data, this.props.id)];
    const {countryID, stateID} = location;
    if (this.props.countries.status !== PENDING) {
      this.props.fetchCountries();
    }
    if (countryID) {
      this.props.fetchStates({countryID});
    }
    if (stateID) {
      this.props.fetchCitiesByState({id: stateID});
    }
  }
  handleName(e) {
    this.setState({
      name: e.target.value
    });
  }
  handleNumberOfSessions(e) {
    const number = parseInt(e.target.value, 10);
    this.setState({
      numberOfSessions: number ? number : 0
    });
  }
  handleDiscount(e) {
    const number = parseInt(e.target.value, 10);
    this.setState({
      discount: number ? number : 0
    });
  }
  handleSaveLocation(e) {
    const {title, tag, address} = this.state;
    const id = e.currentTarget.getAttribute('value');
    const location = {
      id,
      title,
      tag,
      address
    };
    this.props.updateLocation(location);
  }
  handleChangeName(e) {
    this.props.updateLocation({
      id: e.target.name,
      title: e.target.value
    });
  }
  handleChangeAddress(e) {
    this.props.updateLocation({
      id: e.target.name,
      street: e.target.value
    });
  }
  handleChangeTag(e) {
    this.props.updateLocation({
      id: e.target.name,
      tag: e.target.value
    });
  }
  handleSearchLocation(locations, id) {
    return locations.findIndex(location => location.id === id);
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
  handleSelectCountry(e) {
    if (e.target.value !== '') {
      const country = this.props.countries.data[this.handleCountrySearch(this.props.countries.data, e.target.value)];
      this.props.fetchGeoLocation(country.name)
        .then(response => {
          console.log('response', response);
          if (response.action.payload.data.status === 'OK') {
            const position = response.action.payload.data.results &&
              response.action.payload.data.results.length ? response.action.payload.data.results[0].geometry.location : location.location;
            const map = (
              <Map
                isMarkerShown
                zoom={config.zoomLevels.country}
                center={position}
                markers={[position]}
                googleMapURL={config.googleMapUrl.replace('{key}', config.googleApiKey)}
                onDragEnd={this.handlePositionChanged}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `400px`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
              />
            );
            this.props.updateLocation({
              id: this.props.id,
              countryID: country.id,
              countryName: country.name,
              stateID: '',
              stateName: '',
              cityID: '',
              cityName: '',
              location: position
            });
            this.props.clearStates();
            this.props.clearCities();
            this.props.fetchStates({countryID: country.id});
            this.setState({
              map
            });
          }
        });
    }
  }
  handleSelectState(e) {
    if (e.target.value !== '') {
      const location = this.props.locations.data[this.handleSearchLocation(this.props.locations.data, this.props.id)];
      const state = this.props.states.data[this.handleStateSearch(this.props.states.data, e.target.value)];
      this.props.clearCities();
      this.props.fetchCitiesByState({id: state.id});
      this.props.fetchGeoLocation(location.countryName + '+' + state.name)
        .then(response => {
          console.log('response', response);
          if (response.action.payload.data.status === 'OK') {
            const position = response.action.payload.data.results &&
              response.action.payload.data.results.length ? response.action.payload.data.results[0].geometry.location : location.location;
            const map = (
              <Map
                isMarkerShown
                zoom={config.zoomLevels.state}
                center={position}
                markers={[position]}
                googleMapURL={config.googleMapUrl.replace('{key}', config.googleApiKey)}
                onDragEnd={this.handlePositionChanged}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `400px`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
              />
            );
            this.setState({
              map
            });
            this.props.updateLocation({
              id: this.props.id,
              stateID: state.id,
              stateName: state.name,
              cityID: '',
              cityName: '',
              location: position
            });
            this.props.clearCities();
            this.props.fetchCitiesByState({id: state.id});
          }
        });
    }
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
  handleSelectCity(e) {
    if (e.target.value !== '') {
      const location = this.props.locations.data[this.handleSearchLocation(this.props.locations.data, this.props.id)];
      const city = this.props.cities.data[this.handleCitySearch(this.props.cities.data, e.target.value)];
      this.props.fetchGeoLocation(location.countryName + '+' + location.stateName + '+' + city.name)
        .then(response => {
          console.log('response', response);
          if (response.action.payload.data.status === 'OK') {
            const position = response.action.payload.data.results &&
              response.action.payload.data.results.length ? response.action.payload.data.results[0].geometry.location : location.location;
            const map = (
              <Map
                isMarkerShown
                zoom={config.zoomLevels.city}
                center={position}
                markers={[position]}
                googleMapURL={config.googleMapUrl.replace('{key}', config.googleApiKey)}
                onDragEnd={this.handlePositionChanged}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `400px`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
              />
            );
            this.setState({
              map
            });
            this.props.updateLocation({
              id: this.props.id,
              cityID: city.id,
              cityName: city.name,
              location: position
            });
          }
        });
    }
  }
  handlePositionChanged(e) {
    const mapLocation = {lat: e.latLng.lat(), lng: e.latLng.lng()};
    this.props.updateLocation({
      id: this.props.id,
      location: mapLocation
    });
    // This.props.sspTrainingLocationSubmit({status: true, location: this.state.location});
  }
  render() {
    const location = this.props.locations.data[this.handleSearchLocation(this.props.locations.data, this.props.id)];
    const {id, title, tag, street, countryID, stateID, cityID} = location;
    return (
      <ReactModal
        isOpen
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel=""
        ariaHideApp={false}
      >
        <div>
          <section className="stepSection stepSectionNxt">
            <div className="uk-container uk-container-center">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                  <div className="uk-container uk-container-center">
                    <div className="uk-grid">
                      <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                        <div className="newLocation">
                          <h2>{this.props.p.t('LocationListModal.editLocation')}</h2>
                          <div className="uk-grid">
                            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                              <label>{this.props.p.t('LocationListModal.locationName')} <span>({this.props.p.t('LocationListModal.visibleToClients')}</span></label>
                              <input type="text" name={id} className="uk-form-controls" placeholder={this.props.p.t('LocationListModal.locationNameExample')} onChange={this.handleChangeName} value={title}/>

                              <label>{this.props.p.t('LocationListModal.tag')} <span>({this.props.p.t('LocationListModal.forYourReference')})</span></label>
                              <input type="text" name={id} className="uk-form-controls" placeholder={this.props.p.t('LocationListModal.tagExample')} onChange={this.handleChangeTag} value={tag}/>

                              <label>{this.props.p.t('AccountDetails.country')}</label>
                              <select className="uk-form-controls" onChange={this.handleSelectCountry} value={countryID}>
                                <option value="">{this.props.p.t('AccountDetails.select_country')}</option>
                                {
                                  this.props.countries.data.map((country, i) => <option key={i} value={country.id}>{country.name}</option>)
                                }
                              </select>

                              <label>{this.props.p.t('AccountDetails.state')}</label>
                              <select className="uk-form-controls" onChange={this.handleSelectState} value={stateID}>
                                <option value="">{this.props.p.t('AccountDetails.select_state')}</option>
                                {
                                  this.props.states.data.map((state, i) => <option key={i} value={state.id}>{state.name}</option>)
                                }
                              </select>

                              <label>{this.props.p.t('AccountDetails.city')}</label>
                              <select className="uk-form-controls" onChange={this.handleSelectCity} value={cityID}>
                                <option value="">{this.props.p.t('AccountDetails.select_city')}</option>
                                {
                                  this.props.cities.data.map((city, i) => <option key={city.id} value={city.id}>{city.name}</option>)
                                }
                              </select>

                              <label>{this.props.p.t('LocationListModal.address')} <span>({this.props.p.t('LocationListModal.optional')})</span></label>
                              <input type="text" name={id} className="uk-form-controls" placeholder={this.props.p.t('LocationListModal.addressExample')} onChange={this.handleChangeAddress} value={street}/>

                            </div>
                            <div className="uk-width-xlarge-2-3 uk-width-large-2-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                              <h6>{this.props.p.t('LocationListModal.locateOnMap')} <span>({this.props.p.t('LocationListModal.optional')})</span></h6>
                              <p>{this.props.p.t('LocationListModal.locationDropMessage')}</p>
                              <div className="map">
                                {this.state.map}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </ReactModal>
    );
  }
  static get propTypes() {
    return {
      locations: PropTypes.object,
      updateLocation: PropTypes.func,
      p: PropTypes.shape({t: PropTypes.func}).isRequired
    };
  }
}

ModalClass.defaultProps = {
  locations: {data: []},
  updateLocation: () => {}
};

const mapStateToProps = state => {
  const {travelPreferences, locations, sspValidation, countries, states, cities} = state;
  return {
    travelPreferences,
    locations,
    sspValidation,
    countries,
    states,
    cities
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLocation: location => dispatch(updateLocation(location)),
    addLocation: location => dispatch(addLocation(location)),
    updateTravelPreferences: profile => dispatch(updateTravelPreferences(profile)),
    sspTrainingLocationSubmit: data => dispatch(sspTrainingLocationSubmit(data)),
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: country => dispatch(fetchStates(country)),
    clearCities: () => dispatch(clearCities()),
    clearStates: () => dispatch(clearStates()),
    fetchCitiesByState: params => dispatch(fetchCitiesByState(params)),
    fetchCitiesCountry: params => dispatch(fetchCitiesCountry(params)),
    fetchGeoLocation: address => dispatch(fetchGeoLocation(address))
  };
};

const Modal = connect(mapStateToProps, mapDispatchToProps)(ModalClass);
export default translate(Modal);
