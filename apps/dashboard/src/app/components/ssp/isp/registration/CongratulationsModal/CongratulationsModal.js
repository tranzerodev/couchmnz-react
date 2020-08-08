import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from '../Modal';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';

import {
  updateSession,
  removeSession,
  sspSessionSubmit
} from '../../../../../actions';

import config from '../../../../../config';
import {FULFILLED} from '../.././../../../constants/ActionTypes';

/* eslint complexity: 0 */

class ModalClass extends Component {
  constructor(props) {
    super(props);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.state = {
      session: {
        subSSPTypeBaseRateID: null
      },
      colorPicker: 'none',
      sessionName: config.offerTerminologies.Session
    };
  }
  handleCloseModal() {
    this.props.closeModal();
  }
  render() {
    const {profileActivationStatus} = this.props;
    return (
      profileActivationStatus.status === FULFILLED && (
        <Modal isModalOpen>
          <div id="congratulationModal">
            <div className="uk-modal-dialog">
              <div className="uk-modal-header">
                <h2>Congratulations- you have a published profile!</h2>
                <a className="del uk-modal-close" onClick={this.props.closeModal}>
                  <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                    <g transform="translate(-1946.5 -5770.5)">
                      <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2={18} y2={18} transform="translate(1629.5 538.5)"/>
                      <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1={18} y2={18} transform="translate(1629.5 538.5)"/>
                    </g>
                  </svg>
                </a>
              </div>
              <div className="uk-modal-body">
                <p>Clients can see your page and book sessions with you!</p>
                <p>We're going to take you to your dashboard. To modify your profile, select Profile from the Settings menu.</p>
                <p>We will also let you know what else you can to do make yourself stand out to potential clients and how to optimize your business!</p>
              </div>
              <div className="uk-modal-footer">
                <div className="uk-text-center">
                  <a className="general_btn" onClick={this.props.handleNext}>Ok</a>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )
    );
  }
  static get propTypes() {
    return {
      locations: PropTypes.object,
      sessions: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      sports: PropTypes.array.isRequired
    };
  }
}

ModalClass.defaultProps = {
  locations: {data: []},
  sessions: {data: []}
};

const mapStateToProps = state => {
  const {locations, sessions, ages, skillLevels, training, sport, sspValidation, prices, profileActivationStatus} = state;
  return {
    locations,
    sessions,
    ages,
    skillLevels,
    training,
    sport,
    sspValidation,
    prices,
    profileActivationStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSession: session => dispatch(updateSession(session)),
    removeSession: profile => dispatch(removeSession(profile)),
    sspSessionSubmit: data => dispatch(sspSessionSubmit(data))
  };
};

const CreateModal = connect(mapStateToProps, mapDispatchToProps)(ModalClass);
export default translate(CreateModal);
