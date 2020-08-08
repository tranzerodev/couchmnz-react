import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {getAuthHeader, logout} from '../../auth';
import axios from 'axios';
import Map from '../../components/Map/Map';
import {DebounceInput} from 'react-debounce-input';
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
import {ToastContainer, toast} from 'react-toastify';
import Loader from 'react-loader';

class WorldRegion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: '',
      selectedOption: '',
      worldRegionArr: [],
      header: getAuthHeader(),
      region_en: '',
      regionId: null,
      map: {
        zoom: config.defaultZoom,
        center: config.defaultPosition,
        position: config.defaultPosition
      },
      region: '',
      geometry: [config.defaultGeo],
      loaded: false
    };
    this.handleAddRegion = this.handleAddRegion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getRegionList = this.getRegionList.bind(this);
    this.displayRegions = this.displayRegions.bind(this);
    this.handleEditRegion = this.handleEditRegion.bind(this);
    this.fetchGeoLocation = this.fetchGeoLocation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePositionChanged = this.handlePositionChanged.bind(this);
  }

  componentDidMount() {
    this.getRegionList();
  }

  getRegionList() {
    const self = this;
    self.setState({loaded: false});
    axios.get(config.WORLD_REGION_URL, {headers: this.state.header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({worldRegionArr: response.data.payload, loaded: true});
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
  fetchGeoLocation(regionName) {
    let searchLocation = '';
    let zoomLevel = config.zoomLevels.region;
    if (regionName) {
      searchLocation = regionName;
      zoomLevel = config.zoomLevels.region;
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
      newLoc[0].geometry.location = position; // Execute the manipulations
      this.setState({geometry: newLoc});
    }
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    this.setState({
      region_en: value
    });
    this.fetchGeoLocation(this.state.region_en);
  }
  handleEditRegion(e) {
    const {worldRegionArr} = this.state;
    const regionId = e.target.value;
    const zoomLevel = config.zoomLevels.region;
    const regionObj = worldRegionArr.find(item => item._id === regionId);
    if (regionObj.geometry) {
      if (this.state.geometry && this.state.geometry.length) {
        const newLoc = this.state.geometry.slice(); // Copy the array
        newLoc[0].geometry = regionObj.geometry; // Execute the manipulations
        this.setState({geometry: newLoc});
      }
    }
    this.setState({region_en: regionObj.worldregion_en, regionId: regionObj._id});
    /* Once we get geometry object in response, render that location in map.
      Need to test this code
    */
    if (regionObj.geometry) {
      const position = regionObj.geometry.location;
      this.setState({
        map: {
          zoom: zoomLevel,
          center: position,
          position
        }
      });
    } else {
      this.fetchGeoLocation(regionObj.worldregion_en);
    }
  }

  handleAddRegion(event) {
    this.setState({disabled: 'disable', loaded: false});
    event.preventDefault();
    const geometry = (this.state.geometry && this.state.geometry.length) ? this.state.geometry[0].geometry : {};
    let url;
    //  Add code in response of axios call
    const payload = {
      worldregion_en: this.state.region_en,
      geometry
    };
    if (this.state.regionId) {
      // Edit world_region
      const self = this;
      url = config.WORLD_REGION_URL + '/' + this.state.regionId;
      axios.put(url, payload, {
        headers: this.state.header
      })
        .then(res => {
          console.log(res);
          if (res.data.responseCode === 0) {
            self.setState({region_en: '', regionId: null});
            self.getRegionList();
            toast.info('World Region edited!');
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
      url = config.WORLD_REGION_URL;
      if (this.state.region_en.trim()) {
        const self = this;
        // Post
        axios.post(url, payload, {
          headers: this.state.header
        })
          .then(res => {
            console.log(res);
            if (res.data.responseCode === 0) {
              self.setState({region_en: '', regionId: null});
              self.getRegionList();
              toast.info('World Region added!');
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
        ReactDOM.render('Please Enter a Region', document.getElementById('validationMessage'));
        document.getElementById('validationMessage').classList.add('alert-danger');
        this.removeMessage();
        this.setState({disabled: '', loaded: true});
      }
    }
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

  displayRegions() {
    const {worldRegionArr} = this.state;
    return (
      <tbody>
        {
          worldRegionArr.map((region, key) =>
            (
              <tr key={region._id} >
                <td>{key + 1}</td>
                <td>{region.worldregion_en}</td>
                <td> <Button color="danger" data-name={region.region_en} value={region._id} onClick={this.handleEditRegion}>Edit</Button></td>
              </tr>
            )
          )
        }
      </tbody>
    );
  }

  render() {
    const isAdd = !this.state.regionId;

    return (
      <div className="animated fadeIn">
        <ToastContainer/>
        <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="8">
            <Card>
              <CardHeader>
                <strong>World Regions</strong>
              </CardHeader>
              <CardBody>
                <Alert color="white" id="validationMessage"/>
                <Form onSubmit={this.handleAddRegion} method="post" encType="multipart/form-data">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">World Region Name</Label>
                    </Col>
                    <Col xs="12" md="6">
                      <DebounceInput
                        placeholder="World Region Name"
                        name="region_en"
                        value={this.state.region_en}
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
                      <th>Region</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {
                    this.displayRegions()
                  }
                </Table>
              </CardBody>
            </Card>
            <Loader loaded={this.state.loaded} className="spinner"/>
          </Col>
        </Row>
      </div>
    );
  }
}
export default WorldRegion;
