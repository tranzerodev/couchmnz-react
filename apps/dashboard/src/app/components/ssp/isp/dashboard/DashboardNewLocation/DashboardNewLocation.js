import React, {Component} from 'react'
import {connect} from 'react-redux'
import QueryString from 'query-string'

import MapWithSearch from '../../../../common/MapWithSearch'
import {PropTypes} from 'prop-types'
import translate from 'redux-polyglot/translate'
import config from '../../../../../config'
import moment from 'moment'
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes'
import AutoSuggetion from '../../../../common/AutoSuggetion'

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
  updateLocation,
  reverseGeoCoding,
  getTimezone,
  postTrainingLocations,
  updateTrainingLocations
} from '../../../../../actions'
import {DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS} from '../../../../../constants/pathConstants'
import {withRouter} from 'react-router-dom'
import {validateLocation} from '../../../../../validators/ssp/isp/dashboard/traininglocations'
import appConstants from '../../../../../constants/appConstants'
import {isNonEmptyArray} from '../../../../../validators/common/util'
import ExampleModal from '../ExampleModal/ExampleModal'
import {SAMPLE_LOCATION} from '../../../../../constants/assetsPaths'

function getZipcodeValidation(zip) {
  return (zip.required === false || zip.maxLength === false || zip.valid === false)
}

class DashboardNewLocation extends Component {
  constructor() {
    super()
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSaveLocation = this.handleSaveLocation.bind(this)
    this.handlePositionChanged = this.handlePositionChanged.bind(this)

    this.searchById = this.searchById.bind(this)
    this.handleSelectCountry = this.handleSelectCountry.bind(this)

    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleStateHighlighted = this.handleStateHighlighted.bind(this)
    this.handleStateSelected = this.handleStateSelected.bind(this)
    this.onStateBlur = this.onStateBlur.bind(this)

    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleCityHighlighted = this.handleCityHighlighted.bind(this)
    this.handleCitySelected = this.handleCitySelected.bind(this)
    this.onCityBlur = this.onCityBlur.bind(this)
    this.fetchGeoLocation = this.fetchGeoLocation.bind(this)

    this.setLocation = this.setLocation.bind(this)
    this.validateLocation = this.validateLocation.bind(this)
    this.handleChangeLocationData = this.handleChangeLocationData.bind(this)
    this.renderLocationTypeOptions = this.renderLocationTypeOptions.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleStreetNameBlur = this.handleStreetNameBlur.bind(this)
    this.reverseGeoCoding = this.reverseGeoCoding.bind(this)
    this.getPostalCode = this.getPostalCode.bind(this)
    this.handleSampleModal = this.handleSampleModal.bind(this)
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this)
    this.handleSearchBoxRef = this.handleSearchBoxRef.bind(this)
    this.handleSearchTextRef = this.handleSearchTextRef.bind(this)
    this.handleMapLocation = this.handleMapLocation.bind(this)
    this.setDefaultLocation = this.setDefaultLocation.bind(this)
    this.handleTimezone = this.handleTimezone.bind(this)
    this.handleTimezoneResponse = this.handleTimezoneResponse.bind(this)

