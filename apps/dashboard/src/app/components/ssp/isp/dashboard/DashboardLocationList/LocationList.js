import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import Map from '../../../../common/Map';

import config from '../../../../../config';
import {removeLocation} from '../../../../../actions';
import {NavLink} from 'react-router-dom';
import {DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS_EDIT} from '../../../../../constants/pathConstants';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import {PENDING, FULFILLED, REJECTED} from '../../../../../constants/ActionTypes';
import {notNull} from '../../../../../validators/common/util';

class LocationList extends Component {
  constructor() {
    super();
    this.handleRemove = this.handleRemove.bind(this);
    this.renderLocation = this.renderLocation.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.renderDeleteConfirmationModal = this.renderDeleteConfirmationModal.bind(this);
    this.handleDeleteConfirmationModalOpen = this.handleDeleteConfirmationModalOpen.bind(this);
    this.handleDeleteConfirmationModalClose = this.handleDeleteConfirmationModalClose.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = {
      isLocationDeleteModalOpen: false,
      traininglocationId: '',
      error: undefined
    };
  }

  componentDidUpdate(preProps) {
    console.log('preProps', preProps);
    if (preProps.removeLocationStatus.status === PENDING) {
      console.log('props', this.props);
      if (this.props.removeLocationStatus.status === FULFILLED) {
        this.handleDeleteConfirmationModalClose();
      } else if (this.props.removeLocationStatus.status === REJECTED) {
        this.handleError();
      }
    }
  }

  handleRemove() {
    const {selectedProfile, sportId} = this.props;
    this.props.removeLocation({
      traininglocationId: this.state.traininglocationId,
      profileId: selectedProfile.id,
      sportId
    });
  }

  handleEdit(event) {
    const {value} = event.target;
  }

  handleDeleteConfirmationModalOpen(e) {
    this.setState({isLocationDeleteModalOpen: true, traininglocationId: e.target.id, error: undefined});
  }

  handleDeleteConfirmationModalClose() {
    this.setState({isLocationDeleteModalOpen: false});
  }

  handleError() {
    console.log('Handle error');
    const {removeLocationStatus, p} = this.props;
    let error = p.t('LocationList.ConfirmationModal.error.common');
    if (removeLocationStatus.responseCode) {
      error = p.t('LocationList.ConfirmationModal.error.' + removeLocationStatus.responseCode);
    }
    this.setState({error});
  }

  renderDeleteConfirmationModal() {
    const {isLocationDeleteModalOpen, error} = this.state;
    const {p} = this.props;
    if (isLocationDeleteModalOpen) {
      return (
        <ConfirmationModal
          isModalOpen={isLocationDeleteModalOpen}
          heading={p.t('LocationList.ConfirmationModal.heading')}
          description={p.t('LocationList.ConfirmationModal.description')}
          onOk={this.handleRemove}
          onCancel={this.handleDeleteConfirmationModalClose}
          error={error}
        />
      );
    }
  }

  renderLocation(location, i) {
    const editPath = {
      pathname: DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS_EDIT,
      state: {location}
    };
    return (
      <div key={i} className="cl-sd-locationMapInner">
        <div className="cl-sd-locationMap">
          <Map
            isMarkerShown
            zoom={config.zoomLevels.city}
            center={{lat: parseFloat(location.location.lat), lng: parseFloat(location.location.lng)}}
            markers={[{lat: parseFloat(location.location.lat), lng: parseFloat(location.location.lng)}]}
            googleMapURL={config.googleMapUrl.replace('{key}', config.googleApiKey)}
            options={{minZoom: config.minZoom,
              zoomControl: config.mapControls.zoomControl,
              streetViewControl: config.mapControls.streetViewControl,
              fullscreenControl: config.mapControls.fullscreenControl,
              mapTypeControl: config.mapControls.mapTypeControl}}
            loadingElement={<div style={{height: `200px`}}/>}
            containerElement={<div style={{height: `200px`}}/>}
            mapElement={<div style={{height: `200px`}}/>}
          />
        </div>
        <div className="locationData cl-sd-locationData">
          <h5>{location.title}</h5>
          <p>{location.street}</p>
          {[location.cityName, location.stateName, location.zip].filter(l => notNull(l)).join(', ')}
          <p/>
          <NavLink to={editPath}>{this.props.p.t('LocationList.edit')}</NavLink>
          <a id={location.id} onClick={this.handleDeleteConfirmationModalOpen}>{this.props.p.t('LocationList.delete')}</a>
        </div>
      </div>
    );
  }
  render() {
    const {locations} = this.props;
    return (
      <div >
        {
          locations.data.map(this.renderLocation)
        }
        {
          this.renderDeleteConfirmationModal()
        }
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      locations: PropTypes.object,
      removeLocation: PropTypes.func.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      sportId: PropTypes.string.isRequired,
      removeLocationStatus: PropTypes.object.isRequired
    };
  }
}

LocationList.defaultProps = {
  locations: {
    data: []
  }
};

const mapStateToProps = state => {
  const {locations, travelPreferences, userProfiles, currentSport, removeLocationStatus} = state;
  return {
    travelPreferences,
    locations,
    selectedProfile: userProfiles.selectedProfile,
    sportId: currentSport.data && currentSport.data.id ? currentSport.data.id : '',
    removeLocationStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeLocation: id => dispatch(removeLocation(id))
  };
};

export default translate(connect(mapStateToProps, mapDispatchToProps)(LocationList));
