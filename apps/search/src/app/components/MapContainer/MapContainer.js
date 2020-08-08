import {Marker, GoogleApiWrapper as googleApiWrapper} from 'google-maps-react';
import Map from 'google-maps-react';
import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import QueryString from 'query-string';

import appConstants from '../../constants/appConstants';
import {changeSelectedProfile} from '../../actions';
import {MAP_MARKER_ICON, MAP_DEFAULT_MARKER_ICON} from '../../constants/assetsPaths';

const {filterQueries} = appConstants;
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    const {mapCenter, selectedProfile} = this.props;
    const position = selectedProfile && selectedProfile.position ? selectedProfile.position : mapCenter;
    this.state = {
      canUpdateLocation: false,
      mapCenter: position,
      zoomLevel: appConstants.mapZoomLevel.default
    };

    this.mapRef = null;
    this.renderMarkers = this.renderMarkers.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.getAreaFromSportTrainingLoc = this.getAreaFromSportTrainingLoc.bind(this);
    this.handleOnMapReady = this.handleOnMapReady.bind(this);
    this.updateControl = this.updateControl.bind(this);
    this.handleMapFilterChange = this.handleMapFilterChange.bind(this);
    this.getMarkerData = this.getMarkerData.bind(this);
    this.setMapRef = this.setMapRef.bind(this);
    this.handleOnMapZoomPositionChanged = this.handleOnMapZoomPositionChanged.bind(this);
  }

  setMapRef(mapRef) {
    this.mapRef = mapRef;
  }

  componentWillReceiveProps(nextProps) {
    const {mapCenter} = nextProps;
    const prevPosition = this.props.selectedProfile && this.props.selectedProfile.position ? this.props.selectedProfile.position : {lat: null, lng: null};
    const newPosition = nextProps.selectedProfile && nextProps.selectedProfile.position ? nextProps.selectedProfile.position : {lat: null, lng: null};
    if ((prevPosition.lat !== newPosition.lat) || (prevPosition.lng !== newPosition.lng)) {
      this.setState({
        mapCenter: {
          lat: newPosition.lat,
          lng: newPosition.lng
        }
      });
    } else if (this.props.mapCenter.lat !== mapCenter.lat || this.props.mapCenter.lng !== mapCenter.lng) {
      const newMapCenter = Object.assign({}, mapCenter);
      this.setState({
        mapCenter: newMapCenter
      });
    }
  }

  handleMarkerClick(props, marker, e) {
    this.props.changeSelectedProfile({id: props.sportItem._id, position: props.position});
  }

  getMapLatLongString(lat, lng) {
    if (lat && lng) {
      return (`${lat},${lng}`);
    }
    return null;
  }

  handleMapFilterChange(filterObj) {
    const {history, query} = this.props;
    const {location} = history;
    const {pathname} = location;
    const updatedFilters = Object.assign({}, query, filterObj);
    const search = QueryString.stringify(updatedFilters);
    history.push({
      pathname,
      search
    });
  }

  getMarkerData() {
    const {searchData, google, selectedProfile} = this.props;
    const {canUpdateLocation} = this.state;
    const markerDataList = [];
    let hits = [];
    if (searchData.data && searchData.data.hits && searchData.data.hits.hits) {
      hits = searchData.data.hits.hits;
    }
    const bounds = new google.maps.LatLngBounds();
    hits.forEach(hit => {
      let sportName = '';
      const sportHighlights = hit.highlight;
      if (sportHighlights) {
        const sportNameHighlight = sportHighlights[appConstants.searchQueryKeys.sportName];
        if (sportNameHighlight && sportNameHighlight.length > 0) {
          sportName = sportNameHighlight[0].replace(/<em>|<\/em>/g, '');
        }
      }
      const nickname = hit._source.nickName;
      let sportSearched = hit._source.sports.find(sport => sport.name.includes(sportName));
      sportSearched = (sportSearched) ? sportSearched : hit._source.sports[0];
      const location = sportSearched.trainingLocations && sportSearched.trainingLocations.length ? sportSearched.trainingLocations[0].location : null;
      const name = sportSearched.trainingLocations && sportSearched.trainingLocations.length ? sportSearched.trainingLocations[0].area.name : '';
      let mapIcon = MAP_DEFAULT_MARKER_ICON;
      if (selectedProfile) {
        if (hit._id === selectedProfile.id) {
          mapIcon = MAP_MARKER_ICON;
        }
      }

      if (location && nickname) {
        const position = {
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lon)
        };

        bounds.extend(new google.maps.LatLng(position));
        markerDataList.push({
          name,
          item: hit,
          position,
          mapIcon
        });
      }
    });
    if (this.mapRef && this.mapRef.map && canUpdateLocation === false) {
      if (markerDataList.length === 0) {
        bounds.extend(new google.maps.LatLng(appConstants.defaultMapCenter));
        this.mapRef.map.fitBounds(bounds);
        this.mapRef.map.setZoom(appConstants.mapZoomLevel.min);
      } else {
        this.mapRef.map.fitBounds(bounds);
        const mapZoom = this.mapRef.map.getZoom();
        if (mapZoom > appConstants.mapZoomCondionThreshold) {
          this.mapRef.map.setZoom(appConstants.mapZoomCondionThresholdValue);
        }
      }
    }
    return {
      markerDataList,
      mapBounds: bounds
    };
  }

  renderMarkers(markerDataItem, index) {
    const {name, position, item, mapIcon} = markerDataItem;
    return (
      <Marker
        key={index}
        name={name}
        position={position}
        onClick={this.handleMarkerClick}
        icon={{
          url: mapIcon,
          scaledSize: new google.maps.Size(36, 36)
        }}
        sportItem={item}
      />
    );
  }

  getAreaFromSportTrainingLoc(trainingLocations) {
    if (trainingLocations && trainingLocations.length > 0 && trainingLocations[0].fullAddress) {
      const area = trainingLocations[0].fullAddress.split(',')[0];
      return (area) ? area : '';
    }
    return '';
  }

  updateControl(controlDiv) {
    const {canUpdateLocation} = this.state;

    // Set CSS for the control border.
    const controlUI = document.createElement('div');
    controlUI.title = 'Update search as I move the map';
    controlUI.classList.add('updateMoveMap');
    controlDiv.appendChild(controlUI);

    const chkBox = document.createElement('input');
    chkBox.type = 'checkbox';
    chkBox.id = 'chkOne';
    chkBox.value = 'One';
    chkBox.checked = canUpdateLocation;

    const label = document.createElement('label');
    label.htmlFor = 'Update search as I move the map';
    label.appendChild(document.createTextNode('Update search as I move the map'));

    controlUI.appendChild(chkBox);
    controlUI.appendChild(label);

    chkBox.addEventListener('change', e => {
      const canUpdateLocation = e.target.checked;
      this.setState({canUpdateLocation});
    });
  }

  handleOnMapZoomPositionChanged(mapProps, map) {
    const zoom = map.zoom;
    const {query} = this.props;
    const {canUpdateLocation} = this.state;
    if (canUpdateLocation === true) {
      const lat = map.center.lat();
      const lng = map.center.lng();
      const latLngString = this.getMapLatLongString(lat, lng);

      const {distanceParam, trainingLatLong} = filterQueries;
      const {distanceZoomLevelMapping} = appConstants;
      const distance = distanceZoomLevelMapping[zoom];
      const oldDistance = parseInt(query[distanceParam], 10);
      const oldLatLng = query[trainingLatLong];
      if ((distance !== oldDistance) || (oldLatLng !== latLngString)) {
        const filterObj = {
          [trainingLatLong]: (latLngString) ? latLngString : undefined,
          [distanceParam]: (distance) ? distance : undefined
        };
        this.handleMapFilterChange(filterObj);
      }
    }
  }

  handleOnMapReady(mapProps, map) {
    const centerControlDiv = document.createElement('div');
    const centerControl = this.updateControl(centerControlDiv);
    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv);
  }
  render() {
    const {mapCenter} = this.props;
    if (this.props.google) {
      const markerData = this.getMarkerData();

      return (
        <Map
          ref={this.setMapRef}
          google={this.props.google}
          // MaxZoom={appConstants.mapZoomLevel.max}
          // minZoom={appConstants.mapZoomLevel.min}
          zoom={this.state.zoomLevel}
          onIdle={this.handleOnMapZoomPositionChanged}
          streetViewControl={false}
          mapTypeControl={false}
          onReady={this.handleOnMapReady}
          initialCenter={mapCenter}
          center={this.state.mapCenter}
        >

          {
            markerData.markerDataList.map(this.renderMarkers)
          }

        </Map>
      );
    }
    return null;
  }
  static get propTypes() {
    return {
      google: PropTypes.any,
      searchData: PropTypes.object.isRequired,
      mapCenter: PropTypes.object.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      changeSelectedProfile: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
      query: PropTypes.object.isRequired
    };
  }
}
MapContainer.defaultProps = {
  google: null
};

// Const key = config.getGoogleKey();
const mapStateToProps = state => {
  const {selectedProfile, router} = state;
  return {
    selectedProfile,
    query: router.query
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedProfile: profile => dispatch(changeSelectedProfile(profile))
  };
};
export default googleApiWrapper(appConstants.googleMapsConfig)(connect(mapStateToProps, mapDispatchToProps)(translate(withRouter(MapContainer))));
