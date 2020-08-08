import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {getAuthHeader, logout} from '../../auth';
import axios from 'axios';
import Map from '../../components/Map/Map';
import {DebounceInput} from 'react-debounce-input';
import Select from 'react-select';
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
import ReactPaginate from 'react-paginate';
import config from '../../config';
import Loader from 'react-loader';

class State extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selectedOption: '',
      selectedCountryOption: '',
      worldRegionArr: [],
      countryArr: [],
      stateArr: [],
      disabled: '',
      header: getAuthHeader(),
      state_en: '',
      countryId: null,
      regionId: null,
      defaultPage: config.DEFAULT_PAGE,
      pageCount: config.DEFAULT_PAGE_COUNT,
      itemsPerPage: config.ITEMS_PER_PAGE,
      itemStart: 0,
      currentPage: 0,
      map: {
        zoom: config.defaultZoom,
        center: config.defaultPosition,
        position: config.defaultPosition
      },
      region: '',
      country: '',
      stateName: '',
      geometry: [config.defaultGeo],
      searchText: '',
      loaded: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getRegionList = this.getRegionList.bind(this);
    this.getStateList = this.getStateList.bind(this);
    this.displayState = this.displayState.bind(this);
    this.handleEditState = this.handleEditState.bind(this);
    this.generateOptions = this.generateOptions.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCountrySelectChange = this.handleCountrySelectChange.bind(this);
    this.getCountryList = this.getCountryList.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.fetchGeoLocation = this.fetchGeoLocation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePositionChanged = this.handlePositionChanged.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.getRegionList();
    this.getStateList(this.state.defaultPage);
    // Remove later
    // this.generateOptions();
    // this.generateCountryOptions();
  }
  fetchGeoLocation(regionName, countryName, stateName) {
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
    console.log(searchLocation);
    let googleApiURL = config.GOOGLE_MAPS_API.replace('{key}', config.googleApiKey);
    googleApiURL = googleApiURL.replace('{address}', searchLocation);
    axios.get(googleApiURL)
      .then(response => {
        if (response.data.status === 'OK') {
          console.log('Response :: ', response);
          const position = response.data.results &&
          response.data.results.length ? response.data.results[0].geometry.location : config.defaultPosition;
          this.setState({
            map: {
              zoom: zoomLevel,
              center: position,
              position
            },
            geometry: response.data.results
          });
        }
      });
  }
  handlePositionChanged(e) {
    const zoomLevel = config.zoomLevels.state;
    const position = {lat: e.latLng.lat(), lng: e.latLng.lng()};
    this.setState({
      map: {
        zoom: zoomLevel,
        center: position,
        position
      }
    });
    if (this.state.geometry && this.state.geometry.length) {
      const newLoc = this.state.geometry.slice(); // Copy the array
      newLoc[0].geometry.location = position; // Execute the manipulations
      this.setState({geometry: newLoc});
    }
  }
  handleInputChange(event) {
    console.log('Called Function :: ', event);
    const target = event.target;
    const value = target.value;
    this.setState({
      state_en: value
    });
    this.fetchGeoLocation(this.state.region, value, null);
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
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.getStateList(this.state.defaultPage);
    }
  }
  handleSearch() {
    this.getStateList(this.state.defaultPage);
  }
  getStateList(pageNum) {
    const self = this;
    self.setState({loaded: false});
    axios.get(config.STATE_URL + '?limit=50&page=' + pageNum + (this.state.selectedOption && this.state.selectedOption.value ? '&worldRegionId=' + this.state.selectedOption.value : '') + (this.state.selectedCountryOption && this.state.selectedCountryOption.value ? '&countryId=' + this.state.selectedCountryOption.value : '') + (this.state.searchText ? '&q=' + this.state.searchText.trim() : ''), {
      headers: this.state.header
    })
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({stateArr: response.data.payload.data});
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

  handlePageClick(event) {
    this.getStateList(event.selected + 1);
  }
  handleEditState(e) {
    const {stateArr} = this.state;
    const stateId = e.target.value;
    const zoomLevel = config.zoomLevels.state;
    const stateObj = stateArr.find(item => item._id === stateId);
    if (stateObj && stateObj.stateObj && stateObj.stateObj.geometry) {
      if (this.state.geometry && this.state.geometry.length) {
        const newLoc = this.state.geometry.slice(); // Copy the array
        newLoc[0].geometry = stateObj.geometry; // Execute the manipulations
        this.setState({geometry: newLoc});
      }
    }
    this.getCountryList(stateObj.worldregionid);
    this.setState({state_en: stateObj.state_en, stateId: stateObj._id, selectedCountryOption: {value: stateObj.countryid, label: stateObj.country_en}, selectedOption: {value: stateObj.worldregionid, label: stateObj.worldregion_en}}, () => {
      this.getStateList(this.state.defaultPage);
    });
    /* Once we get geometry object in response, render that location in map.
      Need to test this code
    */
    if (stateObj.geometry && stateObj.geometry.location) {
      const position = stateObj.geometry.location;
      this.setState({
        map: {
          zoom: zoomLevel,
          center: position,
          position
        }
      });
    } else {
      this.fetchGeoLocation(null, stateObj.country_en, stateObj.state_en);
    }
  }

  handleSubmit(event) {
    this.setState({disabled: 'disable', loaded: false});
    event.preventDefault();
    if (this.state.selectedCountryOption) {
      let url;
      const geometry = (this.state.geometry && this.state.geometry.length) ? this.state.geometry[0].geometry : {};
      //  Add code in response of axios call
      if (this.state.stateId) {
        // Edit world_region
        const payload = {
          state_en: this.state.state_en,
          countryid: this.state.selectedCountryOption.value,
          geometry
        };
        const self = this;
        url = config.STATE_URL + '/' + this.state.stateId;
        axios.put(url, payload, {
          headers: this.state.header
        })
          .then(res => {
            console.log(res);
            if (res.data.responseCode === 0) {
              self.setState({state_en: '', stateId: null, selectedCountryOption: '', selectedOption: '', stateId: ''});
              self.getStateList(self.state.currentPage);
              toast.info('State edited!');
            } else {
              toast.warn('ERROR!!!Something went wrong');
            }
            self.setState({disabled: '', loaded: true});
          })
          .catch(err => {
            self.setState({state_en: '', stateId: null});
            toast.warn('ERROR!!!Something went wrong');
            console.error('ERROR!!!Something went wrong', err);
            self.setState({isDisabled: '', loaded: true});
          });
      } else {
        url = config.STATE_URL;
        // Const newData = {
        //   _id: 'id_' + this.state.regionId,
        //   region_en: this.state.region_en
        // };
        // const {worldRegionArr} = this.state;
        // const newArray = worldRegionArr.push(newData);
        // this.setState({worldRegionArr, newArray});
        if (this.state.state_en.trim()) {
          const self = this;
          const payload = {
            state_en: this.state.state_en,
            countryid: this.state.selectedCountryOption.value,
            geometry
          };
          // Post
          axios.post(url, payload, {
            headers: this.state.header
          })
            .then(res => {
              console.log(res);
              if (res.data.responseCode === 0) {
                self.setState({state_en: '', stateId: null, selectedCountryOption: '', selectedOption: '', stateId: ''});
                self.getStateList(self.state.currentPage);
                toast.info('State added!');
              } else {
                toast.warn('ERROR!!!Something went wrong');
              }
              self.setState({disabled: '', loaded: true});
            })
            .catch(err => {
              self.setState({region_en: '', regionId: null});
              toast.warn('ERROR!!!Something went wrong');
              console.error('ERROR!!!Something went wrong', err);
              self.setState({disabled: '', loaded: true});
            });
        } else {
          ReactDOM.render('Please Enter a state', document.getElementById('validationMessage'));
          document.getElementById('validationMessage').classList.add('alert-danger');
          this.removeMessage();
          this.setState({disabled: '', loaded: true});
        }
      }
    } else {
      ReactDOM.render('Please Enter a Country', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.add('alert-danger');
      this.removeMessage();
      this.setState({disabled: '', loaded: true});
    }
  }

  generateOptions() {
    const option = this.state.worldRegionArr.map((region, key) => {
      return {value: region._id, label: region.worldregion_en, key};
    });

    this.setState({options: option});
  }
  generateCountryOptions() {
    const option = this.state.countryArr.map((country, key) => {
      return {value: country._id, label: country.country_en, key};
    });

    this.setState({countryOptions: option});
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

  displayState() {
    const {stateArr} = this.state;
    let start = this.state.itemStart;
    return (
      <tbody>
        {
          stateArr.map(state =>
            (
              <tr key={state._id} >
                <td>{start++}</td>
                <td>{state.country_en}</td>
                <td>{state.state_en}</td>
                <td> <Button color="danger" value={state._id} onClick={this.handleEditState}>Edit</Button></td>
              </tr>
            )
          )
        }
      </tbody>
    );
  }

  handleSelectChange(selected) {
    this.setState({
      selectedOption: selected,
      selectedCountryOption: '',
      region: selected.label
    }, () => {
      this.getStateList(this.state.defaultPage);
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
        });
      } else {
        this.fetchGeoLocation(selected.label, null, null);
      }
    }
  }
  handleCountrySelectChange(selected) {
    this.setState({
      selectedCountryOption: selected,
      country: selected.label
    }, () => {
      this.getStateList(this.state.defaultPage);
    });

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
      });
    } else {
      this.fetchGeoLocation(this.state.region, selected.label, null);
    }
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
  render() {
    const isAdd = !this.state.stateId;

    return (
      <div className="animated fadeIn">
        <ToastContainer/>
        <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="8">
            <Card>
              <CardHeader>
                <strong>States</strong>
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
                </Row>
                <Alert color="white" id="validationMessage"/>
                <Form onSubmit={this.handleSubmit} method="post" encType="multipart/form-data">
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
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="state_en">State Name</Label>
                    </Col>
                    <Col xs="12" md="6">
                      <DebounceInput
                        placeholder="State Name"
                        name="city_en"
                        value={this.state.state_en}
                        minLength={2}
                        debounceTimeout={config.DEBOUNCE_TIMEOUT}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col xs="12" md="3">
                      <Button disabled={this.state.disabled === 'disable'} className={this.state.disabled} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"/> {isAdd ? 'Add' : 'Save'}</Button>
                    </Col>
                  </FormGroup>
                </Form>
                <div>
                  Latitude/Longitude : {this.state.map.position.lat},{this.state.map.position.lng}
                </div>
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  {
                    this.displayState()
                  }
                </Table>
                {this.state.stateArr.length > 0 ?
                  <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={this.state.itemsPerPage}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                  /> : null}
              </CardBody>
            </Card>
            <Loader loaded={this.state.loaded} className="spinner"/>
          </Col>
        </Row>
      </div>
    );
  }
}
export default State;
