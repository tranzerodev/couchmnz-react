import React, {Component} from 'react';
import ModalClass from './Modal';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import Map from '../../../../common/Map';
import config from '../../../../../config';
import {
  addLocation,
  removeLocation
} from '../../../../../actions';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import {PENDING, FULFILLED, REJECTED} from '../../../../../constants/ActionTypes';

class LocationListClass extends Component {
  constructor() {
    super();
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  handleSearchLocation(locations, id) {
    return locations.findIndex(location => location.id === id);
  }
  handleEdit(e) {
    const id = e.currentTarget.getAttribute('value');
    if (id) {
      this.setState({
        modal: <ModalClass modalIsOpen id={id} closeModal={this.closeModal} onSave={this.handleSave}/>
      });
    }
  }
  closeModal() {
    this.setState({
      modal: ''
    }, () => {
      this.forceUpdate();
    });
  }

  handleRemove(e) {
    const {selectedProfile, sportId} = this.props;
    this.props.removeLocation({
      traininglocationId: this.state.traininglocationId,
      profileId: selectedProfile.id,
      sportId
    });
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

  render() {
    const show = this.props.locations && this.props.locations.data && (this.props.locations.data.length >= 1);
    const list = (
      <div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">

            {show && <p className="mb30">Let clients know where they can train with you</p>}
            <div className="uk-grid mt10">
              {
                this.props.locations.data.map((location, i) => {
                  return (

                    <div key={i} className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1">
                      <div className="cl-sd-locationMap">
                        <Map
                          isMarkerShown
                          zoom={config.zoomLevels.city}
                          center={{lat: parseFloat(location.location.lat), lng: parseFloat(location.location.lng)}}
                          markers={[{lat: parseFloat(location.location.lat), lng: parseFloat(location.location.lng)}]}
                          googleMapURL={config.googleMapUrl.replace('{key}', config.googleApiKey)}
                          options={{minZoom: config.minZoom}}
                          loadingElement={<div style={{height: `200px`}}/>}
                          containerElement={<div style={{height: `200px`}}/>}
                          mapElement={<div style={{height: `200px`}}/>}
                        />
                      </div>
                      <div className="locationData cl-sd-locationData">
                        <h5>{location.title}</h5>
                        <p>{location.locationType} <br/>{location.street}, {location.cityName} {location.pincode}</p>
                        <a onClick={this.props.handleEdit} value={location.id}>{this.props.p.t('LocationList.edit')}</a>
                        <a id={location.id} onClick={this.handleDeleteConfirmationModalOpen}>{this.props.p.t('LocationList.delete')}</a>
                      </div>
                    </div>
                  );
                })
              }
              <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1">
                {show && <a className="addanother" onClick={this.props.handleAddLocationToggle}>Add Another Location</a>}
              </div>
            </div>
            {this.state.modal}
          </div>
        </div>
        {show && <div className="borderClass pb30 mb30"/>}
        {
          this.renderDeleteConfirmationModal()
        }
      </div>
    );
    return list;
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      locations: PropTypes.object,
      handleEdit: PropTypes.func.isRequired,
      removeLocation: PropTypes.func.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      sportId: PropTypes.object.isRequired,
      removeLocationStatus: PropTypes.object.isRequired
    };
  }
}

LocationListClass.defaultProps = {
  locations: {data: []}
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
    addLocation: location => dispatch(addLocation(location)),
    removeLocation: id => dispatch(removeLocation(id))
  };
};

const LocationList = connect(mapStateToProps, mapDispatchToProps)(LocationListClass);
export default translate(LocationList);
