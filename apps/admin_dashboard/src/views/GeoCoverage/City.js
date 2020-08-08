import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {getAuthHeader, logout} from '../../auth';
import axios from 'axios';
import Select from 'react-select';
import Map from '../../components/Map/Map';
import {DebounceInput} from 'react-debounce-input';
import {ToastContainer, toast} from 'react-toastify';
import {
  Alert,
  Table,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label
} from 'reactstrap';
import config from '../../config';
import Loader from 'react-loader';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

/* eslint react/no-deprecated: 0 */

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {
        zoom: config.defaultZoom,
        center: config.defaultPosition,
        position: config.defaultPosition
      },
      geometry: [
        config.defaultGeo
      ],
      options: [],
      selectedOption: '',
      selectedCountryOption: '',
      selectedStateOption: '',
      stateOptions: [],
      worldRegionArr: [],
      countryArr: [],
      cityArr: [],
      header: getAuthHeader(),
      city_en: '',
      countryId: null,
      regionId: null,
      stateId: null,
      cityId: null,
      defaultPage: config.DEFAULT_PAGE,
      pageCount: config.DEFAULT_PAGE_COUNT,
      itemsPerPage: config.ITEMS_PER_PAGE,
      itemStart: 0,
      currentPage: 0,
      region: '',
      country: '',
      stateName: '',
      isDisabled: '',
      searchText: '',
      loaded: false,
      timezone: '',
      timezoneId: '',
      timezoneLabel: '',
      timezoneList: [],
      selectedTimezoneOption: '',
      timezoneOptions: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getRegionList = this.getRegionList.bind(this);
    this.displayCity = this.displayCity.bind(this);
    this.handleEditCity = this.handleEditCity.bind(this);
    this.generateOptions = this.generateOptions.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCountrySelectChange = this.handleCountrySelectChange.bind(this);
    this.handleStateSelectChange = this.handleStateSelectChange.bind(this);
    this.getCountryList = this.getCountryList.bind(this);
    this.getStateList = this.getStateList.bind(this);
    this.getCityList = this.getCityList.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.fetchGeoLocation = this.fetchGeoLocation.bind(this);
    this.handlePositionChanged = this.handlePositionChanged.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getTimezone = this.getTimezone.bind(this);
    this.getTimezoneId = this.getTimezoneId.bind(this);
    this.genTimezoneOptions = this.genTimezoneOptions.bind(this);
    this.handleTimezoneSelectChange = this.handleTimezoneSelectChange.bind(this);
  }

  componentDidMount() {
    this.getRegionList();
    this.getCityList(this.state.defaultPage);
    this.getTimezone();
    // Remove later
    // this.generateOptions();
    // this.generateCountryOptions();
    // this.generateStateOptions();
  }

  fetchGeoLocation(regionName, countryName, stateName, cityName) {
    let searchLocation = '';
    let zoomLevel = config.zoomLevels.region;
    if (regionName) {
      searchLocation = regionName;
      zoomLevel = config.zoomLevels.region;
    }
    if (countryName) {
      searchLocation += '+' + countryName;
      zoomLevel = config.zoomLevels.country;
    }
    if (stateName) {
      searchLocation += '+' + stateName;
      zoomLevel = config.zoomLevels.state;
    }
    if (cityName) {
      searchLocation += '+' + cityName;
      zoomLevel = config.zoomLevels.city;
    }
    console.log(searchLocation);
    let googleApiURL = config.GOOGLE_MAPS_API.replace('{key}', config.googleApiKey);
    googleApiURL = googleApiURL.replace('{address}', searchLocation);
    const self = this;
    axios.get(googleApiURL)
      .then(response => {
        if (response.data.status === 'OK') {
          console.log('Response :: ', response);
          const position = response.data.results &&
          response.data.results.length ? response.data.results[0].geometry.location : config.defaultPosition;
          self.setState({
            map: {
              zoom: zoomLevel,
              center: position,
              position
            },
            geometry: response.data.results
          }, () => {
            self.getTimezone();
          });
        }
      });
  }
  getTimezone() {
    const timestamp = Math.round(moment(moment(), 'Z') / 1000);
    const {map} = this.state;
    const self = this;
    const location = map.position.lat.toString() + ',' + map.position.lng.toString();
    axios.get(config.GOOGLE_MAPS_API_TIMEZONE.replace('{location}', location).replace('{timestamp}', timestamp).replace('{key}', config.googleApiKey))
      .then(response => {
        if (response.data.status === 'OK') {
          self.getTimezoneId(response.data.rawOffset, response.data.timeZoneId);
          // Self.setState({timezone: response.data.timeZoneId});
        }
      });
  }
  getTimezoneId(rawOffset, timeZoneId) {
    const self = this;
    axios.post(config.TIMEZONE,
      {
        rawOffset,
        timeZoneId
      }, {
        headers: this.state.header
      })
      .then(res => {
        console.log(res);
        if (res.data.responseCode === 0) {
          const payload = res.data.payload;
          if (payload.timezoneList.length === 0) {
            const {timezone} = payload;
            self.setState({timezoneId: timezone.id, timezoneLabel: timezone.label, timezoneList: []});
          } else {
            self.setState({timezoneList: payload.timezoneList, timezoneId: '', timezoneLabel: ''}, () =>
              self.genTimezoneOptions()
            );
          }
        }
      })
      .catch(error => {
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }
  handlePositionChanged(e) {
    const zoomLevel = config.zoomLevels.city;
    const position = {lat: e.latLng.lat(), lng: e.latLng.lng()};
    this.setState({
      map: {
        zoom: zoomLevel,
        center: position,
        position
      }
    }, () => {
      this.getTimezone();
    });
    if (this.state.geometry && this.state.geometry.length) {
      const newLoc = this.state.geometry.slice(); // Copy the array
      newLoc[0].geometry.location = position; // Execute the manipulations
      this.setState({geometry: newLoc});
    }
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.getCityList(this.state.defaultPage);
    }
  }
  handleSearch() {
    this.getCityList(this.state.defaultPage);
  }
  getCityList(pageNum) {
    const self = this;
    self.setState({loaded: false});
    axios.get(config.CITY_URL + '?limit=50&page=' + pageNum + (this.state.selectedOption && this.state.selectedOption.value ? '&worldRegionId=' + this.state.selectedOption.value : '') + (this.state.selectedCountryOption && this.state.selectedCountryOption.value ? '&countryId=' + this.state.selectedCountryOption.value : '') + (this.state.selectedStateOption && this.state.selectedStateOption.value ? '&stateId=' + this.state.selectedStateOption.value : '') + (this.state.searchText ? '&q=' + this.state.searchText.trim() : ''), {
      headers: this.state.header
    })
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({cityArr: response.data.payload.data});
          self.setState({pageCount: response.data.payload.last_page});
          self.setState({itemsPerPage: response.data.payload.per_page});
          self.setState({itemStart: response.data.payload.from});
          self.setState({loaded: true});
        } else {
          self.setState({loaded: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({loaded: true});
        }
      });
  }
  getRegionList() {
    const self = this;
    axios.get(config.WORLD_REGION_URL, {
      headers: this.state.header
    })
      .then(response => {
        if (response.data.payload) {
          self.setState({worldRegionArr: response.data.payload});
          self.generateOptions();
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }

  handleEditCity(e) {
    const {cityArr} = this.state;
    const zoomLevel = config.zoomLevels.city;
    const cityId = e.target.value;
    const cityObj = cityArr.find(item => item._id === cityId);
    console.log('CityObj == ', cityObj);
    this.getCountryList(cityObj.worldregionid);
    this.getStateList(cityObj.countryid);
    this.setState({
      selectedOption: '',
      selectedCountryOption: '',
      timezoneList: [],
      timezoneId: '',
      selectedTimezoneOption: '',
      timezoneOptions: []
    });
    if (cityObj.geometry) {
      if (this.state.geometry && this.state.geometry.length) {
        const newLoc = this.state.geometry.slice(); // Copy the array
        newLoc[0].geometry = cityObj.geometry; // Execute the manipulations
        this.setState({geometry: newLoc});
      }
    }
    this.setState({city_en: cityObj.city_en, cityId: cityObj._id, selectedStateOption: {value: cityObj.stateid, label: cityObj.state_en}, selectedCountryOption: {value: cityObj.countryid, label: cityObj.country_en}, selectedOption: {value: cityObj.worldregionid, label: cityObj.worldregion_en}}, () => {
      this.getCityList(this.state.defaultPage);
    });

    if (cityObj.timezone.id !== '') {
      this.setState({timezoneId: cityObj.timezone.id, timezoneLabel: cityObj.timezone.label, selectedTimezoneOption: {value: cityObj.timezone.id, label: cityObj.timezone.label}});
    } else {
      this.getTimezone();
    }

    console.log('State :: ', cityObj.state_en);
    console.log('city :: ', cityObj.city_en);
    /* Once we get geometry object in response, render that location in map.
      Need to isDisabled this code
    */
    if (cityObj.geometry && cityObj.geometry.location) {
      const position = cityObj.geometry.location;
      this.setState({
        map: {
          zoom: zoomLevel,
          center: position,
          position
        }
      });
    } else {
      this.fetchGeoLocation(null, cityObj.state_en, cityObj.city_en);
    }
  }

  handlePageClick(event) {
    const page = event.selected + 1;
    this.setState({currentPage: page});
    this.getCityList(page);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({isDisabled: 'disable', loaded: false});
    /* eslint no-negated-condition: 0 */

    if (this.state.selectedStateOption) {
      if (this.state.timezoneId !== '') {
        let url;
        const geometry = (this.state.geometry && this.state.geometry.length) ? this.state.geometry[0].geometry : {};
        const {timezoneId} = this.state;
        //  Add code in response of axios call
        if (this.state.cityId) {
          // Edit world_region
          const self = this;
          const payload = {
            city_en: this.state.city_en,
            stateid: this.state.selectedStateOption.value,
            countryid: this.state.selectedCountryOption.value,
            geometry,
            timezoneId
          };
          url = config.CITY_URL + '/' + this.state.cityId;
          axios.put(url, payload, {
            headers: this.state.header
          })
            .then(res => {
              console.log(res);
              if (res.data.responseCode === 0) {
                self.setState({region_en: '', regionId: null, city_en: '', selectedStateOption: '', selectedCountryOption: '', selectedOption: '', cityId: '', loaded: true, timezoneList: []});
                self.getCityList(self.state.currentPage);
                toast.info('City edited!');
              } else {
                toast.warn('ERROR!!!Something went wrong');
              }
              self.setState({isDisabled: '', loaded: true});
            })
            .catch(err => {
              toast.warn('ERROR!!!Something went wrong');
              self.setState({region_en: '', regionId: null, isDisabled: ''});
              console.error('ERROR!!!Something went wrong', err);
              self.setState({isDisabled: '', loaded: true});
            });
        } else {
          url = config.CITY_URL;
          // Const newData = {
          //   _id: 'id_' + this.state.regionId,
          //   region_en: this.state.region_en
          // };
          // const {worldRegionArr} = this.state;
          // const newArray = worldRegionArr.push(newData);
          // this.setState({worldRegionArr, newArray});
          if (this.state.city_en.trim()) {
            const self = this;
            const payload = {
              city_en: this.state.city_en,
              stateid: this.state.selectedStateOption.value,
              countryid: this.state.selectedCountryOption.value,
              geometry,
              timezoneId
            };
            // Post
            axios.post(url, payload, {
              headers: this.state.header
            })
              .then(res => {
                console.log(res);
                if (res.data.responseCode === 0) {
                  self.setState({region_en: '', regionId: null, city_en: '', selectedStateOption: '', selectedCountryOption: '', selectedOption: '', cityId: '', loaded: true, timezoneList: []});
                  self.getCityList(self.state.currentPage);
                  toast.info('City added!');
                } else {
                  toast.warn('ERROR!!!Something went wrong');
                }
                self.setState({isDisabled: '', loaded: true});
              })
              .catch(err => {
                toast.warn('ERROR!!!Something went wrong');
                self.setState({region_en: '', regionId: null, isDisabled: ''});
                console.error('ERROR!!!Something went wrong', err);
                self.setState({isDisabled: '', loaded: true});
              });
          } else {
            ReactDOM.render('Please Enter a state', document.getElementById('validationMessage'));
            document.getElementById('validationMessage').classList.add('alert-danger');
            this.removeMessage();
            this.setState({isDisabled: '', loaded: true});
          }
        }
      } else {
        ReactDOM.render('Please select the timezone', document.getElementById('validationMessage'));
        document.getElementById('validationMessage').classList.add('alert-danger');
        this.removeMessage();
        this.setState({isDisabled: '', loaded: true});
      }
    } else {
      ReactDOM.render('Please select a state', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.add('alert-danger');
      this.removeMessage();
      this.setState({isDisabled: '', loaded: true});
    }
  }

  generateOptions() {
    const option = this.state.worldRegionArr.map((region, key) => {
      return {value: region._id, label: region.worldregion_en, key};
    });

    this.setState({options: option});
  }
  genTimezoneOptions() {
    const option = this.state.timezoneList.map((timezone, key) => {
      return {value: timezone.id, label: timezone.label, key};
    });

    this.setState({timezoneOptions: option});
  }
  generateCountryOptions() {
    const option = this.state.countryArr.map((country, key) => {
      return {value: country._id, label: country.country_en, key};
    });

    this.setState({countryOptions: option});
  }
  generateStateOptions() {
    const option = this.state.stateArr.map((state, key) => {
      return {value: state._id, label: state.state_en, key};
    });

    this.setState({stateOptions: option});
  }
  removeMessage() {
    this.timerVar = setTimeout(() => {
      ReactDOM.render('', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.remove('alert-success', 'alert-danger');
    }, 3000);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  displayCity() {
    const {cityArr} = this.state;
    let start = this.state.itemStart;
    return (
      <tbody>
        {
          cityArr.map(city =>
            (
              <tr key={city._id} >
                <td>{start++}</td>
                <td>{city.country_en}</td>
                <td>{city.state_en}</td>
                <td>{city.city_en}</td>
                <td> <Button color="danger" value={city._id} onClick={this.handleEditCity}>Edit</Button></td>
              </tr>
            )
          )
        }
      </tbody>
    );
  }

  handleSelectChange(selected) {
    console.log('Selected :: ', selected);
    this.setState({
      selectedOption: selected,
      selectedCountryOption: '',
      selectedStateOption: '',
      region: selected.label,
      country: '',
      state: ''
    }, () => {
      this.getCityList(this.state.defaultPage);
    });

    if (selected) {
      this.getCountryList(selected.value);
      const {worldRegionArr} = this.state;
      const regionObj = worldRegionArr.find(item => item._id === selected.value);
      if (regionObj && regionObj.geometry) {
        if (this.state.geometry && this.state.geometry.length) {
          const newLoc = this.state.geometry.slice(); // Copy the array
          newLoc[0].geometry = regionObj.geometry; // Execute the manipulations
          this.setState({geometry: newLoc});
        }
        const position = regionObj.geometry.location;
        this.setState({
          map: {
            zoom: config.zoomLevels.region,
            center: position,
            position
          }
        }, () => {
          this.getTimezone();
        });
      } else {
        this.fetchGeoLocation(selected.label, null, null, null);
      }
    }
  }
  handleCountrySelectChange(selected) {
    this.setState({
      selectedCountryOption: selected,
      selectedStateOption: '',
      country: selected.label,
      state: ''
    }, () => {
      this.getCityList(this.state.defaultPage);
    });
    if (selected) {
    //  This.fetchGeoLocation(this.state.region, selected.label, null, null);
      this.getStateList(selected.value);
      const {countryArr} = this.state;
      const countryObj = countryArr.find(item => item._id === selected.value);
      if (countryObj && countryObj.geometry) {
        if (this.state.geometry && this.state.geometry.length) {
          const newLoc = this.state.geometry.slice(); // Copy the array
          newLoc[0].geometry = countryObj.geometry; // Execute the manipulations
          this.setState({geometry: newLoc});
        }
        const position = countryObj.geometry.location;
        this.setState({
          map: {
            zoom: config.zoomLevels.region,
            center: position,
            position
          }
        }, () => {
          this.getTimezone();
        });
      } else {
        this.fetchGeoLocation(this.state.region, selected.label, null, null);
      }
    }
  }
  handleTimezoneSelectChange(selected) {
    this.setState({
      selectedTimezoneOption: selected,
      timezoneId: selected.value,
      timezoneLabel: selected.label
    });
  }
  handleStateSelectChange(selected) {
    this.setState({
      selectedStateOption: selected,
      state: selected.label
    }, () => {
      this.getCityList(this.state.defaultPage);
    });
    const {stateArr} = this.state;
    const stateObj = stateArr.find(item => item._id === selected.value);
    if (stateObj && stateObj.geometry) {
      console.log('Geometry :: ', stateObj.geometry);
      if (this.state.geometry && this.state.geometry.length) {
        const newLoc = this.state.geometry.slice(); // Copy the array
        newLoc[0].geometry = stateObj.geometry; // Execute the manipulations
        this.setState({geometry: newLoc});
      }
      const position = stateObj.geometry.location;
      this.setState({
        map: {
          zoom: config.zoomLevels.region,
          center: position,
          position
        }
      }, () => {
        this.getTimezone();
      });
    } else {
      this.fetchGeoLocation(this.state.region, this.state.country, selected.label, null);
    }
    /*     This.fetchGeoLocation(this.state.region, this.state.country, selected.label, null); */
  }
  getCountryList(regionId) {
    const self = this;
    axios.get(config.WORLD_REGION_URL + '/' + regionId + '/countries', {
      headers: this.state.header
    })
      .then(response => {
        if (response.data.payload) {
          self.setState({countryArr: response.data.payload});
          self.generateCountryOptions();
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }
  getStateList(countryId) {
    const self = this;
    axios.get(config.COUNTRY_URL + '/' + countryId + '/states', {
      headers: this.state.header
    })
      .then(response => {
        if (response.data.payload) {
          self.setState({stateArr: response.data.payload});
          self.generateStateOptions();
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });
  }
  handleInputChange(event) {
    console.log('Called Function :: ', event);
    const target = event.target;
    const value = target.value;
    this.setState({
      city_en: value
    });
    this.fetchGeoLocation(this.state.region, this.state.country, this.state.stateName, value);
  }
  render() {
    const isAdd = !this.state.cityId;

    return (
      <div className="animated fadeIn">
        {/* eslint react/forbid-component-props:0 */}
        <ToastContainer/>
        <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="8">
            <Card>
              <CardHeader>
                <strong>Cities</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="4"/>
                  <div className="col-lg-8">
                    <div className="input-group">
                      <input type="text" className="form-control" name="searchText" placeholder="Search for..." aria-label="Search for..." onKeyDown={this.handleKeyPress} onChange={this.handleChange}/>
                      <span className="input-group-btn">
                        <button className="btn btn-secondary" type="button" onClick={this.handleSearch}>Go!</button>
                      </span>
                    </div>
                  </div>
                </Row><br/>
                <Alert color="white" id="validationMessage"/>
                <Form>
                  <FormGroup row>
                    <Col md="4">
                      <Select
                        name="_id"
                        placeholder="Select world region"
                        value={this.state.selectedOption}
                        onChange={this.handleSelectChange}
                        options={this.state.options}
                      />
                    </Col>
                    <Col md="4">
                      <Select
                        name="_id"
                        placeholder="Select country"
                        value={this.state.selectedCountryOption}
                        onChange={this.handleCountrySelectChange}
                        options={this.state.countryOptions}
                      />
                    </Col>
                    <Col md="4">
                      <Select
                        name="_id"
                        placeholder="Select state"
                        value={this.state.selectedStateOption}
                        onChange={this.handleStateSelectChange}
                        options={this.state.stateOptions}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="city_en">City Name</Label>
                    </Col>
                    <Col xs="12" md="6">
                      <DebounceInput
                        placeholder="City Name"
                        name="city_en"
                        value={this.state.city_en}
                        minLength={2}
                        className="form-control"
                        debounceTimeout={config.DEBOUNCE_TIMEOUT}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    {this.state.timezoneList.length === 0 ?
                      <Col xs="12" md="3">
                        <Button disabled={this.state.isDisabled === 'disable'} className={this.state.isDisabled} onClick={this.handleSubmit} size="md" color="primary"><i className="fa fa-dot-circle-o"/> {isAdd ? 'Add' : 'Save'}</Button>
                      </Col> : null}
                  </FormGroup>
                  {this.state.timezoneList.length > 0 ?
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="timezoneList">Timezone List</Label>
                      </Col>
                      <Col xs="12" md="6">
                        <Select
                          name="timezoneList"
                          placeholder="Select Timezone"
                          value={this.state.selectedTimezoneOption}
                          onChange={this.handleTimezoneSelectChange}
                          options={this.state.timezoneOptions}
                        />
                      </Col>
                      <Col xs="12" md="3">
                        <Button disabled={this.state.isDisabled === 'disable'} className={this.state.isDisabled} onClick={this.handleSubmit} size="md" color="primary"><i className="fa fa-dot-circle-o"/> {isAdd ? 'Add' : 'Save'}</Button>
                      </Col>
                    </FormGroup> : null}
                </Form>
                <Row>
                  <Col>Latitude/Longitude : {this.state.map.position.lat},{this.state.map.position.lng}</Col>
                  <Col>Timezone : {this.state.timezoneLabel}</Col>
                </Row>
                <Map
                  isMarkerShown
                  zoom={this.state.map.zoom}
                  center={this.state.map.center}
                  markers={[this.state.map.position]}
                  onDragEnd={this.handlePositionChanged}
                  googleMapURL={config.googleMapUrl.replace('{key}', config.googleApiKey)}
                  loadingElement={<div style={{height: `100%`}}/>}
                  containerElement={<div style={{height: `300px`}}/>}
                  mapElement={<div style={{height: `100%`}}/>}
                  draggable
                />
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Country</th>
                      <th>State</th>
                      <th>City</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {
                    this.displayCity()
                  }
                </Table>
                <Row>
                  <Col>
                    {this.state.cityArr.length > 0 ?
                      <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={this.state.itemsPerPage}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                      /> : null}
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Loader loaded={this.state.loaded} className="spinner"/>
          </Col>
        </Row>
      </div>
    );
  }
}
export default City;
