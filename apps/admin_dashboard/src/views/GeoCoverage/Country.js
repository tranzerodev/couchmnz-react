import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {getAuthHeader, logout} from '../../auth';
import axios from 'axios';
import Map from '../../components/Map/Map';
import {DebounceInput} from 'react-debounce-input';
import Select from 'react-select';
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
import {ToastContainer, toast} from 'react-toastify';
import Loader from 'react-loader';

class Country extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: '',
      options: [],
      selectedOption: '',
      worldRegionArr: [],
      countryArr: [],
      header: getAuthHeader(),
      country_en: '',
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
      geometry: [
        config.defaultGeo
      ],
      searchText: '',
      loaded: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getRegionList = this.getRegionList.bind(this);
    this.getCountyList = this.getCountyList.bind(this);
    this.displayCountries = this.displayCountries.bind(this);
    this.handleEditCountry = this.handleEditCountry.bind(this);
    this.generateOptions = this.generateOptions.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.fetchGeoLocation = this.fetchGeoLocation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePositionChanged = this.handlePositionChanged.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.getRegionList();
    this.getCountyList(this.state.defaultPage);
  //  This.generateOptions();
  }

  fetchGeoLocation(regionName, countryName) {
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
    const zoomLevel = config.zoomLevels.country;
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
      console.log('newLoc :: ', newLoc);
      newLoc[0].geometry.location = position; // Execute the manipulations
      this.setState({geometry: newLoc});
    }
  }
  handleInputChange(event) {
    console.log('Called Function :: ', event);
    const target = event.target;
    const value = target.value;
    this.setState({
      country_en: value
    });
    this.fetchGeoLocation(this.state.region, value);
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
      this.getCountyList(this.state.defaultPage);
    }
  }
  handleSearch() {
    this.getCountyList(this.state.defaultPage);
  }
  getCountyList(pageNum) {
    const self = this;
    self.setState({loaded: false});
    axios.get(config.COUNTRY_URL + '?limit=50&page=' + pageNum + (this.state.selectedOption && this.state.selectedOption.value ? '&worldRegionId=' + this.state.selectedOption.value : '') + (this.state.searchText ? '&q=' + this.state.searchText.trim() : ''), {
      headers: this.state.header
    })
      .then(response => {
        if (response.data.payload.data && response.data.responseCode === 0) {
          self.setState({countryArr: response.data.payload.data});
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

  handleEditCountry(e) {
    const {countryArr} = this.state;
    const countryId = e.target.value;
    const zoomLevel = config.zoomLevels.country;
    const countryObj = countryArr.find(item => item._id === countryId);
    if (countryObj.geometry) {
      if (this.state.geometry && this.state.geometry.length) {
        const newLoc = this.state.geometry.slice(); // Copy the array
        newLoc[0].geometry = countryObj.geometry; // Execute the manipulations
        this.setState({geometry: newLoc});
      }
    }

    this.setState({country_en: countryObj.country_en, countryId: countryObj._id, selectedOption: {value: countryObj.worldregionid, label: countryObj.worldregion_en}}, () => {
      this.getCountyList(this.state.defaultPage);
    });
    /* Once we get geometry object in response, render that location in map.
      Need to test this code
    */
    if (countryObj.geometry && countryObj.geometry.location) {
      if (this.state.geometry && this.state.geometry.length) {
        const newLoc = this.state.geometry.slice(); // Copy the array
        newLoc[0].geometry = countryObj.geometry; // Execute the manipulations
        this.setState({geometry: newLoc});
      }
      const position = countryObj.geometry.location;
      this.setState({
        map: {
          zoom: zoomLevel,
          center: position,
          position
        }
      });
    } else {
      this.fetchGeoLocation(null, countryObj.country_en);
    }
  }

  handlePageClick(event) {
    const page = event.selected + 1;
    this.setState({currentPage: page});
    this.getCountyList(page);
  }
  handleSubmit(event) {
    this.setState({disabled: 'disable', loaded: false});
    event.preventDefault();
    const geometry = (this.state.geometry && this.state.geometry.length) ? this.state.geometry[0].geometry : {};
    if (this.state.selectedOption) {
      let url;
      //  Add code in response of axios call
      if (this.state.countryId) {
        // Edit world_region
        const payload = {
          country_en: this.state.country_en,
          worldregionid: this.state.selectedOption.value,
          geometry
        };
        url = config.COUNTRY_URL + '/' + this.state.countryId;
        const self = this;
        axios.put(url, payload, {
          headers: this.state.header
        })
          .then(res => {
            console.log(res);
            if (res.data.responseCode === 0) {
              self.setState({region_en: '', regionId: null, country_en: '', selectedOption: '', countryId: ''});
              self.getCountyList(self.state.currentPage);
              toast.info('Country edited!');
            } else {
              toast.warn('ERROR!!!Something went wrong');
            }
            self.setState({disabled: '', loaded: true});
          })
          .catch(err => {
            toast.warn('ERROR!!!Something went wrong');
            self.setState({region_en: '', regionId: null});
            console.error('ERROR!!!Something went wrong', err);
            self.setState({disabled: '', loaded: true});
          });
      } else {
        url = config.COUNTRY_URL;
        // Const newData = {
        //   _id: 'id_' + this.state.regionId,
        //   region_en: this.state.region_en
        // };
        // const {worldRegionArr} = this.state;
        // const newArray = worldRegionArr.push(newData);
        // this.setState({worldRegionArr, newArray});
        if (this.state.country_en.trim()) {
          const self = this;
          const payload = {
            country_en: this.state.country_en,
            worldregionid: this.state.selectedOption.value,
            geometry
          };
          // Post
          axios.post(url, payload, {
            headers: this.state.header
          })
            .then(res => {
              console.log(res);
              if (res.data.responseCode === 0) {
                self.setState({region_en: '', regionId: null, country_en: '', selectedOption: '', countryId: ''});
                self.getCountyList(self.state.currentPage);
                toast.info('Country added!');
              } else {
                toast.warn('ERROR!!!Something went wrong');
              }
              self.setState({disabled: '', loaded: true});
            })
            .catch(err => {
              toast.warn('ERROR!!!Something went wrong');
              self.setState({region_en: '', regionId: null});
              console.error('ERROR!!!Something went wrong', err);
              self.setState({disabled: '', loaded: true});
            });
        } else {
          ReactDOM.render('Please Enter a Country', document.getElementById('validationMessage'));
          document.getElementById('validationMessage').classList.add('alert-danger');
          this.removeMessage();
          this.setState({disabled: '', loaded: true});
        }
      }
    } else {
      ReactDOM.render('Please select a region', document.getElementById('validationMessage'));
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

  displayCountries() {
    const {countryArr} = this.state;
    let start = this.state.itemStart;
    return (
      <tbody>
        {
          countryArr.map(country =>
            (
              <tr key={country._id} >
                <td>{start++}</td>
                <td>{country.worldregion_en}</td>
                <td>{country.country_en}</td>
                <td> <Button color="danger" data-name={country.country_en} value={country._id} onClick={this.handleEditCountry}>Edit</Button></td>
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
      region: selected.label
    }, () => {
      this.getCountyList(this.state.defaultPage);
    });
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
      this.fetchGeoLocation(selected.label, null);
    }
  }
  render() {
    const isAdd = !this.state.countryId;

    return (
      <div className="animated fadeIn">
        <ToastContainer/>
        <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="8">
            <Card>
              <CardHeader>
                <strong>Countries</strong>
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
                    <Col md="8">
                      <Select
                        name="_id"
                        placeholder="Select world region"
                        value={this.state.selectedOption}
                        onChange={this.handleSelectChange}
                        options={this.state.options}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="country_en">Country Name</Label>
                    </Col>
                    <Col xs="12" md="6">
                      <DebounceInput
                        placeholder="Country Name"
                        name="country_en"
                        value={this.state.country_en}
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
                      <th>World Region</th>
                      <th>Country</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {
                    this.displayCountries()
                  }
                </Table>
                {this.state.countryArr.length > 0 ?
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
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
export default Country;