    this.handleGeoCodingResponse = this.handleGeoCodingResponse.bind(this)
    this.state = {
      location: {
        type: appConstants.trainingLocationTypes[0],
        zip: '',
        cityID: '',
        cityName: '',
        stateName: '',
        stateID: '',
        notes: '',
        type: "I"
      },
      map: {
        zoom: config.defaultZoom,
        center: config.defaultPosition,
        position: config.defaultPosition
      },
      locationValidation: {
        title: false,
        country: false,
        city: false,
        street: false,
        valid: false,
        cityID: false,
        zip: {
          required: false,
          valid: true,
          maxLength: true
        }
      },
      notFound: false,
      position: config.defaultPosition,
      submitted: false,
      isModalOpen: false
    }
  }
  
  handlePositionChanged(e) {
    console.log('position changed', e)
    this.handleMapLocation(e.latLng)
  }

  handleMapLocation(location) {
    const position = {lat: location.lat(), lng: location.lng()}
    this.setState({
      position,
      location: {
        ...this.state.location,
        location: {
          ...position
        }
      }
    }, () => {console.log('map location', this.state.location)})
    this.reverseGeoCoding(position)
  }

  validateLocation(location) {
    const validation = validateLocation(location)
    this.setState({locationValidation: validation})
  }

  handleChangeLocationData(data) {
    const {location} = this.state
    const newLocation = Object.assign({}, location, data)
    const validation = validateLocation(newLocation)
    
    this.setState({
      location: newLocation,
      locationValidation: validation
    })
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    if (this.props.countries.status !== FULFILLED && this.props.countries.status !== PENDING) {
      this.props.fetchCountries()
    }
    this.setLocation(this.props)
  }

  setDefaultLocation(props) {
    console.log("SET DEFAULT LOCATION", props)
    const {contact} = props
    const location = Object.assign({}, {
      cityID: contact.cityID,
      countryID: contact.countryID,
      countryName: contact.countryName,
      cityName: contact.cityName,
      stateName: contact.stateName,
      stateID: contact.stateID
    })
    if (location.countryID) {
      this.props.fetchStates({countryID: location.countryID})
    }
    if (location.stateID) {
      this.props.fetchCitiesByState({id: location.stateID})
    }
    this.handleChangeLocationData({...location})
  }

  setLocation(props) {
    if (props.edit) {
      const location = props.editLocation
      this.handleChangeLocationData({...location})
      // Const {countryName, stateName, cityName} = location
      // this.fetchGeoLocation(countryName, stateName, cityName)
    } else {
      const {contact} = this.props
      const location = Object.assign({}, {
        countryName: contact.countryName,
        title: contact.businessName,
        street: contact.street,
        cityName: contact.cityName,
        stateName: contact.stateName,
        cityID: contact.cityID,
        stateID: contact.stateID,
        countryID: contact.countryID,
        zip: contact.zip
      })

      if (location.countryID) {
        this.props.fetchStates({countryID: location.countryID})
      }
      if (location.stateID) {
        this.props.fetchCitiesByState({id: location.stateID})
      }
      this.fetchGeoLocation(location.street, location.cityName, location.stateName, location.countryName )
      this.handleChangeLocationData({...location})
    }
  }

  searchById(array, id ) {
    return array.findIndex(a => a.id === id)
  }

  handleChange(e) {
    const {id, value } = e.target
    this.handleChangeLocationData({ [id]: value })
  }

  handleSaveLocation() {
    const {location} = this.state
    this.setState({submitted: true})
    console.log('getstate', this.state)
    // This.props.sspTrainingLocationSubmit({status: true, location})
    console.log('this.state.locationValidation', this.state.locationValidation)
    if (this.state.locationValidation.valid) {

      if (this.props.edit) {
        console.log('location update', location)
        this.props.updateLocation({
          ...location,
          location: location.location ? location.location : config.defaultPosition
        }, appConstants.saveType.sportsSpecific)
        const jsonData = JSON.stringify({
          result: this.state.jsonData 
        })        
        const body = {
          id: this.state.location.id,
          type: this.state.location.type,
          notes: this.state.location.notes,
          title: this.state.location.title,
          jsonData,
          lat: this.state.location.location.lat,
          lng: this.state.location.location.lng
        }
        console.log('body', body)
        this.props.updateTrainingLocations(body)        
      } else {
        this.props.addLocation({
          ...location,
          id: null,
          location: location.location ? location.location : config.defaultPosition
        }, appConstants.saveType.sportsSpecific)
        const jsonData = JSON.stringify({
          result: this.state.jsonData 
        })
        const body = {
          sportId: this.props.currentSport.data.id,
          type: this.state.location.type,
          notes: this.state.location.notes,
          title: this.state.location.title,
          jsonData,
          lat: this.state.location.location.lat,
          lng: this.state.location.location.lng
        }
        this.props.postTrainingLocations(body)
      }
    }
  }
  
  handleSelectCountry(e) {
    let data = {
      countryID: '',
      countryName: ''
    }
    if (e.target.value !== '') {
      const countryID = e.target.value
      data = {
        countryID,
        countryName: this.props.countries.data[this.searchById(this.props.countries.data, e.target.value)].name,
        stateID: '',
        stateName: '',
        cityID: '',
        cityName: ''
      }
      this.fetchGeoLocation(data.countryName, null, null)
      this.props.clearStates()
      this.props.clearCities()
      this.props.fetchStates({countryID})
    }

    this.handleChangeLocationData({
      ...data
    })
  }

  fetchGeoLocation(countryName, stateName, cityName, street) {
    let searchLocation = countryName
    if (stateName) {
      searchLocation += '+' + stateName
    }
    if (cityName) {
      searchLocation += '+' + cityName
    }
    if (street) {
      searchLocation += '+' + street
    }
    //console.log('fetchGeoLocation', searchLocation)
    this.props.fetchGeoLocation(searchLocation)
  }

  getCountry(address) {
    const country = this.findAddressComponent(address, appConstants.google.keyNames.country)
    return country
  }

  getState(address) {
    const state = this.findAddressComponent(address, appConstants.google.keyNames.administrativeAreaLevel1)
    return state
  }

  getCity(address) {
    let city = this.findAddressComponent(address, appConstants.google.keyNames.locality)
    if ( !city ) {
      city = this.findAddressComponent(address, appConstants.google.keyNames.neighborhood)
    }
    return city
  }

  findAddressComponent(address, type) {
    return address.find(e => this.findType(e, type))
  }

  findType(address, type) {
    const {types} = address
    return types.find(e => e === type)
  }

  handleAddressComponentShortName(address) {
    if (address && address.short_name) {
      return address.short_name
    } else if (address && address.long_name) {
      return address.long_name
    }
  }

  handleAddressComponentName(address) {
    if (address && address.long_name) {
      return address.long_name
    }
  }

  handleTimezone(location) {
    const {lat, lng} = location
    const timestamp = Math.round(moment(moment(), 'Z') / 1000)
    getTimezone(lat, lng, timestamp, config.googleApiKey).payload.then(this.handleTimezoneResponse)
  }

  handleTimezoneResponse(response) {
    if (response.data.status === 'OK') {
      const {data} = response
      const location = {...this.state.location, timezone: data}
      const locationValidation = validateLocation(location)
      this.setState({
        location,
        locationValidation
      })
    }
  }

  handleGeoCodingResponse(response) {
    if (response.data.status === 'OK') {
      if (response.data.results &&
            response.data.results.length) {
        const result = response.data.results[0]
        const newGeometryLocation = result.geometry.location
        if (!(this.props.postLocationStatus === REJECTED && this.state.submitted === true)) {
          const {address_components} = result
          console.log('result', result)
          if (isNonEmptyArray(address_components)) {
            console.log('address_components*******************************', address_components)
            const country = this.getCountry(address_components)
            const state = this.getState(address_components)
            const city = this.getCity(address_components)
            let countryID  
            if ( country ) {
              countryID = this.props.countries.data.find( c => c.name == country.long_name)
              countryID = countryID ? countryID.id : null
              if ( countryID ) {
                this.props.fetchStates({countryID: countryID})
              }
            }
            
            const newLocation = {
              street: result.formatted_address ? result.formatted_address.split(',')[0] : '',
              zip: this.getPostalCode(result),
              countryID: countryID,
              countryName: (country) ? this.handleAddressComponentShortName(country) : null,
              stateID: null,
              stateName: (state) ? this.handleAddressComponentName(state) : null,
              cityID: null,
              cityName: (city) ? this.handleAddressComponentName(city) : null
            }

            const locationValidation = validateLocation(newLocation)
            this.setState({
              jsonData: result,              
              location: {
                ...this.state.location,
                ...newLocation,
                location: newGeometryLocation
              },
              notFound: false,
              locationValidation
            })
            this.handleTimezone(newGeometryLocation)
          }
        }
      }
    } else if (response.data.status === 'ZERO_RESULTS') {
      this.setState({
        notFound: true
      })
    }
  }

  reverseGeoCoding(latLng) {
    const query = {
      latlng: latLng.lat + ',' + latLng.lng,
      key: config.googleApiKey
    }
    const geoQuery = '?' + QueryString.stringify(query)
    reverseGeoCoding(geoQuery).payload.then(this.handleGeoCodingResponse)
  }

  getRandomArbitrary(min, max) {
    return Math.random() * ((max - min) + min)
  }

  getRandomLocation() {
    return {
      lat: this.getRandomArbitrary(-90, 90),
      lng: this.getRandomArbitrary(-180, 180)
    }
  }

  getPostalCode(result) {
    if (result.address_components.length) {
      const address = result.address_components.find(address => {
        const type = address.types.find(type =>
          type === appConstants.google.keyNames.postalCode
        )
        if (type) {
          return address
        }
        return undefined
      }
      )
      if (address) {
        return address.short_name
      }
    }
    return this.state.location.zip
  }

  handleStateChange(e, {newValue}) {
    const data = {
      // StateID: null,
      stateName: newValue,
      // CityID: null,
      cityName: ''
    }
    // This.fetchGeoLocation(countryName, data.stateName, null)

    this.handleChangeLocationData({
      ...data
    })
  }

  handleStateSelected(event, {suggestion}) {
    const {id, name} = suggestion
    const {location} = this.state
    const {countryName} = location
    const data = {
      // StateID: id,
      stateName: name,
      // CityID: null,
      cityName: ''
    }
    this.setState({data})
    this.fetchGeoLocation(countryName, data.stateName, null)
    this.props.fetchCitiesByState({id})

    this.handleChangeLocationData({
      ...data
    })
  }

  onStateBlur() {
    const {stateID} = this.state.location
    if (stateID) {
      this.props.fetchCitiesByState({id: stateID})
    }
  }

  handleStateHighlighted({suggestion}) {
    if (suggestion) {
      const {id, name} = suggestion
      const {location} = this.state
      const {countryName} = location
      const data = {
        stateID: id,
        stateName: name,
        cityID: null,
        cityName: ''
      }
      this.setState({data})
      this.fetchGeoLocation(countryName, data.stateName, null)

      this.handleChangeLocationData({
        ...data
      })
    }
  }

  handleCityChange(e, {newValue}) {
    const cityName = (newValue) ? newValue : ''
    this.handleChangeLocationData({
      cityID: null,
      cityName
    })
  }

  handleCitySelected(event, {suggestion}) {
    const {id, name} = suggestion

    this.handleChangeLocationData({
      cityID: id,
      cityName: name
    })
  }

  handleCityHighlighted({suggestion}) {
    if (suggestion) {
      const {id, name} = suggestion

      this.handleChangeLocationData({
        cityID: id,
        cityName: name
      })
    }
  }

  onCityBlur() {
    const {cityID, cityName, street, stateName, countryName} = this.state.location
    this.fetchGeoLocation(countryName, stateName, cityName, street)
  }

  handleCancel() {
    this.props.history.push(DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS)
  }

  handleStreetNameBlur() {
    const {stateName, countryName, cityName, street} = this.state.location
    this.fetchGeoLocation(countryName, stateName, cityName, street)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }
  
  componentWillReceiveProps(nextProps) {
    if ( this.props )
    if ( this.props.states !== nextProps.states && this.state.location ) {
      const state = nextProps.states.data.find( s => s.name.toLowerCase() == this.state.location.stateName.toLowerCase())
      if ( state ) {
        this.props.fetchCitiesByState({id: state.id})
        console.log('set stateID', state)
        this.setState({
          location: {
            ...this.state.location,
            stateID: state.id
          }
        })
      }
    }
    if ( this.props.cities !== nextProps.cities && this.state.location) {
      const city = nextProps.cities.data.find( s => s.name.toLowerCase() == this.state.location.cityName.toLowerCase())
      if ( city ) {
        console.log('set cityID', city)
        this.setState({
          location: {
            ...this.state.location,
            cityID: city.id
          }
        })
      }
    }        
    if (this.props.geoLocation != nextProps.geoLocation && nextProps.geoLocation.status === FULFILLED ) {
      const newLocation = nextProps.geoLocation.data.results[0]
      const location = newLocation.geometry.location
      this.setState({
      jsonData: newLocation,
      city: this.getCity(newLocation.address_components),
      state: this.getState(newLocation.address_components),
      position: {
        lat: location.lat, 
        lng: location.lng
      },
      location: {...this.state.location,         
        location: {
          lat: location.lat, 
          lng: location.lng
        }
      }},()=> console.log('newState', this.state))
    }
    if (this.props.geoLocation.status === PENDING && nextProps.geoLocation.status === FULFILLED) {
      // console.log('geoLocaiton***************', nextProps.geoLocation)
      
      // const {location} = this.state
      // const newLocation = nextProps.geoLocation.data && isNonEmptyArray(nextProps.geoLocation.data.results) ? nextProps.geoLocation.data.results[0].geometry.location : {...location.location}
      // this.setState({location: {...location, location: newLocation}})
      // this.handleTimezone(newLocation)
    }

    if (this.props.postLocationStatus === PENDING && nextProps.postLocationStatus === FULFILLED) {
      this.props.history.replace(DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS)
    }

    if (this.props.postLocationStatus === PENDING && nextProps.postLocationStatus === REJECTED) {
      // this.setDefaultLocation(nextProps)
    }
  }

  renderLocationTypeOptions(locType) {
    const {p} = this.props
    return (
      <option key={locType} value={locType}>{p.t('NewLocation.locationTypes.' + locType)}</option>
    )
  }

  handleSampleModal() {
    const {isModalOpen} = this.state
    this.setState({isModalOpen: !isModalOpen})
  }

  handlePlacesChanged() {
    const places = this.searchBox.getPlaces()
    console.log('places', places)
    this.searchText = ''
    const location = places[0].geometry.location
    
    const country = this.getCountry(places[0].address_components)
    const city = this.getCity(places[0].address_components)
    const state =  this.getState(places[0].address_components)
    let countryID  
    if ( country ) {
      countryID = this.props.countries.data.find( c => c.name == country.long_name)
      countryID = countryID ? countryID.id : null
      if ( countryID ) {
        this.props.fetchStates({countryID: countryID})
      }
    }    
    
    this.setState({
      submitted: false,
      jsonData: places[0],
      city: this.getCity(places[0].address_components),
      state: this.getState(places[0].address_components),
      position: {
        lat: location.lat(), 
        lng: location.lng()
      },
      location: {
        ...this.state.location,
        title: this.state.title ? this.state.title : places[0] && places[0].name ? places[0].name : '',
        street: places[0].formatted_address ? places[0].formatted_address.split(',')[0] : '',
        zip: this.getPostalCode(places[0]),
        cityName: city ? city.long_name : null,
        stateName: state ? state.long_name : null,
        countryName: country ? country.long_name : null,
        countryID: countryID,
        location: {
          lat: location.lat(), 
          lng: location.lng()
        }
      }
    }, () => console.log('state', this.state))
    // this.handleMapLocation(latLng)
  }

  handleSearchBoxRef(ref) {
    this.searchBox = ref
  }

  handleSearchTextRef(ref) {
    this.searchText = ref
  }

  render() {
    const {p} = this.props
    const {title, street, stateName, cityName, type, notes, zip, countryName, location} = this.state.location
    const {offerTerminology} = this.props
    const stateAutoSuggestInputProps = {
      state: 'stateName',
      value: (stateName) ? stateName : '',
      onChange: this.handleStateChange,
      onBlur: this.onStateBlur,
      placeholder: p.t('AccountDetails.statePlaceholder')
    }
    const cityAutoSuggestInputProps = {
      id: 'cityName',
      value: (cityName) ? cityName : '',
      onChange: this.handleCityChange,
      onBlur: this.onCityBlur,
      placeholder: p.t('AccountDetails.cityPlaceholder')
    }
    const {locationValidation, isModalOpen, notFound} = this.state
    const position = location ? {lat: parseFloat(location.lat), lng: parseFloat(location.lng)} : config.defaultPosition
    const zoomLevel = countryName ? stateName ? cityName ? config.zoomLevels.city : config.zoomLevels.state : config.zoomLevels.country : config.defaultZoom
    
    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="trainingLocation">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
              <div className="cl-sd-trainingLocationInner service_location ">
                <div className="uk-grid">
                  <div className="uk-width-xlarge-7-10 uk-width-large-7-10 uk-width-medium-7-10 uk-width-small-1-1">
                    <h1 className="uk-padding-remove">{p.t('NewLocation.add_a_service_location', {offerTerminology: offerTerminology.singular})}</h1>
                  </div>
                  <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-3-10 uk-width-small-1-1">
                    <div className="viewExpOuter">
                      <a onClick={this.handleSampleModal} data-uk-modal>{this.props.p.t('ExampleModal.message')}</a>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                    <p>{p.t('NewLocation.description')}</p>
                  </div>
                </div>

                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 ">
                    <div className="cl-sd-travel-map-1-2">
                      <h6>{p.t('NewLocation.locateOnMap')}</h6>
                      <p className="pb20">{p.t('NewLocation.message')}</p>
                      <div className={notFound ? 'field-holder error' : 'field-holder'}>
                        <span className="error-text">{p.t('NewLocation.validation_messages.notFound')}</span>
                      </div>
                      <div className="map">
                        <MapWithSearch
                          isMarkerShown
                          zoom={zoomLevel}
                          center={position}
                          markers={[position]}
                          googleMapURL={config.googleMapUrl.replace('{key}', config.googleApiKey)}
                          loadingElement={<div style={{height: `100%`}}/>}
                          containerElement={<div style={{height: `400px`}}/>}
                          mapElement={<div style={{height: `100%`}}/>}
                          onDragEnd={this.handlePositionChanged}
                          onPlacesChanged={this.handlePlacesChanged}
                          onSearchRef={this.handleSearchBoxRef}
                          onSearchTextRef={this.handleSearchTextRef}
                          options={{
                            mapTypeControl: false
                          }}
                          draggable
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="uk-grid uk-grid-mobile">
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                    <div className={this.state.locationValidation.title === false && this.state.submitted ? 'field-holder error' : 'field-holder'}>
                      <label>{p.t('NewLocation.locationName')}</label>
                      <input type="text" id="title" name className="uk-form-controls field-required" placeholder={this.props.p.t('NewLocation.locationNameExample')} onChange={this.handleChange} value={title}/>
                      <span className="error-text">{this.props.p.t('NewLocation.validation_messages.title')}</span>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                    <div className="field-holder">
                      <label>{p.t('NewLocation.locationType')}</label>
                      <select id="type" className="uk-form-controls field-required" onChange={this.handleChange} value={type}>
                        {
                          appConstants.trainingLocationTypes.map(this.renderLocationTypeOptions)
                        }
                      </select>
                      <span className="error-text">{p.t('NewLocation.validation_messages.locationType')}</span>
                    </div>
                  </div>
                </div>
                <div className="uk-grid uk-grid-mobile">
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                    <div className={this.state.locationValidation.street === false && this.state.submitted ? 'field-holder error' : 'field-holder'}>
                      <label>{this.props.p.t('NewLocation.address')}</label>
                      <input
                        id="street"
                        type="text"
                        className="uk-form-controls field-required"
                        placeholder={this.props.p.t('NewLocation.addressExample')}
                        onChange={this.handleChange}
                        onBlur={this.onCityBlur}
                        value={street}
                      />
                      <span className="error-text">{this.props.p.t('NewLocation.validation_messages.street')}</span>
                    </div>
                  </div>
                  {
                    !(this.props.postLocationStatus === REJECTED && this.state.submitted === true) &&
                (
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
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
                      {this.state.locationValidation.cityID === false && this.state.submitted && <span className="error-text"  style={{display: 'unset'}}>{p.t('AccountDetails.validation_messages.cityName')}</span>}
                    </div>
                  </div>
                )
                  }
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1 uk-width-mobile">
                    <div className={getZipcodeValidation(locationValidation.zip) && this.state.submitted ? 'field-holder error' : 'field-holder'}>
                      <label>{this.props.p.t('NewLocation.zip')}</label>
                      <input id="zip" type="text" onChange={this.handleChange} value={zip} className="uk-form-controls field-required" placeholder="94501-4026"/>
                      <span className="error-text">
                        {
                          locationValidation.zip.required === false ?
                            p.t('NewLocation.validation_messages.zip.required') :
                            locationValidation.zip.valid === false ?
                              p.t('NewLocation.validation_messages.zip.valid') :
                              p.t('NewLocation.validation_messages.zip.maxLength')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="uk-grid uk-grid-mobile">
                  <div className="uk-width-xlarge-2-3 uk-width-large-2-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                    <div className="field-holder">
                      <label>{p.t('NewLocation.notes')}</label>
                      <textarea id="notes" className="uk-form-controls" placeholder={p.t('NewLocation.notesPlaceholder')} value={notes} onChange={this.handleChange}/>
                      <span className="error-text">{p.t('NewLocation.validation_messages.notes')}</span>
                    </div>
                  </div>
                </div>
                <div className="uk-grid uk-grid-mobile">
                  <div className="uk-width-xlarge-2-3 uk-width-large-2-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                    <div className={this.props.postLocationStatus === REJECTED && this.state.submitted === true ? 'field-holder error' : 'field-holder'}>
                      <span className="error-text">{p.t('NewLocation.validation_messages.notSaved')}</span>
                    </div>
                  </div>
                </div>
                {// This.props.postLocationStatus === REJECTED && this.state.submitted === true &&
                  (
                    <div className="uk-grid" style={{display: this.props.postLocationStatus === REJECTED && this.state.submitted === true ? 'block' : 'none'}}>
                      <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
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
                      <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
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
                      <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
                        <div className={( this.state.locationValidation.cityID === false || this.state.locationValidation.city === false ) && this.state.submitted ? 'field-holder error' : 'field-holder'}>
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
                  )
                }
              </div>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
              <div className="addanotherBtn">
                <a onClick={this.handleSaveLocation} className="general_btn">{p.t('SaveButton.save_continue')}</a>
              </div>
            </div>
          </div>
        </div>
        <ExampleModal title="ExampleModal.sessionLocation" offerTerminology={offerTerminology.singular} isModalOpen={isModalOpen} scroll={appConstants.scroll.locations} image={SAMPLE_LOCATION} onClose={this.handleSampleModal}/>
      </div>
    )
  }
}

