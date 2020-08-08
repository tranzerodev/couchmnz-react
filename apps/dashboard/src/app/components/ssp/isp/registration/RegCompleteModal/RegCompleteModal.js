import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';

import {fetchProfile} from '../../../../../actions/index';
import {REJECTED} from '../../../../../constants/ActionTypes';
class CongratulationModal extends Component {
  constructor(props) {
    super(props);
    this.handleOk = this.handleOk.bind(this);
  }
  handleOk() {
    const {profile} = this.props;
    this.props.fetchProfile({profileID: profile.data.profile.id});
    this.props.handleClose();
  }
  render() {
    const {profileActivationStatus} = this.props;
    return (
      <div id="congratulationModal">
        <div className="uk-modal-dialog">
          <div className="uk-modal-header"/>
          { profileActivationStatus.status === REJECTED ?
            <div className="uk-modal-body">
              <p>{this.props.p.t('CongratulationModal.error_message')}</p>
            </div> :
            <div className="uk-modal-body">
              <h2>{this.props.p.t('CongratulationModal.h2')}</h2>
              <p>{this.props.p.t('CongratulationModal.p1')}</p>
              <p>{this.props.p.t('CongratulationModal.p2')}</p>
              <p>{this.props.p.t('CongratulationModal.p3')}</p>
            </div>
          }
          <div className="uk-modal-footer">
            <div className="uk-text-center">
              <a className="general_btn" onClick={this.handleOk}>{this.props.p.t('CongratulationModal.ok')}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      handleClose: PropTypes.func.isRequired,
      fetchProfile: PropTypes.func.isRequired,
      profile: PropTypes.func.isRequired,
      profileActivationStatus: PropTypes.object.isRequired
    };
  }
}
const mapStateToProps = state => {
  const {profile, profileActivationStatus} = state;
  return {
    profile,
    profileActivationStatus
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchProfile: params => dispatch(fetchProfile(params))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(translate(CongratulationModal));
