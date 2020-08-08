import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import Map from '../../../../common/Map';
import config from '../../../../../config';
import Modal from '../../../../common/Modal';

class AthleteSeeOnMap extends Component {
  render() {
    const {trainingLocation, p} = this.props;
    const {location} = trainingLocation;
    return (
      <Modal isModalOpen={this.props.isModalOpen}>
        <div id="remove-buffer-modal" className="cl-sd-modal-common">
          <div className="uk-modal-dialog cl-sd-modal-width-one">
            <a onClick={this.props.onClose} className="uk-modal-close uk-close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                  <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
                </g>
              </svg>
            </a>
            <div className="uk-modal-header mb45">
              <h2>{p.t('AthleteSeeOnMap.training_location')}</h2>
            </div>
            <div className="uk-modal-body">
              <div className="uk-grid">
                <div className="uk-width-large-1-1" >
                  <Map
                    isMarkerShown
                    zoom={config.zoomLevels.city}
                    center={{lat: parseFloat(location.lat, 10), lng: parseFloat(location.lon, 10)}}
                    markers={[{lat: parseFloat(location.lat, 10), lng: parseFloat(location.lon, 10)}]}
                    googleMapURL={config.googleMapUrl.replace('{key}', config.googleApiKey)}
                    options={{minZoom: config.minZoom}}
                    loadingElement={<div style={{height: `400px`}}/>}
                    containerElement={<div style={{height: `400px`}}/>}
                    mapElement={<div style={{height: `400px`}}/>}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      trainingLocation: PropTypes.object.isRequired,
      isModalOpen: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired
    };
  }
}

export default translate(AthleteSeeOnMap);