DashboardNewLocation.defaultProps = {
  postLocationStatus: null
}

DashboardNewLocation.propTypes = {
  p: PropTypes.shape({t: PropTypes.func}).isRequired,
  countries: PropTypes.object.isRequired,
  fetchCountries: PropTypes.func.isRequired,
  geoLocation: PropTypes.object.isRequired,
  fetchCitiesByState: PropTypes.func.isRequired,
  fetchGeoLocation: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  addLocation: PropTypes.func.isRequired,
  clearStates: PropTypes.func.isRequired,
  fetchStates: PropTypes.func.isRequired,
  cities: PropTypes.object.isRequired,
  states: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  edit: PropTypes.bool,
  clearCities: PropTypes.func.isRequired,
  postLocationStatus: PropTypes.string,
  sportUpdateStatus: PropTypes.string.isRequired,
  contact: PropTypes.object.isRequired,
  offerTerminology: PropTypes.object.isRequired
}

DashboardNewLocation.defaultProps = {
  edit: false
}

const mapStateToProps = state => {
  const {travelPreferences, sspValidation, countries, states, cities, geoLocation, currentSport, contact, locations, sportUpdateStatus} = state
  return {
    travelPreferences,
    sspValidation,
    countries,
    states,
    cities,
    geoLocation,
    locations,
    sportUpdateStatus: currentSport.status,
    postLocationStatus: sportUpdateStatus.status,
    contact,
    currentSport,
    offerTerminology: currentSport.data && currentSport.data.offerTerminology ?
      currentSport.data.offerTerminology : {singular: appConstants.defaultOfferTerminology}
  }
}

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
    updateLocation: (data, updateType) => dispatch(updateLocation(data, updateType)),
    postTrainingLocations: props => dispatch(postTrainingLocations(props)),
    updateTrainingLocations: props => dispatch(updateTrainingLocations(props))
  }
}

export default withRouter(translate(connect(mapStateToProps, mapDispatchToProps)(DashboardNewLocation)))
/* eslint react/no-deprecated: 0 */
/* eslint complexity: 0 */
/* eslint max-depth: 0 */
